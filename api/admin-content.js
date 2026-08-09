const ADMIN_CONTENT_SETTING_KEY = 'admin_content';
const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '3b523443';

function send(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
}

function applyCors(request, response) {
  const origin = String(header(request, 'origin') || '');
  const allowedOrigins = new Set([
    'https://90project.online',
    'https://www.90project.online',
    'http://127.0.0.1:3050',
    'http://localhost:3050'
  ]);
  if (allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Email,X-Admin-Password');
}

function readableCloudMessage(value, fallback = 'Admin content cloud sync failed.') {
  let text = String(value || '').trim();
  if (text.startsWith('{')) {
    try {
      const payload = JSON.parse(text);
      text = String(payload.error_description || payload.msg || payload.message || payload.error || payload.detail || text).trim();
    } catch {}
  }
  if (!text) return fallback;
  if (/bad request/i.test(text)) return 'Cloud request was rejected. Please check the submitted content and try again.';
  if (/jwt|token|unauthorized/i.test(text)) return 'Cloud session expired or is not authorized. Please log in again.';
  return text;
}

function header(request, name) {
  const value = request.headers?.[name.toLowerCase()] || request.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function hashLocalSecret(value) {
  let hash = 2166136261;
  String(value || '').split('').forEach(character => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(16).padStart(8, '0');
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body === 'string') return JSON.parse(request.body || '{}');

  return new Promise((resolve, reject) => {
    let raw = '';
    request.on('data', chunk => {
      raw += chunk;
    });
    request.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

function isAdminAuthorized(request, body = {}) {
  const expectedEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  const email = String(header(request, 'x-admin-email') || body.adminEmail || '').trim().toLowerCase();
  const password = String(header(request, 'x-admin-password') || body.adminPassword || '');
  return email === expectedEmail && hashLocalSecret(password) === expectedHash;
}

function supabaseUrl() {
  return String(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
}

function supabaseAnonKey() {
  return String(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
}

function supabaseServiceKey() {
  return String(process.env.SUPABASE_SERVICE_ROLE_KEY || '');
}

async function supabaseRequest(path, key, options = {}) {
  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(readableCloudMessage(message, `Supabase request failed: ${response.status}`));
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function readCloudContent() {
  const key = supabaseServiceKey() || supabaseAnonKey();
  if (!supabaseUrl() || !key) {
    return { configured: false, content: null };
  }

  const rows = await supabaseRequest(
    `/rest/v1/site_settings?select=value,updated_at&key=eq.${encodeURIComponent(ADMIN_CONTENT_SETTING_KEY)}&limit=1`,
    key
  );
  return {
    configured: true,
    content: Array.isArray(rows) && rows[0] ? rows[0].value : null,
    updatedAt: Array.isArray(rows) && rows[0] ? rows[0].updated_at : null
  };
}

async function writeCloudContent(content) {
  const key = supabaseServiceKey();
  if (!supabaseUrl() || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for cloud writes.');
  }

  await supabaseRequest(`/rest/v1/site_settings?on_conflict=key`, key, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: {
      key: ADMIN_CONTENT_SETTING_KEY,
      value: JSON.stringify(content || {})
    }
  });
}

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});

  try {
    if (request.method === 'GET') {
      const result = await readCloudContent();
      return send(response, result.configured ? 200 : 503, {
        ok: result.configured,
        content: result.content,
        updatedAt: result.updatedAt || null,
        source: result.configured ? 'supabase' : 'missing-config'
      });
    }

    if (request.method === 'POST' || request.method === 'PUT') {
      const body = await readJsonBody(request);
      if (!isAdminAuthorized(request, body)) {
        return send(response, 401, { ok: false, message: 'Unauthorized admin content update.' });
      }

      await writeCloudContent(body.content || body.value || {});
      return send(response, 200, { ok: true, source: 'supabase' });
    }

    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, {
      ok: false,
      message: readableCloudMessage(error instanceof Error ? error.message : '', 'Admin content cloud sync failed.')
    });
  }
};
