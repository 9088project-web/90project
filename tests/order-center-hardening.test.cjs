const test = require('node:test');
const assert = require('node:assert/strict');
const { _test } = require('../api/growth-sync.js');

test('cloud state preserves permanent deleted-order records', () => {
  const deleted = [{ id: 'deleted-1', deletedAt: '2026-10-01T00:00:00.000Z' }];
  const state = _test.normalizeState({ orders: [], deletedOrders: deleted, auditLogs: [] });
  assert.deepEqual(state.deletedOrders, deleted);
});

test('viewer cannot write and staff cannot change business configuration', () => {
  const current = _test.normalizeState({ config: { currency: 'MYR' }, orders: [], auditLogs: [] });
  const changedConfig = _test.normalizeState({ ...current, config: { ...current.config, currency: 'USD' } });
  assert.equal(_test.staffMayWriteState({ role: 'viewer' }, 'order-write', current, current), false);
  assert.equal(_test.staffMayWriteState({ role: 'staff' }, 'settings-write', current, current), false);
  assert.equal(_test.staffMayWriteState({ role: 'staff' }, 'order-write', current, changedConfig), false);
});

test('staff can save orders while only owner can restore a backup', () => {
  const current = _test.normalizeState({ orders: [], auditLogs: [] });
  const changedOrders = _test.normalizeState({ ...current, orders: [{ id: 'order-1' }], auditLogs: [{ id: 'audit-1' }] });
  assert.equal(_test.staffMayWriteState({ role: 'staff' }, 'order-write', current, changedOrders), true);
  assert.equal(_test.staffMayWriteState({ role: 'manager' }, 'restore', current, changedOrders), false);
  assert.equal(_test.staffMayWriteState({ role: 'manager' }, 'settings-write', current, changedOrders), true);
});
