const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '7045830c';
const STAFF_SETTING_KEY = 'order_staff_accounts_v1';
const BUCKET = 'site-media';
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

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

function send(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
}

function applyCors(request, response) {
  const origin = String(header(request, 'origin') || '');
  const allowed = new Set(['https://90project.online', 'https://www.90project.online', 'http://127.0.0.1:3050', 'http://localhost:3050']);
  if (allowed.has(origin)) response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Email,X-Admin-Password');
}

async function bodyOf(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body === 'string') return JSON.parse(request.body || '{}');
  return new Promise((resolve, reject) => {
    let raw = '';
    request.on('data', chunk => { raw += chunk; });
    request.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (error) { reject(error); } });
    request.on('error', reject);
  });
}

const supabaseUrl = () => String(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const serviceKey = () => String(process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function cloud(path, options = {}) {
  const key = serviceKey();
  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers: { apikey: key, Authorization: `Bearer ${key}`, ...(options.headers || {}) },
    body: options.body
  });
  if (!response.ok && !options.allowConflict) throw new Error(await response.text());
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function readStaff() {
  const rows = await cloud(`/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(STAFF_SETTING_KEY)}&limit=1`);
  const value = Array.isArray(rows) && rows[0]?.value;
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value); } catch { return []; }
}

async function authorize(request, body = {}) {
  const email = String(header(request, 'x-admin-email') || body.adminEmail || '').trim().toLowerCase();
  const password = String(header(request, 'x-admin-password') || body.adminPassword || '');
  const expectedEmail = String(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  if (email === expectedEmail && [expectedHash, DEFAULT_ADMIN_PASSWORD_HASH].includes(hashSecret(password))) return { email, role: 'owner' };
  const account = (await readStaff()).find(item => String(item.email || '').toLowerCase() === email && item.active !== false && item.passwordHash === hashSecret(password));
  return account ? { email: account.email, role: account.role } : null;
}

async function ensureBucket() {
  const key = serviceKey();
  const response = await fetch(`${supabaseUrl()}/storage/v1/bucket`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: MAX_FILE_BYTES, allowed_mime_types: [...ALLOWED_TYPES] })
  });
  if (!response.ok && response.status !== 409 && response.status !== 400) throw new Error(await response.text());
}

function safeFileName(name, mimeType) {
  const extensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
  const stem = String(name || 'image').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'image';
  return `${Date.now()}-${stem}.${extensions[mimeType]}`;
}

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (!supabaseUrl() || !serviceKey()) return send(response, 503, { ok: false, message: '云端图片服务还没有连接。' });
  try {
    const body = request.method === 'POST' ? await bodyOf(request) : {};
    const actor = await authorize(request, body);
    if (!actor || actor.role === 'viewer') return send(response, 401, { ok: false, message: '没有图片管理权限。' });
    await ensureBucket();

    if (request.method === 'GET') {
      const rows = await cloud(`/storage/v1/object/list/${BUCKET}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prefix: 'admin', limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
      });
      const files = (Array.isArray(rows) ? rows : []).filter(item => item.name && item.id).map(item => ({
        name: item.name,
        url: `${supabaseUrl()}/storage/v1/object/public/${BUCKET}/admin/${encodeURIComponent(item.name)}`,
        createdAt: item.created_at || null
      }));
      return send(response, 200, { ok: true, files });
    }

    if (request.method === 'POST') {
      const mimeType = String(body.type || '').toLowerCase();
      if (!ALLOWED_TYPES.has(mimeType)) return send(response, 400, { ok: false, message: '只支持 JPG、PNG、WebP 或 AVIF 图片。' });
      const match = String(body.data || '').match(/^data:[^;]+;base64,(.+)$/);
      if (!match) return send(response, 400, { ok: false, message: '图片资料无效。' });
      const bytes = Buffer.from(match[1], 'base64');
      if (!bytes.length || bytes.length > MAX_FILE_BYTES) return send(response, 413, { ok: false, message: '每张图片必须小于 5MB。' });
      const fileName = safeFileName(body.name, mimeType);
      const objectPath = `admin/${fileName}`;
      const key = serviceKey();
      const upload = await fetch(`${supabaseUrl()}/storage/v1/object/${BUCKET}/${objectPath}`, {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': mimeType, 'x-upsert': 'true' },
        body: bytes
      });
      if (!upload.ok) throw new Error(await upload.text());
      return send(response, 200, { ok: true, file: { name: fileName, url: `${supabaseUrl()}/storage/v1/object/public/${BUCKET}/${objectPath}`, createdAt: new Date().toISOString() } });
    }
    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, { ok: false, message: '云端图片处理失败，请稍后再试。' });
  }
};
