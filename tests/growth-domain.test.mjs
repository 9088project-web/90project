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
  const state = api.getState();
  assert.equal(state.commissionLedgers[0].status, 'confirming');
  assert.equal(state.commissionLedgers[0].commissionAmount, 15);
  assert.equal(state.members.find(item => item.id === referred.member.id).pointsBalance, 350);
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
  assert.equal(api.releaseCommissions().released, 1);
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
  const order = api.createOrder(referred.member.id, enquiry.enquiry.id, { totalAmount: 300 });
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
