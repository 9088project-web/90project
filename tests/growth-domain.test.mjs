import test from 'node:test';
import assert from 'node:assert/strict';
import { createGrowthApi } from '../js/growth-domain.mjs';

class MemoryStorage {
  #values = new Map();
  getItem(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
  setItem(key, value) { this.#values.set(key, String(value)); }
  removeItem(key) { this.#values.delete(key); }
}

function setup() {
  const storage = new MemoryStorage();
  let currentTime = new Date('2026-07-13T00:00:00.000Z');
  let sequence = 0;
  const api = createGrowthApi(storage, {
    now: () => new Date(currentTime),
    idFactory: prefix => `${prefix}_${++sequence}`
  });
  return {
    api,
    moveDays(days) { currentTime = new Date(currentTime.getTime() + days * 86400000); }
  };
}

function createApprovedPromoter(api) {
  const registered = api.registerMember({ name: 'Promoter One', email: 'promoter@example.com', phone: '011-1000 0001', password: 'secret1' });
  assert.equal(registered.ok, true);
  const application = api.submitPromoterApplication(registered.member.id, {
    socialPlatform: 'Instagram', socialAccount: '@promoter', region: 'Kuala Lumpur', promotionMethod: 'Direct sharing', customerType: 'Family', termsAccepted: true, privacyAccepted: true
  });
  assert.equal(application.ok, true);
  const review = api.reviewPromoterApplication(application.application.id, 'approve');
  assert.equal(review.ok, true);
  const code = api.getState().referralCodes[0].code;
  return { member: registered.member, code };
}

function approveExistingMemberAsPromoter(api, memberId) {
  const application = api.submitPromoterApplication(memberId, {
    socialPlatform: 'Instagram', socialAccount: '@member', region: 'Kuala Lumpur', promotionMethod: 'Direct sharing', customerType: 'Family', termsAccepted: true, privacyAccepted: true
  });
  assert.equal(application.ok, true);
  const review = api.reviewPromoterApplication(application.application.id, 'approve');
  assert.equal(review.ok, true);
  const promoter = api.getState().promoters.find(item => item.memberId === memberId);
  const code = api.getState().referralCodes.find(item => item.promoterId === promoter.id).code;
  return { promoter, code };
}

test('approval creates one direct referral code and registration binds the first valid visit', () => {
  const { api } = setup();
  const promoter = createApprovedPromoter(api);
  assert.equal(api.captureReferralVisit(promoter.code, '/referral.html').ok, true);
  const referred = api.registerMember({ name: 'New Customer', email: 'customer@example.com', phone: '011-1000 0002', password: 'secret2' });
  assert.equal(referred.ok, true);
  assert.equal(referred.relation.referralCode, promoter.code);
  assert.equal(api.getState().referralRelations.length, 1);
  assert.equal(api.captureReferralVisit(promoter.code).ok, true);
  const duplicate = api.registerMember({ name: 'New Customer', email: 'customer@example.com', phone: '011-1000 0002', password: 'secret2' });
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.reason, 'duplicate_member');
  assert.equal(api.getState().referralRelations.length, 1);
});

test('completed referred order creates confirming commission and points', () => {
  const { api } = setup();
  const promoter = createApprovedPromoter(api);
  api.captureReferralVisit(promoter.code);
  const referred = api.registerMember({ name: 'Order Customer', email: 'order@example.com', phone: '011-1000 0003', password: 'secret3' });
  const enquiry = api.createEnquiry(referred.member.id, { serviceType: 'Meal Plan', budget: 300 });
  const order = api.createOrder(referred.member.id, enquiry.enquiry.id, { totalAmount: 300, serviceType: 'Meal Plan' });
  const completed = api.completeOrder(order.order.id);
  assert.equal(completed.ok, true);
  assert.equal(api.completeOrder(order.order.id).reason, 'order_already_completed');
  const state = api.getState();
  assert.equal(state.commissionLedgers.filter(item => item.orderId === order.order.id).length, 1);
  assert.equal(state.commissionLedgers[0].status, 'confirming');
  assert.equal(state.commissionLedgers[0].commissionRate, 3);
  assert.equal(state.commissionLedgers[0].commissionAmount, 9);
  assert.equal(state.members.find(item => item.id === referred.member.id).pointsBalance, 350);
});

test('completed order creates three-generation referral commissions only', () => {
  const { api } = setup();
  const first = createApprovedPromoter(api);

  api.captureReferralVisit(first.code);
  const secondMember = api.registerMember({ name: 'Second Promoter', email: 'second@example.com', phone: '011-1000 0011', password: 'secret2' });
  const second = approveExistingMemberAsPromoter(api, secondMember.member.id);

  api.captureReferralVisit(second.code);
  const thirdMember = api.registerMember({ name: 'Third Promoter', email: 'third@example.com', phone: '011-1000 0012', password: 'secret3' });
  const third = approveExistingMemberAsPromoter(api, thirdMember.member.id);

  api.captureReferralVisit(third.code);
  const buyer = api.registerMember({ name: 'Third Generation Buyer', email: 'buyer@example.com', phone: '011-1000 0013', password: 'secret4' });
  const enquiry = api.createEnquiry(buyer.member.id, { serviceType: 'Catering', budget: 1000 });
  const order = api.createOrder(buyer.member.id, enquiry.enquiry.id, { totalAmount: 1000, serviceType: 'Catering' });
  api.completeOrder(order.order.id);

  const commissions = api.getState().commissionLedgers
    .filter(item => item.orderId === order.order.id)
    .sort((a, b) => a.generation - b.generation);

  assert.equal(commissions.length, 3);
  assert.deepEqual(commissions.map(item => item.generation), [1, 2, 3]);
  assert.deepEqual(commissions.map(item => item.commissionRate), [3, 1, 1]);
  assert.deepEqual(commissions.map(item => item.commissionAmount), [30, 10, 10]);
  assert.equal(commissions[0].promoterId, third.promoter.id);
  assert.equal(commissions[1].promoterId, second.promoter.id);
});

test('commission protections enforce minimum eligible amount and per-order cap', () => {
  const { api } = setup();
  const promoter = createApprovedPromoter(api);
  api.captureReferralVisit(promoter.code);
  const smallBuyer = api.registerMember({ name: 'Small Buyer', email: 'small@example.com', phone: '011-1000 0021', password: 'secret2' });
  const smallEnquiry = api.createEnquiry(smallBuyer.member.id, { serviceType: 'Meal Plan' });
  const smallOrder = api.createOrder(smallBuyer.member.id, smallEnquiry.enquiry.id, { totalAmount: 99, serviceType: 'Meal Plan' });
  api.completeOrder(smallOrder.order.id);
  assert.equal(api.getState().commissionLedgers.filter(item => item.orderId === smallOrder.order.id).length, 0);
  assert.equal(api.getState().riskFlags.some(item => item.type === 'commission_minimum_not_met'), true);

  const config = api.getState().config;
  api.updateConfig({
    ...config,
    maxCommissionPercentPerOrder: 5,
    commissionRules: config.commissionRules.map(rule => ({ ...rule, value: 10 })),
    referralCommissionRates: [10, 10, 10]
  });

  api.captureReferralVisit(promoter.code);
  const cappedBuyer = api.registerMember({ name: 'Capped Buyer', email: 'capped@example.com', phone: '011-1000 0022', password: 'secret3' });
  const cappedEnquiry = api.createEnquiry(cappedBuyer.member.id, { serviceType: 'Meal Plan' });
  const cappedOrder = api.createOrder(cappedBuyer.member.id, cappedEnquiry.enquiry.id, { totalAmount: 1000, serviceType: 'Meal Plan' });
  api.completeOrder(cappedOrder.order.id);
  const cappedCommissions = api.getState().commissionLedgers.filter(item => item.orderId === cappedOrder.order.id);
  const cappedTotal = cappedCommissions.reduce((sum, item) => sum + item.commissionAmount, 0);
  assert.equal(cappedTotal, 50);
});

test('commission releases after observation period and a full refund reverses commission and points', () => {
  const { api, moveDays } = setup();
  const promoter = createApprovedPromoter(api);
  api.captureReferralVisit(promoter.code);
  const referred = api.registerMember({ name: 'Refund Customer', email: 'refund@example.com', phone: '011-1000 0004', password: 'secret4' });
  const enquiry = api.createEnquiry(referred.member.id, { serviceType: 'Catering', budget: 300 });
  const order = api.createOrder(referred.member.id, enquiry.enquiry.id, { totalAmount: 300, serviceType: 'Catering' });
  api.completeOrder(order.order.id);
  moveDays(8);
  api.summary(promoter.member.id);
  assert.equal(api.getState().commissionLedgers[0].status, 'available');
  assert.equal(api.refundOrder(order.order.id, 300).ok, true);
  const state = api.getState();
  assert.equal(state.commissionLedgers[0].status, 'reversed');
  assert.equal(state.commissionLedgers[0].commissionAmount, 0);
  assert.equal(state.members.find(item => item.id === referred.member.id).pointsBalance, 50);
});

test('withdrawals enforce approval, minimum amount and prevent duplicate open requests', () => {
  const { api } = setup();
  const promoter = createApprovedPromoter(api);
  api.updateConfig({ ...api.getState().config, minimumWithdrawal: 10 });
  api.captureReferralVisit(promoter.code);
  const referred = api.registerMember({ name: 'Withdrawal Customer', email: 'withdraw@example.com', phone: '011-1000 0005', password: 'secret5' });
  const enquiry = api.createEnquiry(referred.member.id, { serviceType: 'Meal Plan' });
  const order = api.createOrder(referred.member.id, enquiry.enquiry.id, { totalAmount: 500 });
  api.completeOrder(order.order.id);
  api.mockAdvanceCommissionObservation();
  const request = api.submitWithdrawal(promoter.member.id, { amount: 15, bankName: 'Mock Bank', bankAccount: '0000', accountName: 'Promoter One' });
  assert.equal(request.ok, true);
  assert.equal(api.submitWithdrawal(promoter.member.id, { amount: 15 }).reason, 'withdrawal_pending');
  assert.equal(api.reviewWithdrawal(request.request.id, 'approve').request.status, 'approved');
  const paid = api.reviewWithdrawal(request.request.id, 'paid', 'mock-admin', { referenceNumber: 'MOCK-001' });
  assert.equal(paid.request.status, 'paid');
  assert.equal(paid.request.amount, 15);
  assert.equal(paid.request.paidAmount, 15);
  assert.equal(api.getState().withdrawalPayments.length, 1);
});

test('cloud imported member can be used as the current member and updated locally', () => {
  const { api } = setup();
  const imported = api.importMember({
    name: 'Cloud Member',
    email: 'cloud@example.com',
    phone: '01199998888',
    source: 'supabase',
    supabaseUserId: 'cloud-user-1',
    pointsBalance: 120,
    couponCount: 2
  });

  assert.equal(imported.ok, true);
  assert.equal(api.currentMember().email, 'cloud@example.com');
  assert.equal(api.summary(imported.member.id).points, 120);

  const updated = api.updateMemberProfile(imported.member.id, {
    name: 'Cloud Member Updated',
    phone: '01199998888',
    address: 'PJ',
    preference: 'less spicy'
  });

  assert.equal(updated.ok, true);
  assert.equal(api.currentMember().name, 'Cloud Member Updated');
  assert.equal(api.currentMember().address, 'PJ');
});
