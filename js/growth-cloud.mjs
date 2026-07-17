const SUPABASE_MEMBER_SESSION_KEY = 'np90_supabase_member_session_v1';

const normalize = value => String(value || '').trim();
const normalizeEmail = value => normalize(value).toLowerCase();
const normalizePhone = value => normalize(value).replace(/\D/g, '');
const normalizeCode = value => normalize(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
const otpPhone = value => {
  const raw = normalize(value);
  if (raw.startsWith('+')) return raw.replace(/[^\d+]/g, '');
  const digits = normalizePhone(raw);
  if (digits.startsWith('60')) return `+${digits}`;
  if (digits.startsWith('0')) return `+60${digits.slice(1)}`;
  return digits ? `+${digits}` : '';
};

async function readJson(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    const data = await response.json();
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

function validConfig(config) {
  const url = String(config?.url || '').replace(/\/+$/, '');
  const anonKey = String(config?.anonKey || '');
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && anonKey.length > 30
    ? { url, anonKey }
    : null;
}

export async function loadGrowthCloudConfig() {
  const apiConfig = validConfig(await readJson('/api/supabase-config'));
  if (apiConfig) return apiConfig;

  const localConfig = validConfig(await readJson('js/supabase-config.local.json?v=20260715-growth-cloud'));
  if (localConfig) return localConfig;

  return validConfig(await readJson('js/supabase-config.json?v=20260715-growth-cloud')) || { url: '', anonKey: '' };
}

export function createGrowthCloud() {
  let config = { url: '', anonKey: '' };

  function configured() {
    return Boolean(validConfig(config));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SUPABASE_MEMBER_SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function setSession(session) {
    if (!session?.access_token) {
      localStorage.removeItem(SUPABASE_MEMBER_SESSION_KEY);
      return;
    }
    localStorage.setItem(SUPABASE_MEMBER_SESSION_KEY, JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token || null,
      user: session.user || null,
      expires_at: session.expires_at || null
    }));
  }

  async function request(path, options = {}) {
    if (!configured()) return { ok: false, skipped: true };
    const token = options.token || getSession()?.access_token || config.anonKey;
    const headers = {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(options.headers || {})
    };
    if (options.body) headers['Content-Type'] = 'application/json';
    const response = await fetch(`${config.url}${path}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    if (!response.ok) return { ok: false, status: response.status, message: await response.text() };
    if (response.status === 204) return { ok: true, data: null };
    const text = await response.text();
    return { ok: true, data: text ? JSON.parse(text) : null };
  }

  async function init() {
    config = await loadGrowthCloudConfig();
    return { configured: configured() };
  }

  async function signUp(member, password) {
    if (!configured()) return { ok: false, skipped: true };
    const response = await fetch(`${config.url}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizeEmail(member.email),
        password,
        data: {
          full_name: member.name,
          phone: member.phone,
          referral_code: member.referralCode || '',
          referred_by_code: member.referredByCode || null
        }
      })
    });
    if (!response.ok) return { ok: false, message: await response.text() };
    const payload = await response.json();
    const session = payload?.session || payload;
    if (session?.access_token) setSession(session);
    return { ok: true, session: session?.access_token ? session : null, user: payload?.user || session?.user || null };
  }

  async function sendPhoneOtp(phone) {
    if (!configured()) return { ok: false, skipped: true };
    const normalizedPhone = otpPhone(phone);
    if (!normalizedPhone) return { ok: false, message: 'missing_phone' };
    const response = await fetch(`${config.url}/auth/v1/otp`, {
      method: 'POST',
      headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: normalizedPhone,
        create_user: true,
        data: { source: '90_project_member_phone_verification' }
      })
    });
    if (!response.ok) return { ok: false, message: await response.text() };
    return { ok: true };
  }

  async function verifyPhoneOtp(phone, token) {
    if (!configured()) return { ok: false, skipped: true };
    const normalizedPhone = otpPhone(phone);
    const code = normalize(token);
    if (!normalizedPhone || !code) return { ok: false, message: 'missing_code' };
    const response = await fetch(`${config.url}/auth/v1/verify`, {
      method: 'POST',
      headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalizedPhone, token: code, type: 'sms' })
    });
    if (!response.ok) return { ok: false, message: await response.text() };
    const session = await response.json();
    if (session?.access_token) setSession(session);
    return { ok: true, session: session?.access_token ? session : null, user: session?.user || null };
  }

  async function signIn(identity, password) {
    if (!configured()) return { ok: false, skipped: true };
    const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizeEmail(identity), password })
    });
    if (!response.ok) return { ok: false, message: await response.text() };
    const session = await response.json();
    if (!session?.access_token) return { ok: false };
    setSession(session);
    return { ok: true, session };
  }

  function signOut() {
    setSession(null);
  }

  async function loadProfile(session = getSession()) {
    const userId = session?.user?.id;
    if (!userId || !session?.access_token) return null;
    const result = await request(`/rest/v1/profiles?select=*&user_id=eq.${encodeURIComponent(userId)}&limit=1`, {
      token: session.access_token
    });
    return result.ok ? result.data?.[0] || null : null;
  }

  function profileToMember(profile, session, fallback = {}) {
    const email = normalizeEmail(session?.user?.email || fallback.email);
    return {
      id: fallback.id,
      name: profile?.full_name || fallback.name || email.split('@')[0] || '90 Member',
      email,
      phone: profile?.phone || fallback.phone || '',
      password: fallback.password || '',
      birthday: fallback.birthday || '',
      address: profile?.address || fallback.address || '',
      companyName: fallback.companyName || '',
      eventType: fallback.eventType || '',
      estimatedPax: fallback.estimatedPax || 0,
      preference: profile?.taste_preference || fallback.preference || '',
      source: 'supabase',
      referralCode: normalizeCode(profile?.referral_code || fallback.referralCode),
      referredByCode: normalizeCode(profile?.referred_by_code || fallback.referredByCode),
      levelId: String(profile?.member_tier || fallback.levelId || 'member').toLowerCase().replace(/\s+/g, '_'),
      supabaseUserId: session?.user?.id || fallback.supabaseUserId || '',
      cloudSyncedAt: new Date().toISOString()
    };
  }

  async function updateProfile(member, session = getSession()) {
    const userId = session?.user?.id;
    if (!userId || !session?.access_token) return { ok: false, skipped: true };
    return request(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}`, {
      method: 'PATCH',
      token: session.access_token,
      headers: { Prefer: 'return=minimal' },
      body: {
        full_name: member.name || '',
        phone: member.phone || '',
        address: member.address || '',
        city: member.address || '',
        referral_code: normalizeCode(member.referralCode || ''),
        referred_by_code: normalizeCode(member.referredByCode || '') || null,
        member_tier: member.levelId || 'member',
        default_area: member.address || null,
        default_package: member.companyName || null,
        taste_preference: member.preference || null
      }
    });
  }

  async function loadMemberGrowth(session = getSession()) {
    if (!session?.access_token || !session?.user?.id) return null;
    const token = session.access_token;
    const [points, coupons, applications, promoters, commissions, withdrawals, notifications] = await Promise.all([
      request('/rest/v1/growth_points_ledgers?select=*&order=created_at.desc&limit=20', { token }),
      request('/rest/v1/growth_member_coupons?select=*,growth_coupon_templates(name,discount_type,discount_value)&order=issued_at.desc&limit=20', { token }),
      request('/rest/v1/growth_promoter_applications?select=*&order=created_at.desc&limit=10', { token }),
      request('/rest/v1/growth_promoters?select=*,growth_referral_codes(code,active)&limit=1', { token }),
      request('/rest/v1/growth_commission_ledgers?select=*&order=created_at.desc&limit=20', { token }),
      request('/rest/v1/growth_withdrawal_requests?select=*&order=created_at.desc&limit=20', { token }),
      request('/rest/v1/growth_notifications?select=*&order=created_at.desc&limit=20', { token })
    ]);
    return {
      points: points.ok ? points.data || [] : [],
      coupons: coupons.ok ? coupons.data || [] : [],
      applications: applications.ok ? applications.data || [] : [],
      promoters: promoters.ok ? promoters.data || [] : [],
      commissions: commissions.ok ? commissions.data || [] : [],
      withdrawals: withdrawals.ok ? withdrawals.data || [] : [],
      notifications: notifications.ok ? notifications.data || [] : []
    };
  }

  async function submitPromoterApplication(input, session = getSession()) {
    if (!session?.access_token || !session?.user?.id) return { ok: false, skipped: true };
    return request('/rest/v1/growth_promoter_applications', {
      method: 'POST',
      token: session.access_token,
      headers: { Prefer: 'return=representation' },
      body: {
        member_id: session.user.id,
        social_platform: input.socialPlatform || '',
        social_account: input.socialAccount || '',
        region: input.region || '',
        promotion_method: input.promotionMethod || '',
        customer_type: input.customerType || '',
        terms_accepted: Boolean(input.termsAccepted),
        privacy_accepted: Boolean(input.privacyAccepted)
      }
    });
  }

  async function submitWithdrawal(input, session = getSession()) {
    if (!session?.access_token || !session?.user?.id) return { ok: false, skipped: true };
    const promoterResult = await request('/rest/v1/growth_promoters?select=id&limit=1', { token: session.access_token });
    const promoterId = promoterResult.ok ? promoterResult.data?.[0]?.id : null;
    if (!promoterId) return { ok: false, reason: 'promoter_not_approved' };
    return request('/rest/v1/growth_withdrawal_requests', {
      method: 'POST',
      token: session.access_token,
      headers: { Prefer: 'return=representation' },
      body: {
        promoter_id: promoterId,
        amount: Number(input.amount) || 0,
        bank_name: input.bankName || '',
        bank_account_encrypted: input.bankAccount || '',
        account_name: input.accountName || '',
        note: input.note || ''
      }
    });
  }

  return {
    init,
    configured,
    getSession,
    signUp,
    sendPhoneOtp,
    verifyPhoneOtp,
    signIn,
    signOut,
    loadProfile,
    profileToMember,
    updateProfile,
    loadMemberGrowth,
    submitPromoterApplication,
    submitWithdrawal
  };
}
