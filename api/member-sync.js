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

function readableCloudMessage(value, fallback = 'Member cloud sync failed.') {
  let text = String(value || '').trim();
  if (text.startsWith('{')) {
    try {
      const payload = JSON.parse(text);
      text = String(payload.error_description || payload.msg || payload.message || payload.error || payload.detail || text).trim();
    } catch {}
  }
  if (!text) return fallback;
  if (/bad request/i.test(text)) return 'Cloud request was rejected. Please check the submitted details and try again.';
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

function hasSupabaseServerConfig() {
  return Boolean(supabaseUrl() && supabaseServiceKey());
}

async function supabaseRequest(path, key, options = {}) {
  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers: {
      apikey: key,
      Authorization: `Bearer ${options.token || key}`,
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

function normalize(value) {
  return String(value || '').trim();
}

function normalizeCode(value) {
  return normalize(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function normalizeStatus(value) {
  const normalized = normalize(value).toLowerCase();
  return normalized === 'blocked' || normalized === 'inactive' ? 'inactive' : 'active';
}

function normalizeTier(value) {
  const normalized = normalize(value);
  return normalized || 'Classic';
}

function memberProfilePayload(member = {}, user) {
  const userMeta = user?.user_metadata || {};
  const referralCode = normalizeCode(member.referralCode || member.referral_code || userMeta.referral_code)
    || normalizeCode(`NP90${String(user?.id || '').replace(/-/g, '').slice(0, 8)}`);
  const area = member.profile?.area || member.defaultArea || member.default_area || member.address || '';
  const defaultPackage = member.profile?.defaultPackage || member.defaultPackage || member.default_package || member.companyName || '';
  const preference = member.profile?.preference || member.preference || member.taste_preference || '';

  return {
    user_id: user.id,
    full_name: normalize(member.name || member.full_name || userMeta.full_name),
    phone: normalize(member.phone || user.phone || userMeta.phone),
    address: normalize(member.address || area),
    city: normalize(member.city || area),
    referral_code: referralCode,
    referred_by_code: normalizeCode(member.referredByCode || member.referred_by_code || userMeta.referred_by_code) || null,
    member_tier: normalizeTier(member.tier || member.member_tier || member.levelId),
    default_area: normalize(area) || null,
    default_package: normalize(defaultPackage) || null,
    taste_preference: normalize(preference) || null,
    updated_at: new Date().toISOString()
  };
}

async function readMemberUser(request) {
  const authorization = String(header(request, 'authorization') || '');
  const token = authorization.replace(/^Bearer\s+/i, '').trim();
  if (!token || !supabaseAnonKey()) return null;

  const response = await fetch(`${supabaseUrl()}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey(),
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });
  if (!response.ok) return null;
  return response.json();
}

async function readAuthUsers() {
  try {
    const payload = await supabaseRequest('/auth/v1/admin/users?page=1&per_page=1000', supabaseServiceKey());
    return Array.isArray(payload?.users) ? payload.users : [];
  } catch (error) {
    return [];
  }
}

function enrichProfilesWithUsers(profiles, users) {
  const userById = new Map(users.map(user => [user.id, user]));
  return profiles.map(profile => {
    const user = userById.get(profile.user_id) || {};
    return {
      ...profile,
      email: user.email || profile.email || '',
      auth_phone: user.phone || '',
      auth_created_at: user.created_at || null,
      last_sign_in_at: user.last_sign_in_at || null
    };
  });
}

async function loadAdminMembers() {
  const [profiles, rewards, users] = await Promise.all([
    supabaseRequest('/rest/v1/profiles?select=*&order=created_at.desc&limit=500', supabaseServiceKey()),
    supabaseRequest('/rest/v1/referral_rewards?select=*&order=created_at.desc&limit=500', supabaseServiceKey()).catch(() => []),
    readAuthUsers()
  ]);

  return {
    profiles: enrichProfilesWithUsers(Array.isArray(profiles) ? profiles : [], users),
    rewards: Array.isArray(rewards) ? rewards : []
  };
}

async function upsertMemberProfile(request, body) {
  const user = await readMemberUser(request);
  if (!user?.id) return { status: 401, payload: { ok: false, message: 'Unauthorized member sync.' } };

  const member = body.member || body.profile || {};
  const profile = await supabaseRequest('/rest/v1/profiles?on_conflict=user_id', supabaseServiceKey(), {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: memberProfilePayload(member, user)
  });

  return {
    status: 200,
    payload: {
      ok: true,
      profile: Array.isArray(profile) ? enrichProfilesWithUsers(profile, [user])[0] : profile
    }
  };
}

function profilePatchFromAdmin(body) {
  const field = normalize(body.field);
  const value = body.value;
  if (field === 'status') return { status: normalizeStatus(value) };
  if (field === 'tier') return { member_tier: normalizeTier(value) };
  if (field === 'adminNote' || field === 'notes') return { notes: normalize(value) };
  if (field === 'name' || field === 'full_name') return { full_name: normalize(value) };
  if (field === 'phone') return { phone: normalize(value) };
  if (field === 'address' || field === 'default_area') return { address: normalize(value), default_area: normalize(value) || null };
  if (field === 'default_package') return { default_package: normalize(value) || null };
  if (field === 'taste_preference') return { taste_preference: normalize(value) || null };
  return null;
}

async function updateMemberProfileAsAdmin(body) {
  const userId = normalize(body.userId || body.user_id);
  const patch = profilePatchFromAdmin(body);
  if (!userId || !patch) {
    return { status: 400, payload: { ok: false, message: 'Invalid member field update.' } };
  }

  await supabaseRequest(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}`, supabaseServiceKey(), {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: {
      ...patch,
      updated_at: new Date().toISOString()
    }
  });
  return { status: 200, payload: { ok: true } };
}

async function updateReferralRewardAsAdmin(body) {
  const rewardId = normalize(body.rewardId || body.id);
  const status = normalize(body.status);
  if (!rewardId || !['pending', 'approved', 'redeemed', 'cancelled'].includes(status)) {
    return { status: 400, payload: { ok: false, message: 'Invalid reward status update.' } };
  }

  await supabaseRequest(`/rest/v1/referral_rewards?id=eq.${encodeURIComponent(rewardId)}`, supabaseServiceKey(), {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: { status, updated_at: new Date().toISOString() }
  });
  return { status: 200, payload: { ok: true } };
}

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});

  try {
    if (!hasSupabaseServerConfig()) {
      return send(response, 503, { ok: false, message: 'Supabase server sync is not configured.' });
    }

    if (request.method === 'GET') {
      if (!isAdminAuthorized(request)) {
        return send(response, 401, { ok: false, message: 'Unauthorized member admin sync.' });
      }
      const result = await loadAdminMembers();
      return send(response, 200, { ok: true, source: 'supabase', ...result });
    }

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
      const body = await readJsonBody(request);
      const action = normalize(body.action || 'upsert-profile');

      if (action === 'upsert-profile') {
        const result = await upsertMemberProfile(request, body);
        return send(response, result.status, result.payload);
      }

      if (!isAdminAuthorized(request, body)) {
        return send(response, 401, { ok: false, message: 'Unauthorized member admin update.' });
      }

      const result = action === 'update-reward-status'
        ? await updateReferralRewardAsAdmin(body)
        : await updateMemberProfileAsAdmin(body);
      return send(response, result.status, result.payload);
    }

    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, {
      ok: false,
      message: readableCloudMessage(error instanceof Error ? error.message : '', 'Member cloud sync failed.')
    });
  }
};
