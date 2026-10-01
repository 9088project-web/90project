const BUCKET = 'order-receipts';
const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '7045830c';
const STAFF_SETTING_KEY = 'order_staff_accounts_v1';

const header = (request, name) => {
  const value = request.headers?.[name.toLowerCase()] || request.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
};

function hashSecret(value) {
  let hash = 2166136261;
  String(value || '').split('').forEach(character => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(16).padStart(8, '0');
}

const supabaseUrl = () => String(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const serviceKey = () => String(process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function request(path, options = {}) {
  const key = serviceKey();
  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers: { apikey: key, Authorization: `Bearer ${key}`, ...(options.headers || {}) },
    body: options.body
  });
  const text = await response.text();
  if (!response.ok) throw new Error(text || `Storage request failed: ${response.status}`);
  return text ? JSON.parse(text) : null;
}

async function authorized(request) {
  const email = String(header(request, 'x-admin-email') || '').trim().toLowerCase();
  const password = String(header(request, 'x-admin-password') || '');
  const expectedEmail = String(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  if (email === expectedEmail && [expectedHash, DEFAULT_ADMIN_PASSWORD_HASH].includes(hashSecret(password))) return true;
  const rows = await request(`/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(STAFF_SETTING_KEY)}&limit=1`);
  const value = Array.isArray(rows) && rows[0]?.value;
  let accounts = [];
  try { accounts = Array.isArray(value) ? value : JSON.parse(value || '[]'); } catch {}
  return accounts.some(account => account.email === email && account.active !== false && account.role !== 'viewer' && account.passwordHash === hashSecret(password));
}

async function ensureBucket() {
  try {
    await request(`/storage/v1/bucket/${BUCKET}`);
  } catch {
    await request('/storage/v1/bucket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: BUCKET, name: BUCKET, public: false, file_size_limit: 1048576, allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'] })
    });
  }
}

function safeSegment(value, fallback) {
  return String(value || fallback).replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 90) || fallback;
}

module.exports = async function handler(requestObject, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (requestObject.method !== 'POST') return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  if (!supabaseUrl() || !serviceKey()) return response.status(503).json({ ok: false, message: 'Cloud storage is not configured.' });
  try {
    if (!(await authorized(requestObject))) return response.status(403).json({ ok: false, message: 'No permission to upload receipts.' });
    const body = requestObject.body && typeof requestObject.body === 'object' ? requestObject.body : JSON.parse(requestObject.body || '{}');
    const match = String(body.dataUrl || '').match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) return response.status(400).json({ ok: false, message: 'Invalid receipt image.' });
    const bytes = Buffer.from(match[2], 'base64');
    if (!bytes.length || bytes.length > 1024 * 1024) return response.status(400).json({ ok: false, message: 'Receipt image must be below 1 MB.' });
    await ensureBucket();
    const extension = match[1].toLowerCase() === 'image/png' ? 'png' : match[1].toLowerCase() === 'image/webp' ? 'webp' : 'jpg';
    const orderId = safeSegment(body.orderId, 'draft');
    const path = `${orderId}/${Date.now()}-${safeSegment(body.name, 'receipt').replace(/\.[^.]+$/, '')}.${extension}`;
    await request(`/storage/v1/object/${BUCKET}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': match[1], 'x-upsert': 'false' },
      body: bytes
    });
    const signed = await request(`/storage/v1/object/sign/${BUCKET}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expiresIn: 31536000 })
    });
    const signedUrl = signed?.signedURL ? `${supabaseUrl()}/storage/v1${signed.signedURL}` : '';
    return response.status(200).json({ ok: true, receipt: { storagePath: path, signedUrl, name: body.name || `receipt.${extension}`, type: match[1], size: bytes.length, uploadedAt: new Date().toISOString() } });
  } catch (error) {
    return response.status(500).json({ ok: false, message: 'Receipt cloud upload failed.' });
  }
};
