const STAFF_SETTING_KEY = 'order_staff_accounts_v1';
const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '7045830c';

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
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
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

async function supabase(path, options = {}) {
  const key = serviceKey();
  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (!response.ok) throw new Error(await response.text());
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function masterAuthorized(email, password) {
  const expectedEmail = String(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  return String(email || '').trim().toLowerCase() === expectedEmail
    && [expectedHash, DEFAULT_ADMIN_PASSWORD_HASH].includes(hashSecret(password));
}

async function readStaff() {
  const rows = await supabase(`/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(STAFF_SETTING_KEY)}&limit=1`);
  const value = Array.isArray(rows) && rows[0]?.value;
  if (!value) return [];
  try { return Array.isArray(value) ? value : JSON.parse(value); } catch { return []; }
}

async function writeStaff(accounts) {
  await supabase('/rest/v1/site_settings?on_conflict=key', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: { key: STAFF_SETTING_KEY, value: JSON.stringify(accounts) }
  });
}

const publicAccount = account => ({ id: account.id, name: account.name, email: account.email, role: account.role, active: account.active !== false, createdAt: account.createdAt });

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (!supabaseUrl() || !serviceKey()) return send(response, 503, { ok: false, message: '云端还没有连接。' });
  try {
    const body = ['POST', 'PUT', 'DELETE'].includes(request.method) ? await bodyOf(request) : {};
    const email = String(header(request, 'x-admin-email') || body.email || '').trim().toLowerCase();
    const password = String(header(request, 'x-admin-password') || body.password || '');
    if (request.method === 'POST' && body.action === 'login') {
      if (masterAuthorized(email, password)) return send(response, 200, { ok: true, user: { id: 'owner', name: '老板', email, role: 'owner', active: true } });
      const account = (await readStaff()).find(item => item.email === email && item.active !== false && item.passwordHash === hashSecret(password));
      return account ? send(response, 200, { ok: true, user: publicAccount(account) }) : send(response, 401, { ok: false, message: '账号或密码不正确。' });
    }
    if (!masterAuthorized(email, password)) return send(response, 403, { ok: false, message: '只有老板账号可以管理员工。' });
    let accounts = await readStaff();
    if (request.method === 'GET') return send(response, 200, { ok: true, accounts: accounts.map(publicAccount) });
    if (request.method === 'PUT') {
      const account = body.account || {};
      const accountEmail = String(account.email || '').trim().toLowerCase();
      if (!accountEmail || !account.name || !['manager', 'staff', 'viewer'].includes(account.role)) return send(response, 400, { ok: false, message: '请填写完整员工资料。' });
      const existing = accounts.find(item => item.id === account.id || item.email === accountEmail);
      if (!existing && String(account.password || '').length < 6) return send(response, 400, { ok: false, message: '新员工密码至少 6 个字符。' });
      const saved = { ...(existing || {}), id: existing?.id || `staff_${Date.now()}`, name: String(account.name).trim(), email: accountEmail, role: account.role, active: account.active !== false, createdAt: existing?.createdAt || new Date().toISOString() };
      if (account.password) saved.passwordHash = hashSecret(account.password);
      accounts = existing ? accounts.map(item => item.id === existing.id ? saved : item) : [...accounts, saved];
      await writeStaff(accounts);
      return send(response, 200, { ok: true, account: publicAccount(saved), accounts: accounts.map(publicAccount) });
    }
    if (request.method === 'DELETE') {
      accounts = accounts.filter(item => item.id !== body.id);
      await writeStaff(accounts);
      return send(response, 200, { ok: true, accounts: accounts.map(publicAccount) });
    }
    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, { ok: false, message: '员工账号云端操作失败。' });
  }
};
