const GROWTH_STATE_SETTING_KEY = 'growth_state';
const DEFAULT_ADMIN_EMAIL = '9088project@gmail.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '3b523443';

const GROWTH_ARRAY_KEYS = [
  'members',
  'promoterApplications',
  'promoters',
  'referralCodes',
  'referralClicks',
  'referralRelations',
  'enquiries',
  'orders',
  'pointsLedgers',
  'couponTemplates',
  'memberCoupons',
  'couponUsages',
  'commissionLedgers',
  'withdrawalRequests',
  'withdrawalPayments',
  'notifications',
  'auditLogs',
  'riskFlags'
];

const DEFAULT_CONFIG = {
  currency: 'MYR',
  referralWindowDays: 60,
  refundObservationDays: 7,
  minimumWithdrawal: 50,
  defaultCommission: { type: 'percent', value: 3 },
  maxReferralGenerations: 3,
  referralCommissionRates: [3, 1, 1],
  minimumCommissionEligibleAmount: 100,
  maxCommissionPercentPerOrder: 5,
  autoReleaseCommissions: true,
  pointsPerMyr: 1,
  levels: [
    { id: 'member', name: '90 Member', spendThreshold: 0, orderThreshold: 0, discountPercent: 0, pointsMultiplier: 1, active: true },
    { id: 'silver', name: '90 Silver', spendThreshold: 500, orderThreshold: 2, discountPercent: 2, pointsMultiplier: 1.25, active: true },
    { id: 'gold', name: '90 Gold', spendThreshold: 1500, orderThreshold: 5, discountPercent: 5, pointsMultiplier: 1.5, active: true },
    { id: 'vip', name: '90 VIP', spendThreshold: 4000, orderThreshold: 10, discountPercent: 8, pointsMultiplier: 2, active: true }
  ],
  commissionRules: [
    { id: 'generation-1', name: 'Generation 1 referral', service: '*', type: 'percent', value: 3, generation: 1, active: true },
    { id: 'generation-2', name: 'Generation 2 referral', service: '*', type: 'percent', value: 1, generation: 2, active: true },
    { id: 'generation-3', name: 'Generation 3 referral', service: '*', type: 'percent', value: 1, generation: 3, active: true }
  ]
};

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

function readableCloudMessage(value, fallback = 'Growth cloud sync failed.') {
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

const normalize = value => String(value || '').trim();
const normalizeEmail = value => normalize(value).toLowerCase();
const normalizePhone = value => normalize(value).replace(/\D/g, '');
const normalizeCode = value => normalize(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
const nowIso = () => new Date().toISOString();
const money = value => Math.round((Number(value) || 0) * 100) / 100;

function emptyGrowthState() {
  return {
    version: 1,
    config: { ...DEFAULT_CONFIG, defaultCommission: { ...DEFAULT_CONFIG.defaultCommission } },
    ...Object.fromEntries(GROWTH_ARRAY_KEYS.map(key => [key, []]))
  };
}

function normalizeState(raw) {
  const base = emptyGrowthState();
  const source = raw && typeof raw === 'object' ? raw : {};
  const state = {
    ...base,
    ...source,
    version: Number(source.version || base.version),
    config: {
      ...base.config,
      ...(source.config || {}),
      defaultCommission: {
        ...base.config.defaultCommission,
        ...(source.config?.defaultCommission || {})
      },
      levels: Array.isArray(source.config?.levels) && source.config.levels.length ? source.config.levels : base.config.levels,
      commissionRules: Array.isArray(source.config?.commissionRules) && source.config.commissionRules.length ? source.config.commissionRules : base.config.commissionRules,
      referralCommissionRates: Array.isArray(source.config?.referralCommissionRates) && source.config.referralCommissionRates.length ? source.config.referralCommissionRates : base.config.referralCommissionRates
    }
  };
  GROWTH_ARRAY_KEYS.forEach(key => {
    state[key] = Array.isArray(source[key]) ? source[key] : [];
  });
  return state;
}

function parseStoredState(value) {
  if (!value) return emptyGrowthState();
  if (typeof value === 'object') return normalizeState(value);
  if (typeof value === 'string') {
    try {
      return normalizeState(JSON.parse(value));
    } catch {
      return emptyGrowthState();
    }
  }
  return emptyGrowthState();
}

async function readCloudState() {
  const rows = await supabaseRequest(
    `/rest/v1/site_settings?select=value,updated_at&key=eq.${encodeURIComponent(GROWTH_STATE_SETTING_KEY)}&limit=1`,
    supabaseServiceKey()
  );
  return {
    state: parseStoredState(Array.isArray(rows) && rows[0] ? rows[0].value : null),
    updatedAt: Array.isArray(rows) && rows[0] ? rows[0].updated_at : null
  };
}

async function writeCloudState(state) {
  await supabaseRequest('/rest/v1/site_settings?on_conflict=key', supabaseServiceKey(), {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: {
      key: GROWTH_STATE_SETTING_KEY,
      value: JSON.stringify(normalizeState(state))
    }
  });
  return readCloudState();
}

async function readAuthUsers() {
  try {
    const payload = await supabaseRequest('/auth/v1/admin/users?page=1&per_page=1000', supabaseServiceKey());
    return Array.isArray(payload?.users) ? payload.users : [];
  } catch {
    return [];
  }
}

async function loadProfiles() {
  try {
    const profiles = await supabaseRequest('/rest/v1/profiles?select=*&order=created_at.desc&limit=1000', supabaseServiceKey());
    return Array.isArray(profiles) ? profiles : [];
  } catch {
    return [];
  }
}

async function loadTable(path) {
  try {
    const rows = await supabaseRequest(path, supabaseServiceKey());
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

async function loadGrowthTables() {
  const [
    promoterApplications,
    promoters,
    referralCodes,
    referralRelations,
    orders,
    commissionLedgers,
    withdrawalRequests,
    withdrawalPayments,
    pointsLedgers,
    memberCoupons,
    notifications
  ] = await Promise.all([
    loadTable('/rest/v1/growth_promoter_applications?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_promoters?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_referral_codes?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_referral_relations?select=*&order=bound_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_orders?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_commission_ledgers?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_withdrawal_requests?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_withdrawal_payments?select=*&order=paid_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_points_ledgers?select=*&order=created_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_member_coupons?select=*&order=issued_at.desc&limit=1000'),
    loadTable('/rest/v1/growth_notifications?select=*&order=created_at.desc&limit=1000')
  ]);
  return {
    promoterApplications,
    promoters,
    referralCodes,
    referralRelations,
    orders,
    commissionLedgers,
    withdrawalRequests,
    withdrawalPayments,
    pointsLedgers,
    memberCoupons,
    notifications
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

function fallbackReferralCode(userId, email, phone) {
  const seed = normalizeCode(String(userId || '').replace(/-/g, '').slice(0, 8))
    || normalizeCode(email).slice(0, 8)
    || normalizePhone(phone).slice(-8)
    || String(Date.now()).slice(-8);
  return `NP90${seed}`.slice(0, 14);
}

function memberIdFromProfile(profile, user) {
  const seed = normalize(profile.user_id || user?.id || profile.referral_code || profile.email || profile.phone);
  return `member_${seed.replace(/[^A-Za-z0-9]/g, '').slice(0, 32) || Date.now()}`;
}

function upsertById(list, id, patch) {
  const existing = list.find(item => item.id === id);
  if (existing) {
    Object.assign(existing, patch);
    return existing;
  }
  const next = { id, ...patch };
  list.unshift(next);
  return next;
}

function chooseRankedStatus(existing, incoming, rank) {
  const current = normalize(existing);
  const next = normalize(incoming);
  if (!current) return next;
  if (!next) return current;
  return (rank[current] || 0) >= (rank[next] || 0) ? current : next;
}

const APPLICATION_STATUS_RANK = { submitted: 1, under_review: 2, approved: 3, rejected: 3, suspended: 3 };
const PROMOTER_STATUS_RANK = { pending: 1, approved: 2, suspended: 3, rejected: 3 };
const ORDER_STATUS_RANK = {
  new: 1,
  quoted: 2,
  confirmed: 3,
  deposit_paid: 4,
  service_completed: 5,
  fully_paid: 6,
  cancelled: 7,
  refunded: 7,
  partially_refunded: 7
};
const COMMISSION_STATUS_RANK = { pending: 1, confirming: 2, available: 3, frozen: 4, paid: 5, reversed: 5, cancelled: 5 };
const WITHDRAWAL_STATUS_RANK = { submitted: 1, under_review: 2, approved: 3, processing: 4, paid: 5, rejected: 5, cancelled: 5 };

function mergeProfilesIntoState(inputState, profiles = [], users = []) {
  const state = normalizeState(inputState);
  const userById = new Map(users.map(user => [user.id, user]));
  const memberByUserId = new Map(state.members.filter(item => item.supabaseUserId).map(item => [item.supabaseUserId, item]));
  const memberByEmail = new Map(state.members.filter(item => item.email).map(item => [normalizeEmail(item.email), item]));
  const memberByPhone = new Map(state.members.filter(item => item.phone).map(item => [normalizePhone(item.phone), item]));
  const memberByReferral = new Map(state.members.filter(item => item.referralCode).map(item => [normalizeCode(item.referralCode), item]));

  profiles.forEach(profile => {
    const user = userById.get(profile.user_id) || {};
    const email = normalizeEmail(user.email || profile.email);
    const phone = normalize(profile.phone || user.phone || profile.auth_phone);
    const phoneKey = normalizePhone(phone);
    const referralCode = normalizeCode(profile.referral_code) || fallbackReferralCode(profile.user_id, email, phone);
    const member = memberByUserId.get(profile.user_id)
      || memberByReferral.get(referralCode)
      || (email ? memberByEmail.get(email) : null)
      || (phoneKey ? memberByPhone.get(phoneKey) : null)
      || upsertById(state.members, memberIdFromProfile(profile, user), {});

    Object.assign(member, {
      name: normalize(profile.full_name || user.user_metadata?.full_name || member.name || email.split('@')[0] || '90 Member'),
      email: email || member.email || '',
      phone: phone || member.phone || '',
      address: normalize(profile.address || profile.default_area || member.address),
      preference: normalize(profile.taste_preference || member.preference),
      source: member.source || 'supabase-profile',
      registeredAt: member.registeredAt || profile.created_at || user.created_at || nowIso(),
      updatedAt: profile.updated_at || user.updated_at || nowIso(),
      lastPurchaseAt: member.lastPurchaseAt || null,
      orderCount: Number(member.orderCount || 0),
      totalSpend: money(member.totalSpend),
      pointsBalance: Number(member.pointsBalance || 0),
      couponCount: Number(member.couponCount || 0),
      levelId: String(profile.member_tier || member.levelId || 'member').toLowerCase().replace(/\s+/g, '_'),
      status: member.status && member.status !== 'lead' ? member.status : 'active',
      referralCode,
      referredByCode: normalizeCode(profile.referred_by_code || member.referredByCode) || '',
      supabaseUserId: profile.user_id || user.id || member.supabaseUserId || ''
    });

    memberByUserId.set(member.supabaseUserId, member);
    if (member.email) memberByEmail.set(normalizeEmail(member.email), member);
    if (member.phone) memberByPhone.set(normalizePhone(member.phone), member);
    if (member.referralCode) memberByReferral.set(normalizeCode(member.referralCode), member);

    const promoterId = `promoter_${member.id}`;
    const promoter = upsertById(state.promoters, promoterId, {
      memberId: member.id,
      status: 'approved',
      riskStatus: 'clear',
      approvedAt: member.registeredAt || nowIso(),
      commissionRuleId: 'member-referral',
      clickCount: 0,
      registrationCount: 0,
      orderCount: 0,
      salesAmount: 0,
      commissionAmount: 0
    });
    Object.assign(promoter, { memberId: member.id, status: promoter.status || 'approved' });

    const codeId = `code_${referralCode}`;
    upsertById(state.referralCodes, codeId, {
      promoterId: promoter.id,
      memberId: member.id,
      code: referralCode,
      campaignId: null,
      active: true,
      createdAt: member.registeredAt || nowIso()
    });
  });

  const memberByCode = new Map(state.members.filter(item => item.referralCode).map(item => [normalizeCode(item.referralCode), item]));
  state.members.forEach(member => {
    const referredByCode = normalizeCode(member.referredByCode);
    if (!referredByCode) return;
    const parent = memberByCode.get(referredByCode);
    if (!parent || parent.id === member.id) return;
    const parentPromoter = state.promoters.find(item => item.memberId === parent.id);
    if (!parentPromoter) return;
    const existing = state.referralRelations.find(item => item.memberId === member.id && item.status === 'active');
    if (existing) {
      existing.promoterId = parentPromoter.id;
      existing.promoterMemberId = parent.id;
      existing.referralCode = referredByCode;
      existing.source = existing.source || 'supabase-profile';
      return;
    }
    state.referralRelations.unshift({
      id: `relation_${parent.id}_${member.id}`,
      memberId: member.id,
      promoterId: parentPromoter.id,
      promoterMemberId: parent.id,
      referralCode: referredByCode,
      clickId: null,
      status: 'active',
      boundAt: member.registeredAt || nowIso(),
      boundBy: 'supabase-profile',
      source: 'supabase-profile'
    });
  });

  return normalizeState(state);
}

function mergeSupabaseGrowthTables(inputState, tables = {}) {
  const state = normalizeState(inputState);
  const memberByUserId = new Map(state.members.filter(item => item.supabaseUserId).map(item => [item.supabaseUserId, item]));
  const promoterBySupabaseId = new Map();
  const localPromoterByMemberId = new Map(state.promoters.map(item => [item.memberId, item]));

  (tables.promoters || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    const promoterId = `promoter_${member.id}`;
    const existing = state.promoters.find(item => item.id === promoterId) || localPromoterByMemberId.get(member.id);
    const promoter = upsertById(state.promoters, existing?.id || promoterId, {
      memberId: member.id,
      status: chooseRankedStatus(existing?.status, row.status || 'approved', PROMOTER_STATUS_RANK),
      riskStatus: row.risk_status || existing?.riskStatus || 'clear',
      approvedAt: row.approved_at || existing?.approvedAt || member.registeredAt || nowIso(),
      commissionRuleId: existing?.commissionRuleId || row.commission_rule_id || 'member-referral',
      clickCount: Number(existing?.clickCount || 0),
      registrationCount: Number(existing?.registrationCount || 0),
      orderCount: Number(existing?.orderCount || 0),
      salesAmount: money(existing?.salesAmount || 0),
      commissionAmount: money(existing?.commissionAmount || 0),
      supabasePromoterId: row.id,
      updatedAt: row.updated_at || existing?.updatedAt || nowIso()
    });
    promoterBySupabaseId.set(row.id, promoter);
    localPromoterByMemberId.set(member.id, promoter);
  });

  state.members.forEach(member => {
    if (!localPromoterByMemberId.has(member.id)) {
      const promoter = state.promoters.find(item => item.memberId === member.id);
      if (promoter) localPromoterByMemberId.set(member.id, promoter);
    }
  });

  (tables.promoterApplications || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    const applicationId = `application_${row.id}`;
    const existing = state.promoterApplications.find(item => item.id === applicationId);
    upsertById(state.promoterApplications, applicationId, {
      memberId: member.id,
      name: member.name || '',
      phone: member.phone || '',
      email: member.email || '',
      socialPlatform: row.social_platform || existing?.socialPlatform || '',
      socialAccount: row.social_account || existing?.socialAccount || '',
      region: row.region || existing?.region || '',
      promotionMethod: row.promotion_method || existing?.promotionMethod || '',
      customerType: row.customer_type || existing?.customerType || '',
      termsAccepted: Boolean(row.terms_accepted ?? existing?.termsAccepted),
      privacyAccepted: Boolean(row.privacy_accepted ?? existing?.privacyAccepted),
      status: chooseRankedStatus(existing?.status, row.status || 'submitted', APPLICATION_STATUS_RANK),
      rejectionReason: row.rejection_reason || existing?.rejectionReason || '',
      createdAt: row.created_at || existing?.createdAt || nowIso(),
      updatedAt: row.updated_at || existing?.updatedAt || nowIso(),
      supabaseApplicationId: row.id
    });
  });

  (tables.referralCodes || []).forEach(row => {
    const directPromoter = promoterBySupabaseId.get(row.promoter_id);
    const promoter = directPromoter || state.promoters.find(item => item.supabasePromoterId === row.promoter_id);
    if (!promoter) return;
    const member = state.members.find(item => item.id === promoter.memberId);
    const code = normalizeCode(row.code);
    if (!code) return;
    member.referralCode = member.referralCode || code;
    upsertById(state.referralCodes, `code_${code}`, {
      promoterId: promoter.id,
      memberId: member.id,
      code,
      campaignId: row.campaign_id || null,
      active: row.active !== false,
      createdAt: row.created_at || nowIso(),
      expiresAt: row.expires_at || null,
      supabaseReferralCodeId: row.id
    });
  });

  const codeBySupabaseId = new Map((tables.referralCodes || []).map(row => [row.id, row]));
  (tables.referralRelations || []).forEach(row => {
    const child = memberByUserId.get(row.referred_member_id);
    const promoter = promoterBySupabaseId.get(row.promoter_id) || state.promoters.find(item => item.supabasePromoterId === row.promoter_id);
    const parent = promoter && state.members.find(item => item.id === promoter.memberId);
    if (!child || !promoter || !parent || child.id === parent.id) return;
    const directCode = codeBySupabaseId.get(row.referral_code_id);
    const referralCode = normalizeCode(directCode?.code || parent.referralCode);
    const existing = state.referralRelations.find(item => item.memberId === child.id && item.promoterMemberId === parent.id)
      || state.referralRelations.find(item => item.id === `relation_${row.id}`);
    const patch = {
      memberId: child.id,
      promoterId: promoter.id,
      promoterMemberId: parent.id,
      referralCode,
      clickId: row.click_id || existing?.clickId || null,
      status: row.status || existing?.status || 'active',
      boundAt: row.bound_at || existing?.boundAt || child.registeredAt || nowIso(),
      boundBy: row.bound_by || existing?.boundBy || 'supabase-growth',
      source: 'supabase-growth',
      supabaseRelationId: row.id
    };
    if (existing) Object.assign(existing, patch);
    else state.referralRelations.unshift({ id: `relation_${row.id}`, ...patch });
  });

  (tables.orders || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    const orderId = `order_${row.id}`;
    const existing = state.orders.find(item => item.id === orderId);
    upsertById(state.orders, orderId, {
      memberId: member.id,
      referralRelationId: existing?.referralRelationId || null,
      serviceType: row.service_type || existing?.serviceType || '',
      status: chooseRankedStatus(existing?.status, row.status || 'new', ORDER_STATUS_RANK),
      subtotal: money(row.subtotal),
      sstAmount: money(row.sst_amount),
      deliveryFee: money(row.delivery_fee),
      extraLabourFee: money(row.extra_labour_fee),
      thirdPartyFee: money(row.third_party_fee),
      couponDiscount: money(row.coupon_discount),
      totalAmount: money(row.total_amount),
      refundedAmount: money(row.refunded_amount),
      adminNotes: existing?.adminNotes || '',
      source: existing?.source || 'supabase-growth',
      createdAt: row.created_at || existing?.createdAt || nowIso(),
      updatedAt: row.updated_at || existing?.updatedAt || nowIso(),
      completedAt: row.completed_at || existing?.completedAt || null,
      supabaseOrderId: row.id
    });
  });

  (tables.commissionLedgers || []).forEach(row => {
    const promoter = promoterBySupabaseId.get(row.promoter_id) || state.promoters.find(item => item.supabasePromoterId === row.promoter_id);
    const member = memberByUserId.get(row.member_id);
    if (!promoter || !member) return;
    const commissionId = `commission_${row.id}`;
    const existing = state.commissionLedgers.find(item => item.id === commissionId);
    upsertById(state.commissionLedgers, commissionId, {
      promoterId: promoter.id,
      memberId: member.id,
      orderId: row.order_id ? `order_${row.order_id}` : existing?.orderId || '',
      campaignId: existing?.campaignId || null,
      ruleId: row.rule_id || existing?.ruleId || '',
      generation: Number(existing?.generation || 1),
      referralRelationId: existing?.referralRelationId || null,
      eligibleAmount: money(row.eligible_amount),
      commissionType: existing?.commissionType || 'percent',
      commissionRate: Number(existing?.commissionRate || 0),
      commissionAmount: money(row.commission_amount),
      status: chooseRankedStatus(existing?.status, row.status || 'confirming', COMMISSION_STATUS_RANK),
      availableAt: row.available_at || existing?.availableAt || null,
      reversedAmount: money(row.reversed_amount),
      reversalReason: row.reversal_reason || existing?.reversalReason || '',
      createdAt: row.created_at || existing?.createdAt || nowIso(),
      updatedAt: row.updated_at || existing?.updatedAt || nowIso(),
      supabaseCommissionId: row.id
    });
  });

  (tables.withdrawalRequests || []).forEach(row => {
    const promoter = promoterBySupabaseId.get(row.promoter_id) || state.promoters.find(item => item.supabasePromoterId === row.promoter_id);
    const member = promoter && state.members.find(item => item.id === promoter.memberId);
    if (!promoter || !member) return;
    const withdrawalId = `withdrawal_${row.id}`;
    const existing = state.withdrawalRequests.find(item => item.id === withdrawalId);
    upsertById(state.withdrawalRequests, withdrawalId, {
      promoterId: promoter.id,
      memberId: member.id,
      amount: money(row.amount),
      paidAmount: money(existing?.paidAmount || 0),
      bankName: row.bank_name || existing?.bankName || '',
      bankAccount: existing?.bankAccount || (row.bank_account_encrypted ? '已提交银行资料' : ''),
      accountName: row.account_name || existing?.accountName || '',
      duitNowType: row.duitnow_type || existing?.duitNowType || '',
      duitNowNumber: existing?.duitNowNumber || (row.duitnow_number_encrypted ? '已提交 DuitNow 资料' : ''),
      note: row.note || existing?.note || '',
      status: chooseRankedStatus(existing?.status, row.status || 'submitted', WITHDRAWAL_STATUS_RANK),
      createdAt: row.created_at || existing?.createdAt || nowIso(),
      updatedAt: row.updated_at || existing?.updatedAt || nowIso(),
      reviewedAt: row.reviewed_at || existing?.reviewedAt || null,
      supabaseWithdrawalId: row.id
    });
  });

  (tables.withdrawalPayments || []).forEach(row => {
    const withdrawalId = `withdrawal_${row.withdrawal_request_id}`;
    if (!state.withdrawalRequests.some(item => item.id === withdrawalId)) return;
    upsertById(state.withdrawalPayments, `payment_${row.id}`, {
      withdrawalId,
      paidAt: row.paid_at || nowIso(),
      method: row.method || 'Manual bank transfer',
      referenceNumber: row.reference_number || '',
      processedBy: row.processed_by || 'supabase-growth',
      proofUrl: row.proof_url || '',
      supabasePaymentId: row.id
    });
  });

  (tables.pointsLedgers || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    upsertById(state.pointsLedgers, `points_${row.id}`, {
      memberId: member.id,
      transactionType: row.transaction_type || 'manual_adjustment',
      points: Number(row.points || 0),
      balanceBefore: Number(row.balance_before || 0),
      balanceAfter: Number(row.balance_after || 0),
      relatedOrderId: row.related_order_id ? `order_${row.related_order_id}` : null,
      relatedCampaignId: row.related_campaign_id || null,
      reason: row.reason || '',
      createdBy: row.created_by || 'supabase-growth',
      createdAt: row.created_at || nowIso(),
      supabasePointsId: row.id
    });
    member.pointsBalance = Number(row.balance_after ?? member.pointsBalance ?? 0);
  });

  (tables.memberCoupons || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    upsertById(state.memberCoupons, `coupon_${row.id}`, {
      memberId: member.id,
      templateId: row.template_id || '',
      code: normalize(row.code),
      status: row.status || 'active',
      issuedAt: row.issued_at || nowIso(),
      expiresAt: row.expires_at || null,
      usedAt: row.used_at || null,
      supabaseCouponId: row.id
    });
  });

  (tables.notifications || []).forEach(row => {
    const member = memberByUserId.get(row.member_id);
    if (!member) return;
    const title = typeof row.title === 'object' ? row.title.zh || row.title.en || '' : row.title;
    const body = typeof row.body === 'object' ? row.body.zh || row.body.en || '' : row.body;
    upsertById(state.notifications, `notification_${row.id}`, {
      memberId: member.id,
      type: row.notification_type || 'system',
      title: title || '会员通知',
      body: body || '',
      readAt: row.read_at || null,
      createdAt: row.created_at || nowIso(),
      supabaseNotificationId: row.id
    });
  });

  return normalizeState(state);
}

function maskText(value) {
  const text = normalize(value);
  if (!text) return '';
  if (text.includes('@')) {
    const [name, domain] = text.split('@');
    return `${name.slice(0, 2)}***@${domain || ''}`;
  }
  return text.length > 4 ? `${text.slice(0, 2)}***${text.slice(-2)}` : text;
}

function memberStateView(state, user) {
  const email = normalizeEmail(user?.email);
  const phone = normalizePhone(user?.phone);
  const member = state.members.find(item => item.supabaseUserId === user?.id)
    || state.members.find(item => email && normalizeEmail(item.email) === email)
    || state.members.find(item => phone && normalizePhone(item.phone) === phone);

  if (!member) return normalizeState({ ...emptyGrowthState(), config: state.config });

  const activeRelations = state.referralRelations.filter(item => !['inactive', 'cancelled'].includes(item.status));
  const childrenOf = parentIds => new Set(activeRelations
    .filter(item => parentIds.has(item.promoterMemberId || item.parentMemberId))
    .map(item => item.memberId)
    .filter(Boolean));
  const levelOne = childrenOf(new Set([member.id]));
  const levelTwo = childrenOf(levelOne);
  const levelThree = childrenOf(levelTwo);
  const memberIds = new Set([member.id, ...levelOne, ...levelTwo, ...levelThree]);
  const promoters = state.promoters.filter(item => memberIds.has(item.memberId));
  const promoterIds = new Set(promoters.map(item => item.id));
  const currentPromoter = state.promoters.find(item => item.memberId === member.id);
  if (currentPromoter) promoterIds.add(currentPromoter.id);

  const sanitizedMembers = state.members
    .filter(item => memberIds.has(item.id))
    .map(item => item.id === member.id ? item : {
      id: item.id,
      name: item.name || '90 Member',
      email: maskText(item.email),
      phone: maskText(item.phone),
      levelId: item.levelId || 'member',
      status: item.status || 'active',
      referralCode: item.referralCode || '',
      referredByCode: item.referredByCode || '',
      registeredAt: item.registeredAt || item.createdAt || null,
      orderCount: Number(item.orderCount || 0),
      totalSpend: 0,
      pointsBalance: 0
    });

  return normalizeState({
    ...emptyGrowthState(),
    config: state.config,
    members: sanitizedMembers,
    promoters,
    referralCodes: state.referralCodes.filter(item => promoterIds.has(item.promoterId) || item.memberId === member.id),
    referralRelations: activeRelations.filter(item => memberIds.has(item.memberId) || memberIds.has(item.promoterMemberId)),
    promoterApplications: state.promoterApplications.filter(item => item.memberId === member.id),
    enquiries: state.enquiries.filter(item => item.memberId === member.id),
    orders: state.orders.filter(item => memberIds.has(item.memberId)),
    pointsLedgers: state.pointsLedgers.filter(item => item.memberId === member.id),
    memberCoupons: state.memberCoupons.filter(item => item.memberId === member.id),
    commissionLedgers: state.commissionLedgers.filter(item => currentPromoter && item.promoterId === currentPromoter.id),
    withdrawalRequests: state.withdrawalRequests.filter(item => currentPromoter && item.promoterId === currentPromoter.id),
    withdrawalPayments: state.withdrawalPayments.filter(payment => state.withdrawalRequests.some(item => currentPromoter && item.promoterId === currentPromoter.id && item.id === payment.withdrawalId)),
    notifications: state.notifications.filter(item => item.memberId === member.id)
  });
}

async function loadMergedState() {
  const [{ state, updatedAt }, profiles, users, growthTables] = await Promise.all([
    readCloudState(),
    loadProfiles(),
    readAuthUsers(),
    loadGrowthTables()
  ]);
  const mergedState = mergeSupabaseGrowthTables(mergeProfilesIntoState(state, profiles, users), growthTables);
  const written = await writeCloudState(mergedState);
  return { state: written.state || mergedState, updatedAt: written.updatedAt || updatedAt };
}

module.exports = async function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return send(response, 204, {});

  try {
    if (!hasSupabaseServerConfig()) {
      return send(response, 503, { ok: false, message: 'Supabase growth sync is not configured.' });
    }

    if (request.method === 'GET') {
      const { state, updatedAt } = await loadMergedState();
      if (isAdminAuthorized(request)) {
        return send(response, 200, { ok: true, source: 'supabase', state, updatedAt: updatedAt || null });
      }
      const user = await readMemberUser(request);
      if (!user?.id) return send(response, 401, { ok: false, message: 'Unauthorized growth sync.' });
      return send(response, 200, {
        ok: true,
        source: 'supabase',
        state: memberStateView(state, user),
        updatedAt: updatedAt || null
      });
    }

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
      const body = await readJsonBody(request);
      if (!isAdminAuthorized(request, body)) {
        return send(response, 401, { ok: false, message: 'Unauthorized growth sync update.' });
      }
      const [profiles, users, growthTables] = await Promise.all([loadProfiles(), readAuthUsers(), loadGrowthTables()]);
      const state = mergeSupabaseGrowthTables(mergeProfilesIntoState(body.state || body.value || {}, profiles, users), growthTables);
      const written = await writeCloudState(state);
      return send(response, 200, {
        ok: true,
        source: 'supabase',
        state: written.state || state,
        updatedAt: written.updatedAt || null
      });
    }

    return send(response, 405, { ok: false, message: 'Method not allowed.' });
  } catch (error) {
    return send(response, 500, {
      ok: false,
      message: readableCloudMessage(error instanceof Error ? error.message : '', 'Growth cloud sync failed.')
    });
  }
};
