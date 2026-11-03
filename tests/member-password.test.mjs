import test from 'node:test';
import assert from 'node:assert/strict';
import { createGrowthApi } from '../js/growth-domain.mjs';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  };
}

test('member can change password and log in with email or phone', () => {
  const api = createGrowthApi(memoryStorage());
  const registered = api.registerMember({
    name: 'Password Test',
    email: 'member@example.com',
    phone: '011-2345 6789',
    password: 'oldpass'
  });
  assert.equal(registered.ok, true);
  assert.equal(api.changeMemberPassword(registered.member.id, 'newpass').ok, true);
  api.logoutMember();
  assert.equal(api.loginMember('member@example.com', 'oldpass').ok, false);
  assert.equal(api.loginMember('member@example.com', 'newpass').ok, true);
  api.logoutMember();
  assert.equal(api.loginMember('01123456789', 'newpass').ok, true);
});

test('password recovery can update a local member by identity', () => {
  const api = createGrowthApi(memoryStorage());
  api.registerMember({ name: 'Recovery Test', email: 'recover@example.com', phone: '0123456789', password: 'before1' });
  assert.equal(api.changeMemberPasswordByIdentity('012-345 6789', 'after123').ok, true);
  api.logoutMember();
  assert.equal(api.loginMember('recover@example.com', 'after123').ok, true);
  assert.equal(api.changeMemberPasswordByIdentity('nobody@example.com', 'after123').ok, false);
});
