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
const money = value => Math.round((Number(value) || 0) * 100) / 100;
const dateValue = value => new Date(value || Date.now()).toISOString();

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
      commissionRules: Array.isArray(source.config?.commissionRules) && source.config.commissionRules.length ? source.config.commissionRules : base.config.commissionRules
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
  const makeCode = (current, seed = '') => {
    const clean = String(seed).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) || '90';
    let code = `90${clean}`;
    let index = 1;
    while (current.referralCodes.some(item => item.code === code)) code = `90${clean}${index++}`;
    return code;
  };
  const audit = (current, action, actorId, entityType, entityId, reason = '') => {
    current.auditLogs.unshift({ id: id('audit'), action, actorId: actorId || 'mock-admin', entityType, entityId, reason, createdAt: dateValue(now()) });
  };
  const notify = (current, memberId, type, title, body) => {
    current.notifications.unshift({ id: id('notice'), memberId, type, title, body, read: false, createdAt: dateValue(now()) });
  };

  function getState() {
    return clone(state);
  }

  function captureReferralVisit(code, landingPage = '/', metadata = {}) {
    const normalizedCode = String(code || '').trim().toUpperCase();
    const current = read();
    const referral = current.referralCodes.find(item => item.code === normalizedCode && item.active);
    if (!referral) return { ok: false, reason: 'invalid_code' };
    const click = { id: id('click'), promoterId: referral.promoterId, referralCode: normalizedCode, landingPage, campaignId: metadata.campaignId || null, sessionId: metadata.sessionId || id('session'), ipHash: metadata.ipHash || 'mock-ip', deviceHash: metadata.deviceHash || 'mock-device', userAgent: metadata.userAgent || 'mock-browser', clickedAt: dateValue(now()) };
    state = write({ ...current, referralClicks: [click, ...current.referralClicks] });
    storage?.setItem(`${GROWTH_SESSION_KEY}_pending`, JSON.stringify({ code: normalizedCode, clickId: click.id, expiresAt: new Date(now().getTime() + current.config.referralWindowDays * 86400000).toISOString() }));
    return { ok: true, click };
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
    const member = { id: id('member'), name: String(input.name).trim(), email, phone, password: String(input.password), birthday: input.birthday || '', language: input.language || 'zh', address: input.address || '', companyName: input.companyName || '', eventType: input.eventType || '', estimatedPax: Number(input.estimatedPax) || 0, source: input.source || 'website', registeredAt: dateValue(now()), lastPurchaseAt: null, orderCount: 0, totalSpend: 0, pointsBalance: 0, couponCount: 0, levelId: 'member', status: 'active' };
    const pending = pendingReferral();
    let relation = null;
    if (pending?.code) {
      const promoterCode = current.referralCodes.find(item => item.code === pending.code && item.active);
      const promoter = promoterCode && findPromoter(current, promoterCode.memberId);
      if (promoter?.status === 'approved' && promoter.memberId !== member.id) {
        relation = { id: id('relation'), memberId: member.id, promoterId: promoter.id, promoterMemberId: promoter.memberId, referralCode: pending.code, clickId: pending.clickId, status: 'active', boundAt: dateValue(now()), boundBy: 'first_valid_visit' };
      }
    }
    const next = clone(current);
    next.members.unshift(member);
    if (relation) next.referralRelations.unshift(relation);
    const welcomePoints = addPointsToState(next, member.id, 50, 'registration', null, 'Welcome registration points', 'system');
    member.pointsBalance = welcomePoints.balanceAfter;
    if (relation) notify(next, member.id, 'referral', 'Referral linked', `Your first valid referral code ${relation.referralCode} has been linked.`);
    audit(next, 'member.registered', member.id, 'member', member.id, relation ? `Bound to ${relation.referralCode}` : 'Organic registration');
    state = write(next);
    storage?.setItem(GROWTH_SESSION_KEY, member.id);
    storage?.removeItem(`${GROWTH_SESSION_KEY}_pending`);
    return { ok: true, member: clone(member), relation: clone(relation) };
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
    member.updatedAt = dateValue(now());
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
      let promoter = findPromoter(next, target.memberId);
      if (!promoter) {
        promoter = { id: id('promoter'), memberId: target.memberId, status: 'approved', riskStatus: 'clear', approvedAt: dateValue(now()), commissionRuleId: 'default-direct', clickCount: 0, registrationCount: 0, orderCount: 0, salesAmount: 0, commissionAmount: 0 };
        next.promoters.unshift(promoter);
      } else promoter.status = 'approved';
      const code = makeCode(next, member?.name || target.email);
      next.referralCodes.push({ id: id('code'), promoterId: promoter.id, memberId: promoter.memberId, code, campaignId: null, active: true, createdAt: dateValue(now()) });
      notify(next, target.memberId, 'promoter', '90推荐官已批准', `Your referral code is ${code}.`);
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
    const order = { id: id('order'), enquiryId, memberId, serviceType: input.serviceType || enquiry.serviceType, totalAmount: money(input.totalAmount), sstAmount: money(input.sstAmount), deliveryFee: money(input.deliveryFee), extraLabourFee: money(input.extraLabourFee), thirdPartyFee: money(input.thirdPartyFee), couponDiscount: money(input.couponDiscount), refundedAmount: 0, status: input.status || 'confirmed', createdAt: dateValue(now()), updatedAt: dateValue(now()), completedAt: null };
    const next = clone(current);
    next.orders.unshift(order);
    audit(next, 'order.created', memberId, 'order', order.id, 'MOCK order');
    state = write(next);
    return { ok: true, order: clone(order) };
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
      const promoter = findPromoter(current, relation.promoterMemberId);
      if (!promoter || promoter.status !== 'approved') break;
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
    const next = clone(current);
    const target = next.orders.find(item => item.id === orderId);
    target.status = 'service_completed';
    target.completedAt = dateValue(now());
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
      chain.forEach(({ generation, relation, promoter }) => {
        const rule = referralGenerationRate(next, generation, target);
        if (!Number(rule.value)) return;
        const commissionAmount = rule.type === 'fixed' ? money(rule.value) : money(base * Number(rule.value || 0) / 100);
        const ledger = { id: id('commission'), promoterId: promoter.id, memberId: target.memberId, orderId: target.id, campaignId: null, ruleId: rule.id || `generation-${generation}`, generation, referralRelationId: relation.id, eligibleAmount: base, commissionType: rule.type, commissionRate: Number(rule.value || 0), commissionAmount, status: 'confirming', availableAt: new Date(now().getTime() + next.config.refundObservationDays * 86400000).toISOString(), reversedAmount: 0, reversalReason: '', createdAt: dateValue(now()), updatedAt: dateValue(now()) };
        next.commissionLedgers.unshift(ledger);
        promoter.orderCount += 1;
        promoter.salesAmount = money(promoter.salesAmount + base);
        promoter.commissionAmount = money(promoter.commissionAmount + commissionAmount);
        notify(next, relation.promoterMemberId, 'commission', `L${generation} referral commission created`, `RM${commissionAmount.toFixed(2)} is confirming after the refund observation period.`);
      });
    }
    audit(next, 'order.completed', actorId, 'order', orderId, 'MOCK order completed');
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
    const current = read();
    const promoter = findPromoter(current, memberId);
    if (!promoter || promoter.status !== 'approved') return { ok: false, reason: 'promoter_not_approved' };
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

  function summary(memberId) {
    const current = read();
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
      availableCommission: promoter ? availableCommissionFor(current, promoter.id) : 0,
      withdrawals: promoter ? current.withdrawalRequests.filter(item => item.promoterId === promoter.id).map(clone) : [],
      notifications: current.notifications.filter(item => item.memberId === memberId).map(clone)
    };
  }

  function adminSnapshot() {
    const current = read();
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
      auditLogs: clone(current.auditLogs),
      riskFlags: clone(current.riskFlags)
    };
  }

  function updateConfig(config, actorId = 'mock-admin') {
    const current = read();
    const next = clone(current);
    next.config = withDefaults({ config }).config;
    audit(next, 'growth.config_updated', actorId, 'config', 'growth', 'Mock configuration updated');
    state = write(next);
    return { ok: true, config: clone(next.config) };
  }

  return { getState, captureReferralVisit, pendingReferral, registerMember, loginMember, logoutMember, currentMember, importMember, updateMemberProfile, submitPromoterApplication, reviewPromoterApplication, createEnquiry, createOrder, completeOrder, releaseCommissions, mockAdvanceCommissionObservation, refundOrder, submitWithdrawal, reviewWithdrawal, grantCoupon, summary, adminSnapshot, updateConfig, availableCommissionFor };
}

export { COMMISSION_STATUSES, ORDER_STATUSES, WITHDRAWAL_STATUSES, money, normalizePhone };
