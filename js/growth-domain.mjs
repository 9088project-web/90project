export const GROWTH_STORAGE_KEY = 'np90_growth_mock_v1';
export const GROWTH_SESSION_KEY = 'np90_growth_session_v1';

export const DEFAULT_GROWTH_CONFIG = {
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

const ORDER_STATUSES = ['new', 'confirmed', 'deposit_paid', 'service_completed', 'fully_paid', 'cancelled', 'refunded', 'partially_refunded'];
const COMMISSION_STATUSES = ['pending', 'confirming', 'available', 'frozen', 'paid', 'reversed', 'cancelled'];
const WITHDRAWAL_STATUSES = ['submitted', 'under_review', 'approved', 'processing', 'paid', 'rejected', 'cancelled'];

const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
const normalize = value => String(value || '').trim().toLowerCase();
const normalizePhone = value => String(value || '').replace(/\D/g, '');
const normalizeReferralCode = value => String(value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
const money = value => Math.round((Number(value) || 0) * 100) / 100;
const dateValue = value => new Date(value || Date.now()).toISOString();
const normalizeOrderLineItems = items => Array.isArray(items)
  ? items.map(item => ({
      description: String(item?.description || '').trim(),
      qty: Number(item?.qty) || 1,
      unitPrice: money(item?.unitPrice),
      amount: money(item?.amount ?? (Number(item?.qty || 1) * Number(item?.unitPrice || 0)))
    })).filter(item => item.description || item.unitPrice > 0 || item.amount > 0)
  : [];

export function createGrowthState() {
  return {
    version: 1,
    config: clone(DEFAULT_GROWTH_CONFIG),
    members: [],
    promoterApplications: [],
    promoters: [],
    referralCodes: [],
    referralClicks: [],
    referralRelations: [],
    enquiries: [],
    orders: [],
    pointsLedgers: [],
    couponTemplates: [],
    memberCoupons: [],
    couponUsages: [],
    commissionLedgers: [],
    withdrawalRequests: [],
    withdrawalPayments: [],
    notifications: [],
    auditLogs: [],
    riskFlags: []
  };
}

function withDefaults(raw) {
  const base = createGrowthState();
  const source = raw && typeof raw === 'object' ? raw : {};
  return {
    ...base,
    ...source,
    config: {
      ...base.config,
      ...(source.config || {}),
      defaultCommission: { ...base.config.defaultCommission, ...(source.config?.defaultCommission || {}) },
      levels: Array.isArray(source.config?.levels) && source.config.levels.length ? source.config.levels : base.config.levels,
      commissionRules: Array.isArray(source.config?.commissionRules) && source.config.commissionRules.length ? source.config.commissionRules : base.config.commissionRules,
      referralCommissionRates: Array.isArray(source.config?.referralCommissionRates) && source.config.referralCommissionRates.length ? source.config.referralCommissionRates : base.config.referralCommissionRates
    }
  };
}

function defaultStorage() {
  return typeof localStorage === 'undefined' ? null : localStorage;
}

export function createGrowthApi(storage = defaultStorage(), options = {}) {
  const now = options.now || (() => new Date());
  let counter = 0;
  const id = prefix => {
    if (options.idFactory) return options.idFactory(prefix);
    counter += 1;
    return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`;
  };

  const read = () => {
    if (!storage) return createGrowthState();
    try {
      return withDefaults(JSON.parse(storage.getItem(GROWTH_STORAGE_KEY) || 'null'));
    } catch {
      return createGrowthState();
    }
  };
  const write = state => {
    const next = withDefaults(state);
    storage?.setItem(GROWTH_STORAGE_KEY, JSON.stringify(next));
    return next;
  };
  let state = read();

  const commit = mutator => {
    const next = clone(state);
    mutator(next);
    state = write(next);
    return clone(state);
  };

  const findMember = (current, memberId) => current.members.find(item => item.id === memberId);
  const findPromoter = (current, memberId) => current.promoters.find(item => item.memberId === memberId);
  const getRelationForMember = (current, memberId) => current.referralRelations.find(item => item.memberId === memberId && item.status === 'active');
  const referralCodeExists = (current, code, memberId = '') => {
    const normalized = normalizeReferralCode(code);
    if (!normalized) return false;
    return current.referralCodes.some(item => normalizeReferralCode(item.code) === normalized && (!memberId || item.memberId !== memberId))
      || current.members.some(item => normalizeReferralCode(item.referralCode) === normalized && (!memberId || item.id !== memberId));
  };
  const makeCode = (current, seed = '') => {
    const raw = String(seed || '');
    const clean = normalizeReferralCode(raw);
    let hash = 2166136261;
    `${raw}${now().getTime()}`.split('').forEach(character => {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    });
    const readable = clean.slice(0, 4);
    const hashed = (hash >>> 0).toString(36).toUpperCase().padStart(5, '0').slice(0, 5);
    const base = `${readable}${hashed}`.slice(0, 8) || hashed;
    const stem = `NP90${base}`;
    let code = stem;
    let index = 1;
    while (referralCodeExists(current, code)) {
      const suffix = String(index++);
      code = `${stem.slice(0, Math.max(4, 14 - suffix.length))}${suffix}`;
    }
    return code;
  };
  const audit = (current, action, actorId, entityType, entityId, reason = '') => {
    current.auditLogs.unshift({ id: id('audit'), action, actorId: actorId || 'mock-admin', entityType, entityId, reason, createdAt: dateValue(now()) });
  };
  const notify = (current, memberId, type, title, body) => {
    current.notifications.unshift({ id: id('notice'), memberId, type, title, body, read: false, createdAt: dateValue(now()) });
  };

  function ensureReferralIdentity(current, memberId) {
    const member = findMember(current, memberId);
    if (!member) return null;
    let promoter = findPromoter(current, memberId);
    if (!promoter) {
      promoter = { id: id('promoter'), memberId, status: 'approved', riskStatus: 'clear', approvedAt: dateValue(now()), commissionRuleId: 'member-referral', clickCount: 0, registrationCount: 0, orderCount: 0, salesAmount: 0, commissionAmount: 0 };
      current.promoters.unshift(promoter);
    } else if (promoter.status !== 'approved') {
      promoter.status = 'approved';
      promoter.approvedAt = promoter.approvedAt || dateValue(now());
    }
    let code = current.referralCodes.find(item => item.promoterId === promoter.id && item.active);
    const preferredCode = normalizeReferralCode(member.referralCode);
    if (!code && preferredCode) {
      code = current.referralCodes.find(item => normalizeReferralCode(item.code) === preferredCode && item.active && (!item.memberId || item.memberId === memberId));
      if (code) {
        code.promoterId = promoter.id;
        code.memberId = memberId;
      }
    }
    if (!code) {
      const value = preferredCode && !referralCodeExists(current, preferredCode, memberId)
        ? preferredCode
        : makeCode(current, member.name || member.email || member.phone || member.id);
      code = { id: id('code'), promoterId: promoter.id, memberId, code: value, campaignId: null, active: true, createdAt: dateValue(now()) };
      current.referralCodes.push(code);
    }
    member.referralCode = code.code;
    return { promoter, code };
  }

  function memberNeedsReferralIdentity(current, member) {
    if (!member) return false;
    const promoter = findPromoter(current, member.id);
    if (!promoter || promoter.status !== 'approved') return true;
    const code = current.referralCodes.find(item => item.promoterId === promoter.id && item.active);
    if (!code) return true;
    return normalizeReferralCode(member.referralCode) !== normalizeReferralCode(code.code);
  }

  function bindReferralToMember(current, member, code, boundBy = 'first_valid_visit', clickId = null) {
    const referralCode = normalizeReferralCode(code);
    if (!member || !referralCode) return { relation: null, reason: 'missing_referral_code' };
    const existing = getRelationForMember(current, member.id);
    if (existing) {
      member.referredByCode = normalizeReferralCode(existing.referralCode);
      return { relation: existing, reason: 'already_bound' };
    }

    let promoterCode = current.referralCodes.find(item => normalizeReferralCode(item.code) === referralCode && item.active);
    if (!promoterCode) {
      const owner = current.members.find(item => item.id !== member.id && normalizeReferralCode(item.referralCode) === referralCode);
      promoterCode = owner ? ensureReferralIdentity(current, owner.id)?.code : null;
    }
    if (!promoterCode) {
      member.referredByCode = referralCode;
      return { relation: null, reason: 'pending_cloud_referral_code' };
    }

    const promoter = findPromoter(current, promoterCode.memberId);
    const promoterMember = promoter && findMember(current, promoter.memberId);
    const selfReferral = promoterMember && (
      promoter.memberId === member.id
      || normalize(promoterMember.email) === normalize(member.email)
      || normalizePhone(promoterMember.phone) === normalizePhone(member.phone)
    );

    if (selfReferral) {
      current.riskFlags.unshift({ id: id('risk'), type: 'self_referral_blocked', severity: 'high', memberId: member.id, promoterId: promoter?.id || promoterCode.promoterId, referralCode, reason: 'Same member, email or phone as promoter', createdAt: dateValue(now()) });
      return { relation: null, reason: 'self_referral_blocked' };
    }

    if (!promoter || !promoter.memberId || promoter.memberId === member.id) return { relation: null, reason: 'promoter_not_found' };
    const relation = { id: id('relation'), memberId: member.id, promoterId: promoter.id, promoterMemberId: promoter.memberId, referralCode, clickId: clickId || null, status: 'active', boundAt: dateValue(now()), boundBy };
    current.referralRelations.unshift(relation);
    member.referredByCode = referralCode;
    promoter.registrationCount = Number(promoter.registrationCount || 0) + 1;
    return { relation, reason: 'bound' };
  }

  function getState() {
    return clone(state);
  }

  function replaceState(nextState = {}) {
    state = write(nextState);
    return clone(state);
  }

  function captureReferralVisit(code, landingPage = '/', metadata = {}) {
    const normalizedCode = normalizeReferralCode(code);
    if (!normalizedCode) return { ok: false, reason: 'invalid_code' };
    const current = read();
    const referral = current.referralCodes.find(item => normalizeReferralCode(item.code) === normalizedCode && item.active);
    const click = referral
      ? { id: id('click'), promoterId: referral.promoterId, referralCode: normalizedCode, landingPage, campaignId: metadata.campaignId || null, sessionId: metadata.sessionId || id('session'), ipHash: metadata.ipHash || 'mock-ip', deviceHash: metadata.deviceHash || 'mock-device', userAgent: metadata.userAgent || 'mock-browser', clickedAt: dateValue(now()) }
      : null;
    if (click) state = write({ ...current, referralClicks: [click, ...current.referralClicks] });
    storage?.setItem(`${GROWTH_SESSION_KEY}_pending`, JSON.stringify({ code: normalizedCode, clickId: click?.id || null, expiresAt: new Date(now().getTime() + current.config.referralWindowDays * 86400000).toISOString() }));
    return { ok: true, click, verified: Boolean(referral), pending: !referral };
  }

  function pendingReferral() {
    if (!storage) return null;
    try {
      const value = JSON.parse(storage.getItem(`${GROWTH_SESSION_KEY}_pending`) || 'null');
      if (!value || new Date(value.expiresAt) < now()) return null;
      return value;
    } catch {
      return null;
    }
  }

  function registerMember(input = {}) {
    const current = read();
    const email = normalize(input.email);
    const phone = normalizePhone(input.phone);
    if (!input.name || !email || !phone || String(input.password || '').length < 6) return { ok: false, reason: 'invalid_details' };
    if (current.members.some(item => normalize(item.email) === email || normalizePhone(item.phone) === phone)) return { ok: false, reason: 'duplicate_member' };
    const pending = pendingReferral();
    const requestedReferralCode = normalizeReferralCode(input.referralCode) || normalizeReferralCode(pending?.code);
    const member = { id: id('member'), name: String(input.name).trim(), email, phone, password: String(input.password), birthday: input.birthday || '', language: input.language || 'zh', address: input.address || '', companyName: input.companyName || '', eventType: input.eventType || '', estimatedPax: Number(input.estimatedPax) || 0, source: input.source || 'website', referralCode: '', referredByCode: '', registeredAt: dateValue(now()), lastPurchaseAt: null, orderCount: 0, totalSpend: 0, pointsBalance: 0, couponCount: 0, levelId: 'member', status: 'active' };
    let relation = null;
    const next = clone(current);
    next.members.unshift(member);
    const identity = ensureReferralIdentity(next, member.id);
    if (requestedReferralCode) {
      relation = bindReferralToMember(next, member, requestedReferralCode, pending?.code ? 'first_valid_visit' : 'manual_registration', pending?.clickId || null).relation;
    }
    const welcomePoints = addPointsToState(next, member.id, 50, 'registration', null, 'Welcome registration points', 'system');
    member.pointsBalance = welcomePoints.balanceAfter;
    if (relation) notify(next, member.id, 'referral', 'Referral linked', `Your first valid referral code ${relation.referralCode} has been linked.`);
    audit(next, 'member.registered', member.id, 'member', member.id, relation ? `Bound to ${relation.referralCode}` : requestedReferralCode ? `Referral code saved for cloud binding: ${requestedReferralCode}` : 'Organic registration');
    state = write(next);
    storage?.setItem(GROWTH_SESSION_KEY, member.id);
    storage?.removeItem(`${GROWTH_SESSION_KEY}_pending`);
    return { ok: true, member: clone(member), relation: clone(relation), referralCode: identity?.code?.code || '' };
  }

  function loginMember(emailOrPhone, password) {
    const current = read();
    const key = normalize(emailOrPhone);
    const phone = normalizePhone(emailOrPhone);
    const member = current.members.find(item => (normalize(item.email) === key || normalizePhone(item.phone) === phone) && item.password === password && item.status === 'active');
    if (!member) return { ok: false, reason: 'invalid_login' };
    storage?.setItem(GROWTH_SESSION_KEY, member.id);
    return { ok: true, member: clone(member) };
  }

  function logoutMember() {
    storage?.removeItem(GROWTH_SESSION_KEY);
  }

  function currentMember() {
    const memberId = storage?.getItem(GROWTH_SESSION_KEY);
    return memberId ? clone(findMember(read(), memberId)) : null;
  }

  function importMember(input = {}) {
    const current = read();
    const email = normalize(input.email);
    const phone = normalizePhone(input.phone);
    if (!email) return { ok: false, reason: 'invalid_details' };
    const next = clone(current);
    let member = next.members.find(item => normalize(item.email) === email || (phone && normalizePhone(item.phone) === phone));
    if (!member) {
      member = {
        id: input.id || id('member'),
        name: String(input.name || email.split('@')[0] || '90 Member').trim(),
        email,
        phone,
        password: String(input.password || ''),
        birthday: input.birthday || '',
        language: input.language || 'zh',
        address: input.address || '',
        companyName: input.companyName || '',
        eventType: input.eventType || '',
        estimatedPax: Number(input.estimatedPax) || 0,
        preference: input.preference || '',
        source: input.source || 'supabase',
        registeredAt: input.registeredAt || dateValue(now()),
        lastPurchaseAt: null,
        orderCount: Number(input.orderCount) || 0,
        totalSpend: money(input.totalSpend),
        pointsBalance: Number(input.pointsBalance) || 0,
        couponCount: Number(input.couponCount) || 0,
        levelId: input.levelId || 'member',
        status: input.status || 'active'
      };
      next.members.unshift(member);
    }
    ['name', 'phone', 'birthday', 'language', 'address', 'companyName', 'eventType', 'preference', 'source', 'levelId', 'status', 'supabaseUserId', 'cloudSyncedAt', 'referralCode', 'referredByCode'].forEach(field => {
      if (input[field] !== undefined) member[field] = input[field];
    });
    member.estimatedPax = Number(input.estimatedPax) || Number(member.estimatedPax) || 0;
    if (input.pointsBalance !== undefined) member.pointsBalance = Number(input.pointsBalance) || 0;
    if (input.couponCount !== undefined) member.couponCount = Number(input.couponCount) || 0;
    member.referralCode = normalizeReferralCode(member.referralCode);
    member.referredByCode = normalizeReferralCode(member.referredByCode);
    member.updatedAt = dateValue(now());
    ensureReferralIdentity(next, member.id);
    if (member.referredByCode) bindReferralToMember(next, member, member.referredByCode, 'imported_profile', null);
    audit(next, 'member.imported', member.id, 'member', member.id, input.source || 'cloud');
    state = write(next);
    storage?.setItem(GROWTH_SESSION_KEY, member.id);
    return { ok: true, member: clone(member) };
  }

  function updateMemberProfile(memberId, input = {}) {
    const current = read();
    const member = findMember(current, memberId);
    if (!member) return { ok: false, reason: 'member_not_found' };
    const next = clone(current);
    const target = findMember(next, memberId);
    ['name', 'phone', 'birthday', 'address', 'companyName', 'eventType', 'language'].forEach(field => {
      if (input[field] !== undefined) target[field] = String(input[field] || '').trim();
    });
    target.estimatedPax = Number(input.estimatedPax) || 0;
    target.preference = String(input.preference || '').trim();
    target.updatedAt = dateValue(now());
    audit(next, 'member.profile_updated', memberId, 'member', memberId);
    state = write(next);
    return { ok: true, member: clone(target) };
  }

  function upsertOrderLead(input = {}) {
    const externalInquiryId = String(input.externalInquiryId || input.sourceInquiryId || '').trim();
    const email = normalize(input.email) || (normalizePhone(input.phone) ? `${normalizePhone(input.phone)}@guest.90project.local` : '');
    const phone = normalizePhone(input.phone);
    if (!externalInquiryId || (!email && !phone)) return { ok: false, reason: 'invalid_lead' };

    const current = read();
    const existingOrder = current.orders.find(item => item.externalInquiryId === externalInquiryId);
    if (existingOrder) {
      return {
        ok: true,
        member: clone(findMember(current, existingOrder.memberId)),
        enquiry: clone(current.enquiries.find(item => item.id === existingOrder.enquiryId)),
        order: clone(existingOrder),
        createdMember: false,
        createdOrder: false
      };
    }

    const next = clone(current);
    let member = next.members.find(item => (email && normalize(item.email) === email) || (phone && normalizePhone(item.phone) === phone));
    let createdMember = false;
    if (!member) {
      member = {
        id: id('member'),
        name: String(input.name || 'WhatsApp Customer').trim(),
        email: email || `${externalInquiryId}@guest.90project.local`,
        phone,
        password: '',
        birthday: '',
        language: input.language || 'zh',
        address: input.location || '',
        companyName: '',
        eventType: input.serviceType || '',
        estimatedPax: Number(input.pax) || 0,
        preference: '',
        source: input.source || 'whatsapp-inquiry',
        registeredAt: dateValue(now()),
        lastPurchaseAt: null,
        orderCount: 0,
        totalSpend: 0,
        pointsBalance: 0,
        couponCount: 0,
        levelId: 'member',
        status: 'lead'
      };
      next.members.unshift(member);
      createdMember = true;
    } else {
      if (input.name) member.name = String(input.name).trim();
      if (phone) member.phone = phone;
      if (input.location) member.address = input.location;
      if (input.serviceType) member.eventType = input.serviceType;
      member.estimatedPax = Number(input.pax) || Number(member.estimatedPax) || 0;
      member.updatedAt = dateValue(now());
    }

    const identity = ensureReferralIdentity(next, member.id);
    const referralCode = normalizeReferralCode(input.referralCode);
    let relation = getRelationForMember(next, member.id);
    if (referralCode && !relation) {
      relation = bindReferralToMember(next, member, referralCode, 'whatsapp_order', null).relation;
    }

    const enquiry = {
      id: id('enquiry'),
      memberId: member.id,
      referralCode: relation?.referralCode || referralCode || null,
      externalInquiryId,
      invoiceNo: input.invoiceNo || externalInquiryId,
      serviceType: input.serviceType || '',
      packageName: input.packageName || '',
      eventDate: input.eventDate || '',
      eventTime: input.eventTime || '',
      location: input.location || '',
      pax: Number(input.pax) || 0,
      foodChoice: input.foodChoice || input.itemsSummary || '',
      stylingNeeds: input.stylingNeeds || '',
      beverageNeeds: input.beverageNeeds || '',
      budget: money(input.budget || input.totalAmount),
      notes: input.notes || input.adminNotes || '',
      referenceImages: Array.isArray(input.referenceImages) ? input.referenceImages : [],
      status: 'new',
      source: input.source || 'whatsapp-inquiry',
      createdAt: input.createdAt || dateValue(now()),
      updatedAt: dateValue(now())
    };
    const order = {
      id: id('order'),
      enquiryId: enquiry.id,
      memberId: member.id,
      externalInquiryId,
      invoiceNo: input.invoiceNo || externalInquiryId,
      serviceType: input.serviceType || enquiry.serviceType,
      totalAmount: money(input.totalAmount || input.budget),
      originalAmount: money(input.originalAmount || input.totalAmount || input.budget),
      discountAmount: money(input.discountAmount),
      depositAmount: money(input.depositAmount),
      balanceAmount: money(input.balanceAmount),
      sstAmount: money(input.sstAmount),
      deliveryFee: money(input.deliveryFee),
      extraLabourFee: money(input.extraLabourFee),
      thirdPartyFee: money(input.thirdPartyFee),
      couponDiscount: money(input.couponDiscount),
      refundedAmount: 0,
      eventDate: input.eventDate || enquiry.eventDate,
      eventTime: input.eventTime || enquiry.eventTime,
      location: input.location || enquiry.location,
      pax: Number(input.pax) || Number(enquiry.pax) || 0,
      itemsSummary: input.itemsSummary || input.foodChoice || '',
      lineItems: normalizeOrderLineItems(input.lineItems),
      adminNotes: input.adminNotes || '',
      whatsappMessage: input.whatsappMessage || '',
      sentAt: input.sentAt || null,
      status: input.status || 'confirmed',
      source: input.source || 'whatsapp-inquiry',
      createdAt: input.createdAt || dateValue(now()),
      updatedAt: dateValue(now()),
      completedAt: null
    };

    next.enquiries.unshift(enquiry);
    next.orders.unshift(order);
    audit(next, 'lead.order_imported', 'system', 'order', order.id, `Imported from ${externalInquiryId}`);
    if (createdMember) audit(next, 'member.lead_created', 'system', 'member', member.id, externalInquiryId);
    state = write(next);
    return { ok: true, member: clone(member), enquiry: clone(enquiry), order: clone(order), referralCode: identity?.code?.code || '', createdMember, createdOrder: true };
  }

  function submitPromoterApplication(memberId, input = {}) {
    const current = read();
    const member = findMember(current, memberId);
    if (!member) return { ok: false, reason: 'member_not_found' };
    if (findPromoter(current, memberId)?.status === 'approved') return { ok: false, reason: 'already_approved' };
    const existing = current.promoterApplications.find(item => item.memberId === memberId && ['submitted', 'under_review'].includes(item.status));
    if (existing) return { ok: false, reason: 'application_exists' };
    const application = { id: id('application'), memberId, name: input.name || member.name, phone: input.phone || member.phone, email: input.email || member.email, socialPlatform: input.socialPlatform || '', socialAccount: input.socialAccount || '', region: input.region || '', promotionMethod: input.promotionMethod || '', customerType: input.customerType || '', termsAccepted: Boolean(input.termsAccepted), privacyAccepted: Boolean(input.privacyAccepted), status: 'submitted', rejectionReason: '', createdAt: dateValue(now()), updatedAt: dateValue(now()) };
    if (!application.termsAccepted || !application.privacyAccepted) return { ok: false, reason: 'terms_required' };
    const next = clone(current);
    next.promoterApplications.unshift(application);
    audit(next, 'promoter.application_submitted', memberId, 'promoter_application', application.id);
    state = write(next);
    return { ok: true, application: clone(application) };
  }

  function reviewPromoterApplication(applicationId, decision, actorId = 'mock-admin', reason = '') {
    const current = read();
    const application = current.promoterApplications.find(item => item.id === applicationId);
    if (!application) return { ok: false, reason: 'application_not_found' };
    const next = clone(current);
    const target = next.promoterApplications.find(item => item.id === applicationId);
    target.status = decision === 'approve' ? 'approved' : decision === 'suspend' ? 'suspended' : 'rejected';
    target.rejectionReason = reason;
    target.updatedAt = dateValue(now());
    const member = findMember(next, target.memberId);
    if (decision === 'approve') {
      const identity = ensureReferralIdentity(next, target.memberId);
      const code = identity?.code?.code || member?.referralCode || '';
      notify(next, target.memberId, 'promoter', '会员推荐码已生成', `Your referral code is ${code}.`);
    } else {
      const promoter = findPromoter(next, target.memberId);
      if (promoter) promoter.status = target.status;
      notify(next, target.memberId, 'promoter', `Promoter application ${target.status}`, reason || 'Please review the application details.');
    }
    audit(next, `promoter.application_${target.status}`, actorId, 'promoter_application', applicationId, reason);
    state = write(next);
    return { ok: true, application: clone(target) };
  }

  function createEnquiry(memberId, input = {}) {
    const current = read();
    if (!findMember(current, memberId)) return { ok: false, reason: 'member_not_found' };
    const enquiry = { id: id('enquiry'), memberId, referralCode: getRelationForMember(current, memberId)?.referralCode || null, serviceType: input.serviceType || '', packageName: input.packageName || '', eventDate: input.eventDate || '', eventTime: input.eventTime || '', location: input.location || '', pax: Number(input.pax) || 0, foodChoice: input.foodChoice || '', stylingNeeds: input.stylingNeeds || '', beverageNeeds: input.beverageNeeds || '', budget: money(input.budget), notes: input.notes || '', referenceImages: Array.isArray(input.referenceImages) ? input.referenceImages : [], status: 'new', createdAt: dateValue(now()), updatedAt: dateValue(now()) };
    const next = clone(current);
    next.enquiries.unshift(enquiry);
    audit(next, 'enquiry.created', memberId, 'enquiry', enquiry.id);
    state = write(next);
    return { ok: true, enquiry: clone(enquiry) };
  }

  function createOrder(memberId, enquiryId, input = {}) {
    const current = read();
    const enquiry = current.enquiries.find(item => item.id === enquiryId && item.memberId === memberId);
    if (!enquiry) return { ok: false, reason: 'enquiry_not_found' };
    const order = { id: id('order'), enquiryId, memberId, externalInquiryId: input.externalInquiryId || enquiry.externalInquiryId || '', invoiceNo: input.invoiceNo || input.externalInquiryId || enquiry.invoiceNo || enquiry.externalInquiryId || '', serviceType: input.serviceType || enquiry.serviceType, totalAmount: money(input.totalAmount), originalAmount: money(input.originalAmount || input.totalAmount), discountAmount: money(input.discountAmount), depositAmount: money(input.depositAmount), balanceAmount: money(input.balanceAmount), sstAmount: money(input.sstAmount), deliveryFee: money(input.deliveryFee), extraLabourFee: money(input.extraLabourFee), thirdPartyFee: money(input.thirdPartyFee), couponDiscount: money(input.couponDiscount), refundedAmount: 0, eventDate: input.eventDate || enquiry.eventDate || '', eventTime: input.eventTime || enquiry.eventTime || '', location: input.location || enquiry.location || '', pax: Number(input.pax) || Number(enquiry.pax) || 0, itemsSummary: input.itemsSummary || enquiry.foodChoice || '', lineItems: normalizeOrderLineItems(input.lineItems), adminNotes: input.adminNotes || '', whatsappMessage: input.whatsappMessage || '', sentAt: input.sentAt || null, status: input.status || 'confirmed', source: input.source || 'manual-order', createdAt: dateValue(now()), updatedAt: dateValue(now()), completedAt: null, manualVerifiedAt: null, manualVerifiedBy: '' };
    const next = clone(current);
    next.orders.unshift(order);
    audit(next, 'order.created', memberId, 'order', order.id, 'MOCK order');
    state = write(next);
    return { ok: true, order: clone(order) };
  }

  function updateOrder(orderId, input = {}, actorId = 'mock-admin') {
    const current = read();
    const order = current.orders.find(item => item.id === orderId);
    if (!order) return { ok: false, reason: 'order_not_found' };
    if (['service_completed', 'refunded', 'partially_refunded'].includes(order.status)) {
      return { ok: false, reason: 'order_locked' };
    }

    const next = clone(current);
    const target = next.orders.find(item => item.id === orderId);
    ['serviceType', 'source', 'invoiceNo', 'eventDate', 'eventTime', 'location', 'itemsSummary', 'whatsappMessage', 'sentAt', 'paymentStatus', 'manualVerifiedBy'].forEach(field => {
      if (input[field] !== undefined) target[field] = String(input[field] || '').trim();
    });
    ['totalAmount', 'sstAmount', 'deliveryFee', 'extraLabourFee', 'thirdPartyFee', 'couponDiscount', 'originalAmount', 'discountAmount', 'depositAmount', 'balanceAmount', 'pax'].forEach(field => {
      if (input[field] !== undefined) target[field] = money(input[field]);
    });
    if (input.status !== undefined && ORDER_STATUSES.includes(input.status)) target.status = input.status;
    if (input.adminNotes !== undefined) target.adminNotes = String(input.adminNotes || '').trim();
    if (input.lineItems !== undefined) target.lineItems = normalizeOrderLineItems(input.lineItems);
    if (input.completedAt !== undefined) target.completedAt = input.completedAt || null;
    if (input.manualVerifiedAt !== undefined) target.manualVerifiedAt = input.manualVerifiedAt || null;
    target.updatedAt = dateValue(now());

    const enquiry = next.enquiries.find(item => item.id === target.enquiryId);
    if (enquiry) {
      if (input.serviceType !== undefined) enquiry.serviceType = target.serviceType;
      if (input.totalAmount !== undefined) enquiry.budget = target.totalAmount;
      if (input.adminNotes !== undefined) enquiry.adminNotes = target.adminNotes;
      if (input.invoiceNo !== undefined) enquiry.invoiceNo = target.invoiceNo;
      if (input.eventDate !== undefined) enquiry.eventDate = target.eventDate;
      if (input.eventTime !== undefined) enquiry.eventTime = target.eventTime;
      if (input.location !== undefined) enquiry.location = target.location;
      if (input.pax !== undefined) enquiry.pax = Number(target.pax) || 0;
      if (input.itemsSummary !== undefined) enquiry.foodChoice = target.itemsSummary;
      enquiry.updatedAt = target.updatedAt;
    }

    audit(next, 'order.updated', actorId, 'order', orderId, `Status ${target.status}, total RM${target.totalAmount.toFixed(2)}`);
    state = write(next);
    return { ok: true, order: clone(target) };
  }

  function eligibleAmount(order) {
    return money(Math.max(0, order.totalAmount - order.sstAmount - order.deliveryFee - order.extraLabourFee - order.thirdPartyFee - order.couponDiscount));
  }

  function resolveCommissionRule(current, order) {
    return current.config.commissionRules.find(rule => rule.active && (rule.service === '*' || rule.service === order.serviceType)) || current.config.defaultCommission;
  }

  function referralGenerationRate(current, generation, order) {
    const rule = current.config.commissionRules.find(item => item.active && Number(item.generation) === generation && (item.service === '*' || item.service === order.serviceType));
    if (rule) return { id: rule.id || `generation-${generation}`, type: rule.type || 'percent', value: Number(rule.value || 0) };
    const rates = Array.isArray(current.config.referralCommissionRates) ? current.config.referralCommissionRates : [current.config.defaultCommission?.value || 3];
    return { id: `generation-${generation}`, type: 'percent', value: Number(rates[generation - 1] || 0) };
  }

  function referralCommissionChain(current, memberId) {
    const max = Math.max(1, Number(current.config.maxReferralGenerations || 3));
    const chain = [];
    const visitedMemberIds = new Set([memberId]);
    let cursorMemberId = memberId;
    for (let generation = 1; generation <= max; generation += 1) {
      const relation = getRelationForMember(current, cursorMemberId);
      if (!relation || !relation.promoterMemberId || visitedMemberIds.has(relation.promoterMemberId)) break;
      const { promoter } = ensureReferralIdentity(current, relation.promoterMemberId) || {};
      if (!promoter) break;
      chain.push({ generation, relation, promoter });
      visitedMemberIds.add(relation.promoterMemberId);
      cursorMemberId = relation.promoterMemberId;
    }
    return chain;
  }

  function addPointsToState(current, memberId, points, transactionType, relatedOrderId, reason, createdBy) {
    const member = findMember(current, memberId);
    if (!member) return { balanceBefore: 0, balanceAfter: 0 };
    const balanceBefore = Number(member.pointsBalance) || 0;
    const balanceAfter = Math.max(0, balanceBefore + Math.trunc(points));
    const entry = { id: id('points'), memberId, transactionType, points: Math.trunc(points), balanceBefore, balanceAfter, relatedOrderId: relatedOrderId || null, relatedCampaignId: null, reason, createdBy: createdBy || 'system', createdAt: dateValue(now()) };
    current.pointsLedgers.unshift(entry);
    member.pointsBalance = balanceAfter;
    return entry;
  }

  function completeOrder(orderId, actorId = 'mock-admin') {
    const current = read();
    const order = current.orders.find(item => item.id === orderId);
    if (!order || ['cancelled', 'refunded'].includes(order.status)) return { ok: false, reason: 'order_not_completable' };
    if (order.status === 'service_completed' || (order.status === 'fully_paid' && order.completedAt)) return { ok: false, reason: 'order_already_completed' };
    const next = clone(current);
    const target = next.orders.find(item => item.id === orderId);
    target.status = 'service_completed';
    target.completedAt = dateValue(now());
    target.manualVerifiedAt = target.completedAt;
    target.manualVerifiedBy = actorId;
    target.updatedAt = dateValue(now());
    const member = findMember(next, target.memberId);
    if (member) {
      member.orderCount += 1;
      member.totalSpend = money(member.totalSpend + target.totalAmount);
      member.lastPurchaseAt = target.completedAt;
      const level = [...next.config.levels].reverse().find(item => item.active && member.totalSpend >= item.spendThreshold && member.orderCount >= item.orderThreshold) || next.config.levels[0];
      member.levelId = level.id;
      const pointEntry = addPointsToState(next, member.id, target.totalAmount * next.config.pointsPerMyr * (level.pointsMultiplier || 1), 'order_completed', target.id, 'Points for completed order', 'system');
      notify(next, member.id, 'points', 'Points added', `You earned ${pointEntry.points} points.`);
    }
    const chain = referralCommissionChain(next, target.memberId);
    if (chain.length) {
      const base = eligibleAmount(target);
      const minimumBase = money(next.config.minimumCommissionEligibleAmount || 0);
      if (base < minimumBase) {
        next.riskFlags.unshift({ id: id('risk'), type: 'commission_minimum_not_met', severity: 'low', memberId: target.memberId, orderId: target.id, eligibleAmount: base, minimumAmount: minimumBase, reason: 'Eligible order amount below commission threshold', createdAt: dateValue(now()) });
      }
      let remainingCommissionCap = money(base * Number(next.config.maxCommissionPercentPerOrder || 5) / 100);
      const newLedgers = [];
      chain.forEach(({ generation, relation, promoter }) => {
        if (base < minimumBase || remainingCommissionCap <= 0) return;
        const rule = referralGenerationRate(next, generation, target);
        if (!Number(rule.value)) return;
        const rawCommissionAmount = rule.type === 'fixed' ? money(rule.value) : money(base * Number(rule.value || 0) / 100);
        const commissionAmount = money(Math.min(rawCommissionAmount, remainingCommissionCap));
        if (commissionAmount <= 0) return;
        const ledger = { id: id('commission'), promoterId: promoter.id, memberId: target.memberId, orderId: target.id, campaignId: null, ruleId: rule.id || `generation-${generation}`, generation, referralRelationId: relation.id, eligibleAmount: base, commissionType: rule.type, commissionRate: Number(rule.value || 0), commissionAmount, status: 'confirming', availableAt: new Date(now().getTime() + next.config.refundObservationDays * 86400000).toISOString(), reversedAmount: 0, reversalReason: '', createdAt: dateValue(now()), updatedAt: dateValue(now()) };
        newLedgers.push(ledger);
        remainingCommissionCap = money(remainingCommissionCap - commissionAmount);
        promoter.orderCount += 1;
        promoter.salesAmount = money(promoter.salesAmount + base);
        promoter.commissionAmount = money(promoter.commissionAmount + commissionAmount);
        notify(next, relation.promoterMemberId, 'commission', `L${generation} referral commission created`, `RM${commissionAmount.toFixed(2)} is confirming after the refund observation period.`);
      });
      if (newLedgers.length) next.commissionLedgers.unshift(...newLedgers);
    }
    audit(next, 'order.completed', actorId, 'order', orderId, 'Manual customer consumption confirmed');
    state = write(next);
    return { ok: true, order: clone(target) };
  }

  function releaseCommissions(actorId = 'mock-admin') {
    const current = read();
    const next = clone(current);
    let released = 0;
    next.commissionLedgers.forEach(ledger => {
      if (ledger.status === 'confirming' && new Date(ledger.availableAt) <= now()) {
        ledger.status = 'available';
        ledger.updatedAt = dateValue(now());
        released += 1;
      }
    });
    if (released) audit(next, 'commission.released', actorId, 'commission', 'batch', `${released} commission(s) released in Mock mode`);
    state = write(next);
    return { ok: true, released };
  }

  function autoReleaseMaturedCommissions(actorId = 'system') {
    const current = read();
    if (!current.config.autoReleaseCommissions) return 0;
    const next = clone(current);
    let released = 0;
    next.commissionLedgers.forEach(ledger => {
      if (ledger.status === 'confirming' && new Date(ledger.availableAt) <= now()) {
        ledger.status = 'available';
        ledger.updatedAt = dateValue(now());
        released += 1;
      }
    });
    if (!released) return 0;
    audit(next, 'commission.auto_released', actorId, 'commission', 'batch', `${released} matured commission(s) auto released`);
    state = write(next);
    return released;
  }

  function mockAdvanceCommissionObservation(actorId = 'mock-admin') {
    const current = read();
    const next = clone(current);
    next.commissionLedgers.forEach(ledger => {
      if (ledger.status === 'confirming') ledger.availableAt = new Date(now().getTime() - 86400000).toISOString();
    });
    audit(next, 'commission.observation_advanced', actorId, 'commission', 'batch', 'Mock observation period advanced');
    state = write(next);
    return releaseCommissions(actorId);
  }

  function refundOrder(orderId, refundAmount, actorId = 'mock-admin') {
    const current = read();
    const order = current.orders.find(item => item.id === orderId);
    if (!order) return { ok: false, reason: 'order_not_found' };
    const amount = money(Math.min(order.totalAmount - order.refundedAmount, refundAmount));
    if (amount <= 0) return { ok: false, reason: 'nothing_to_refund' };
    const next = clone(current);
    const target = next.orders.find(item => item.id === orderId);
    target.refundedAmount = money(target.refundedAmount + amount);
    target.status = target.refundedAmount >= target.totalAmount ? 'refunded' : 'partially_refunded';
    target.updatedAt = dateValue(now());
    const member = findMember(next, target.memberId);
    const pointEntries = next.pointsLedgers.filter(entry => entry.relatedOrderId === orderId && entry.transactionType === 'order_completed');
    pointEntries.forEach(entry => addPointsToState(next, target.memberId, -Math.ceil(entry.points * amount / Math.max(target.totalAmount, 1)), 'refund_reversal', orderId, 'Points reversed after refund', actorId));
    next.commissionLedgers.filter(item => item.orderId === orderId && !['reversed', 'cancelled', 'paid'].includes(item.status)).forEach(ledger => {
      const reversal = money(ledger.commissionAmount * amount / Math.max(target.totalAmount, 1));
      ledger.reversedAmount = money(ledger.reversedAmount + reversal);
      ledger.commissionAmount = money(ledger.commissionAmount - reversal);
      ledger.status = ledger.commissionAmount <= 0 ? 'reversed' : 'confirming';
      ledger.reversalReason = `Mock refund RM${amount.toFixed(2)}`;
      ledger.updatedAt = dateValue(now());
    });
    if (member) notify(next, member.id, 'refund', 'Refund recorded', `RM${amount.toFixed(2)} refund processed in Mock mode.`);
    audit(next, 'order.refunded', actorId, 'order', orderId, `Refund RM${amount.toFixed(2)}`);
    state = write(next);
    return { ok: true, amount, order: clone(target) };
  }

  function submitWithdrawal(memberId, input = {}) {
    autoReleaseMaturedCommissions();
    const current = read();
    const promoter = findPromoter(current, memberId);
    if (!promoter) return { ok: false, reason: 'referral_code_not_ready' };
    const amount = money(input.amount);
    if (amount < Number(current.config.minimumWithdrawal)) return { ok: false, reason: 'below_minimum' };
    const open = current.withdrawalRequests.some(item => item.promoterId === promoter.id && ['submitted', 'under_review', 'approved', 'processing'].includes(item.status));
    if (open) return { ok: false, reason: 'withdrawal_pending' };
    const available = availableCommissionFor(current, promoter.id);
    if (amount > available) return { ok: false, reason: 'insufficient_balance' };
    const request = { id: id('withdrawal'), promoterId: promoter.id, memberId, amount, paidAmount: 0, bankName: input.bankName || '', bankAccount: input.bankAccount || '', accountName: input.accountName || '', duitNowType: input.duitNowType || '', duitNowNumber: input.duitNowNumber || '', note: input.note || '', status: 'submitted', createdAt: dateValue(now()), updatedAt: dateValue(now()) };
    const next = clone(current);
    next.withdrawalRequests.unshift(request);
    audit(next, 'withdrawal.submitted', memberId, 'withdrawal', request.id, 'Mock withdrawal request');
    state = write(next);
    return { ok: true, request: clone(request) };
  }

  function availableCommissionFor(current, promoterId) {
    const paidOrReserved = current.withdrawalRequests.filter(item => item.promoterId === promoterId && !['rejected', 'cancelled'].includes(item.status)).reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const earned = current.commissionLedgers.filter(item => item.promoterId === promoterId && ['available', 'frozen', 'paid'].includes(item.status)).reduce((sum, item) => sum + Number(item.commissionAmount || 0), 0);
    return money(Math.max(0, earned - paidOrReserved));
  }

  function reviewWithdrawal(requestId, decision, actorId = 'mock-admin', payment = {}) {
    const current = read();
    const request = current.withdrawalRequests.find(item => item.id === requestId);
    if (!request) return { ok: false, reason: 'withdrawal_not_found' };
    const next = clone(current);
    const target = next.withdrawalRequests.find(item => item.id === requestId);
    if (decision === 'reject') target.status = 'rejected';
    else if (decision === 'approve') target.status = 'approved';
    else if (decision === 'processing') target.status = 'processing';
    else if (decision === 'paid') {
      target.status = 'paid';
      target.paidAt = dateValue(now());
      next.withdrawalPayments.unshift({ id: id('payment'), withdrawalId: target.id, paidAt: target.paidAt, method: payment.method || 'Mock bank transfer', referenceNumber: payment.referenceNumber || `MOCK-${Date.now()}`, processedBy: actorId, proofUrl: payment.proofUrl || '' });
      let remaining = Number(target.amount) || 0;
      next.commissionLedgers.filter(item => item.promoterId === target.promoterId && item.status === 'available').forEach(item => {
        if (remaining <= 0) return;
        item.status = 'paid';
        item.updatedAt = dateValue(now());
        remaining = money(remaining - Number(item.commissionAmount || 0));
      });
      target.paidAmount = money(Number(target.amount) - Math.max(0, remaining));
    } else return { ok: false, reason: 'invalid_decision' };
    target.updatedAt = dateValue(now());
    audit(next, `withdrawal.${target.status}`, actorId, 'withdrawal', requestId, payment.referenceNumber || '');
    state = write(next);
    return { ok: true, request: clone(target) };
  }

  function grantCoupon(memberId, template = {}) {
    const current = read();
    const coupon = { id: id('coupon'), memberId, templateId: template.id || id('coupon_template'), code: template.code || `WELCOME-${Date.now().toString(36).toUpperCase()}`, name: template.name || 'Welcome reward', discountType: template.discountType || 'fixed', discountValue: money(template.discountValue || 20), minimumSpend: money(template.minimumSpend), serviceType: template.serviceType || '*', expiresAt: template.expiresAt || new Date(now().getTime() + 30 * 86400000).toISOString(), status: 'active', createdAt: dateValue(now()) };
    const next = clone(current);
    next.memberCoupons.unshift(coupon);
    const member = findMember(next, memberId);
    if (member) member.couponCount += 1;
    audit(next, 'coupon.granted', 'system', 'member_coupon', coupon.id);
    state = write(next);
    return { ok: true, coupon: clone(coupon) };
  }

  function referralStatsFor(current, memberId) {
    const activeRelations = current.referralRelations.filter(item => !['inactive', 'cancelled'].includes(item.status));
    const childrenOf = parentIds => new Set(activeRelations
      .filter(item => parentIds.has(item.promoterMemberId || item.parentMemberId))
      .map(item => item.memberId)
      .filter(Boolean));
    const levelOne = childrenOf(new Set([memberId]));
    const levelTwo = childrenOf(levelOne);
    const levelThree = childrenOf(levelTwo);
    const referredMembers = new Set([...levelOne, ...levelTwo, ...levelThree]);
    const completedMembers = new Set(current.orders
      .filter(order => referredMembers.has(order.memberId) && ['service_completed', 'fully_paid', 'completed'].includes(String(order.status || '').toLowerCase()))
      .map(order => order.memberId));
    return {
      total: referredMembers.size,
      levelOne: levelOne.size,
      levelTwo: levelTwo.size,
      levelThree: levelThree.size,
      completed: completedMembers.size
    };
  }

  function summary(memberId) {
    autoReleaseMaturedCommissions();
    let current = read();
    const summaryMember = findMember(current, memberId);
    if (memberNeedsReferralIdentity(current, summaryMember)) {
      const next = clone(current);
      ensureReferralIdentity(next, memberId);
      state = write(next);
      current = read();
    }
    const member = findMember(current, memberId);
    const promoter = member && findPromoter(current, memberId);
    const code = promoter && current.referralCodes.find(item => item.promoterId === promoter.id && item.active);
    const commissions = promoter ? current.commissionLedgers.filter(item => item.promoterId === promoter.id) : [];
    return {
      member: clone(member),
      promoter: clone(promoter),
      referralCode: code?.code || '',
      referralRelation: clone(member && getRelationForMember(current, memberId)),
      points: member?.pointsBalance || 0,
      coupons: current.memberCoupons.filter(item => item.memberId === memberId && item.status === 'active').map(clone),
      enquiries: current.enquiries.filter(item => item.memberId === memberId).map(clone),
      orders: current.orders.filter(item => item.memberId === memberId).map(clone),
      commissions: commissions.map(clone),
      referralStats: referralStatsFor(current, memberId),
      availableCommission: promoter ? availableCommissionFor(current, promoter.id) : 0,
      withdrawals: promoter ? current.withdrawalRequests.filter(item => item.promoterId === promoter.id).map(clone) : [],
      notifications: current.notifications.filter(item => item.memberId === memberId).map(clone)
    };
  }

  function adminSnapshot() {
    autoReleaseMaturedCommissions();
    let current = read();
    const missingReferral = current.members.some(member => memberNeedsReferralIdentity(current, member));
    if (missingReferral) {
      const next = clone(current);
      next.members.forEach(member => ensureReferralIdentity(next, member.id));
      state = write(next);
      current = read();
    }
    return {
      config: clone(current.config),
      applications: clone(current.promoterApplications),
      promoters: clone(current.promoters),
      referralCodes: clone(current.referralCodes),
      members: clone(current.members),
      clicks: clone(current.referralClicks),
      relations: clone(current.referralRelations),
      enquiries: clone(current.enquiries),
      orders: clone(current.orders),
      points: clone(current.pointsLedgers),
      commissions: clone(current.commissionLedgers),
      withdrawals: clone(current.withdrawalRequests),
      withdrawalPayments: clone(current.withdrawalPayments),
      auditLogs: clone(current.auditLogs),
      riskFlags: clone(current.riskFlags)
    };
  }

  function updateConfig(config, actorId = 'mock-admin') {
    const current = read();
    const next = clone(current);
    next.config = withDefaults({ config }).config;
    audit(next, 'growth.config_updated', actorId, 'config', 'growth', 'Growth configuration updated');
    state = write(next);
    return { ok: true, config: clone(next.config) };
  }

  return { getState, replaceState, captureReferralVisit, pendingReferral, registerMember, loginMember, logoutMember, currentMember, importMember, updateMemberProfile, upsertOrderLead, submitPromoterApplication, reviewPromoterApplication, createEnquiry, createOrder, updateOrder, completeOrder, releaseCommissions, mockAdvanceCommissionObservation, refundOrder, submitWithdrawal, reviewWithdrawal, grantCoupon, summary, adminSnapshot, updateConfig, availableCommissionFor };
}

export { COMMISSION_STATUSES, ORDER_STATUSES, WITHDRAWAL_STATUSES, money, normalizePhone };
