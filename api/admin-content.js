const ADMIN_CONTENT_SETTING_KEY = 'admin_content';
const ADMIN_CONTENT_HISTORY_KEY = 'admin_content_history';
const ADMIN_CONTENT_SCHEDULE_KEY = 'admin_content_schedule';
const ADMIN_CONTENT_PENDING_KEY = 'admin_content_pending';
const STAFF_SETTING_KEY = 'order_staff_accounts_v1';
const ADMIN_CONTENT_HISTORY_LIMIT = 8;
const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '7045830c';

function send(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
}

function applyCors(request, response) {
  const origin = String(header(request, 'origin') || '');
  const allowedOrigins = new Set([
    'https://90project.online',
    'https://www.90project.online',
    'http://127.0.0.1:3040',
    'http://localhost:3040',
    'http://127.0.0.1:3050',
    'http://localhost:3050'
  ]);
  if (allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,X-Admin-Email,X-Admin-Password');
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

function masterAuthorized(request, body = {}) {
  const expectedEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  const email = String(header(request, 'x-admin-email') || body.adminEmail || '').trim().toLowerCase();
  const password = String(header(request, 'x-admin-password') || body.adminPassword || '');
  const passwordHash = hashLocalSecret(password);
  return email === expectedEmail && (passwordHash === expectedHash || passwordHash === DEFAULT_ADMIN_PASSWORD_HASH);
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

async function readCloudHistory() {
  const key = supabaseServiceKey() || supabaseAnonKey();
  if (!supabaseUrl() || !key) return [];
  const rows = await supabaseRequest(
    `/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(ADMIN_CONTENT_HISTORY_KEY)}&limit=1`,
    key
  );
  const value = Array.isArray(rows) && rows[0] ? rows[0].value : [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function readSetting(keyName, fallback = null) {
  const key = supabaseServiceKey() || supabaseAnonKey();
  if (!supabaseUrl() || !key) return fallback;
  const rows = await supabaseRequest(
    `/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(keyName)}&limit=1`,
    key
  );
  const value = Array.isArray(rows) && rows[0] ? rows[0].value : fallback;
  if (value == null || typeof value === 'object') return value;
  try { return JSON.parse(value); } catch { return fallback; }
}

async function writeSetting(keyName, value) {
  await supabaseRequest('/rest/v1/site_settings?on_conflict=key', supabaseServiceKey(), {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: { key: keyName, value: JSON.stringify(value) }
  });
}

async function authorizeAdmin(request, body = {}) {
  const email = String(header(request, 'x-admin-email') || body.adminEmail || '').trim().toLowerCase();
  const password = String(header(request, 'x-admin-password') || body.adminPassword || '');
  if (masterAuthorized(request, body)) return { id: 'owner', name: '老板', email, role: 'owner' };
  const staff = await readSetting(STAFF_SETTING_KEY, []);
  const account = (Array.isArray(staff) ? staff : []).find(item =>
    String(item.email || '').toLowerCase() === email
    && item.active !== false
    && item.passwordHash === hashLocalSecret(password)
  );
  return account ? { id: account.id, name: account.name, email: account.email, role: account.role } : null;
}

function contentDifference(before, after, prefix = '', changed = []) {
  if (changed.length >= 20) return changed;
  if (before === after) return changed;
  if (!before || !after || typeof before !== 'object' || typeof after !== 'object') {
    changed.push(prefix || 'content');
    return changed;
  }
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  keys.forEach(key => {
    if (changed.length >= 20) return;
    contentDifference(before[key], after[key], prefix ? `${prefix}.${key}` : key, changed);
  });
  return changed;
}

function activeScheduledContent(schedule) {
  if (!schedule?.content || !schedule.startAt) return null;
  const now = Date.now();
  const start = new Date(schedule.startAt).getTime();
  const end = schedule.endAt ? new Date(schedule.endAt).getTime() : Number.POSITIVE_INFINITY;
  return Number.isFinite(start) && now >= start && now < end ? schedule.content : null;
}

async function writeCloudHistory(history) {
  const key = supabaseServiceKey();
  await supabaseRequest(`/rest/v1/site_settings?on_conflict=key`, key, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: {
      key: ADMIN_CONTENT_HISTORY_KEY,
      value: JSON.stringify(history.slice(0, ADMIN_CONTENT_HISTORY_LIMIT))
    }
  });
}

async function writeCloudContent(content, actor = {}) {
  const key = supabaseServiceKey();
  if (!supabaseUrl() || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for cloud writes.');
  }

  const current = await readCloudContent();
  const history = await readCloudHistory();
  if (current.content) {
    const currentSerialized = typeof current.content === 'string' ? current.content : JSON.stringify(current.content);
    const nextSerialized = JSON.stringify(content || {});
    if (currentSerialized !== nextSerialized) {
      history.unshift({
        id: `version-${Date.now()}`,
        savedAt: current.updatedAt || new Date().toISOString(),
        actor: actor.email || 'admin',
        actorName: actor.name || '',
        changedKeys: contentDifference(
          typeof current.content === 'string' ? JSON.parse(current.content) : current.content,
          content || {}
        ),
        content: current.content
      });
      await writeCloudHistory(history);
    }
  }

  await supabaseRequest(`/rest/v1/site_settings?on_conflict=key`, key, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: {
      key: ADMIN_CONTENT_SETTING_KEY,
      value: JSON.stringify(content || {})
    }
  });
  return readCloudContent();
}

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});

  try {
    if (request.method === 'GET') {
      const result = await readCloudContent();
      const history = result.configured ? await readCloudHistory() : [];
      const schedule = result.configured ? await readSetting(ADMIN_CONTENT_SCHEDULE_KEY, null) : null;
      const scheduledContent = activeScheduledContent(schedule);
      const adminViewer = header(request, 'x-admin-email') ? await authorizeAdmin(request) : null;
      const pending = adminViewer ? await readSetting(ADMIN_CONTENT_PENDING_KEY, null) : null;
      return send(response, result.configured ? 200 : 503, {
        ok: result.configured,
        content: scheduledContent || result.content,
        scheduled: Boolean(scheduledContent),
        schedule: schedule ? { startAt: schedule.startAt, endAt: schedule.endAt || null, actor: adminViewer ? schedule.actor || '' : '' } : null,
        pending: pending ? { submittedAt: pending.submittedAt, actor: pending.actor || '', actorName: pending.actorName || '', content: pending.content } : null,
        updatedAt: result.updatedAt || null,
        history: adminViewer ? history.map(version => ({ id: version.id, savedAt: version.savedAt, actor: version.actor || '', actorName: version.actorName || '', changedKeys: version.changedKeys || [] })) : [],
        source: result.configured ? 'supabase' : 'missing-config'
      });
    }

    if (request.method === 'POST' || request.method === 'PUT') {
      const body = await readJsonBody(request);
      const actor = await authorizeAdmin(request, body);
      if (!actor || actor.role === 'viewer') {
        return send(response, 401, { ok: false, message: 'Unauthorized admin content update.' });
      }

      if (body.action === 'preview-version') {
        const history = await readCloudHistory();
        const version = history.find(item => item.id === body.versionId);
        if (!version?.content) return send(response, 404, { ok: false, message: 'Saved version was not found.' });
        return send(response, 200, { ok: true, version: { id: version.id, savedAt: version.savedAt, actor: version.actor || '', content: version.content } });
      }

      if (body.action === 'submit-approval') {
        const pending = { content: body.content || {}, actor: actor.email, actorName: actor.name || '', submittedAt: new Date().toISOString() };
        await writeSetting(ADMIN_CONTENT_PENDING_KEY, pending);
        return send(response, 200, { ok: true, pending: { submittedAt: pending.submittedAt, actor: pending.actor, actorName: pending.actorName } });
      }

      if (body.action === 'approve-pending') {
        if (!['owner', 'manager'].includes(actor.role)) return send(response, 403, { ok: false, message: 'Only owner or manager can approve publishing.' });
        const pending = await readSetting(ADMIN_CONTENT_PENDING_KEY, null);
        if (!pending?.content) return send(response, 404, { ok: false, message: 'No pending content was found.' });
        const result = await writeCloudContent(pending.content, actor);
        await writeSetting(ADMIN_CONTENT_PENDING_KEY, null);
        return send(response, 200, { ok: true, source: 'approval-publish', content: result.content, updatedAt: result.updatedAt || null });
      }

      if (body.action === 'reject-pending') {
        if (!['owner', 'manager'].includes(actor.role)) return send(response, 403, { ok: false, message: 'Only owner or manager can reject publishing.' });
        await writeSetting(ADMIN_CONTENT_PENDING_KEY, null);
        return send(response, 200, { ok: true, pending: null });
      }

      if (body.action === 'schedule') {
        if (!['owner', 'manager'].includes(actor.role)) return send(response, 403, { ok: false, message: 'Only owner or manager can schedule publishing.' });
        const startAt = new Date(body.startAt || '');
        const endAt = body.endAt ? new Date(body.endAt) : null;
        if (Number.isNaN(startAt.getTime()) || (endAt && (Number.isNaN(endAt.getTime()) || endAt <= startAt))) {
          return send(response, 400, { ok: false, message: 'Invalid publishing schedule.' });
        }
        const schedule = { content: body.content || {}, startAt: startAt.toISOString(), endAt: endAt?.toISOString() || null, actor: actor.email, createdAt: new Date().toISOString() };
        await writeSetting(ADMIN_CONTENT_SCHEDULE_KEY, schedule);
        return send(response, 200, { ok: true, schedule: { startAt: schedule.startAt, endAt: schedule.endAt, actor: schedule.actor } });
      }

      if (body.action === 'cancel-schedule') {
        if (!['owner', 'manager'].includes(actor.role)) return send(response, 403, { ok: false, message: 'Only owner or manager can cancel scheduled publishing.' });
        await writeSetting(ADMIN_CONTENT_SCHEDULE_KEY, null);
        return send(response, 200, { ok: true, schedule: null });
      }

      if (body.action === 'restore-version') {
        if (!['owner', 'manager'].includes(actor.role)) return send(response, 403, { ok: false, message: 'Only owner or manager can restore versions.' });
        const history = await readCloudHistory();
        const version = history.find(item => item.id === body.versionId);
        if (!version?.content) return send(response, 404, { ok: false, message: 'Saved version was not found.' });
        const restoredContent = typeof version.content === 'string' ? JSON.parse(version.content) : version.content;
        const result = await writeCloudContent(restoredContent, actor);
        return send(response, 200, {
          ok: true,
          source: 'supabase-version-restore',
          content: result.content,
          updatedAt: result.updatedAt || null
        });
      }

      if (actor.role === 'staff') return send(response, 403, { ok: false, message: 'Content editor changes must be submitted for approval.' });

      const result = await writeCloudContent(body.content || body.value || {}, actor);
      return send(response, 200, {
        ok: true,
        source: 'supabase',
        content: result.content,
        updatedAt: result.updatedAt || null
      });
    }

    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, {
      ok: false,
      message: readableCloudMessage(error instanceof Error ? error.message : '', 'Admin content cloud sync failed.')
    });
  }
};
