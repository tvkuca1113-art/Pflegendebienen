import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCallback, hasErrors, isPhone, isEmail, fingerprint } from '../src/lib/callback.ts';

test('care: a complete request passes', () => {
  const e = validateCallback({ name: 'Anna Bauer', phone: '089 54637889', place: 'Laim' });
  assert.equal(hasErrors(e), false);
});

test('care: missing name, phone and place are each reported', () => {
  const e = validateCallback({});
  assert.ok(e.name && e.phone && e.place);
});

test('care: a phone number with too few digits is rejected', () => {
  assert.equal(isPhone('12345'), false);
  assert.equal(isPhone('089 5463'), true);
  assert.equal(isPhone('nicht vorhanden'), false);
  const e = validateCallback({ name: 'Anna', phone: '12', place: 'Laim' });
  assert.match(e.phone ?? '', /vollständig/);
});

test('care: common German formats are accepted', () => {
  for (const p of ['089 54637889', '+49 176 22906287', '089/5463-7889', '(089) 5463 7889']) {
    assert.equal(isPhone(p), true, p);
  }
});

test('care: an unknown preferred time is rejected', () => {
  const e = validateCallback({ name: 'A B', phone: '089 5463788', place: 'Laim', time: 'Nachts' });
  assert.ok(e.time);
});

test('job: e-mail channel validates an address, phone channel a number', () => {
  const mail = validateCallback(
    { name: 'Lea', channel: 'E-Mail', phone: 'lea@example.com', area: 'Pflegefachkraft' }, 'job');
  assert.equal(hasErrors(mail), false);
  const bad = validateCallback(
    { name: 'Lea', channel: 'E-Mail', phone: '089 5463788', area: 'Pflegefachkraft' }, 'job');
  assert.ok(bad.phone);
  assert.equal(isEmail('lea@example.com'), true);
  assert.equal(isEmail('lea@example'), false);
});

test('job: an area outside the offered list is rejected', () => {
  const e = validateCallback(
    { name: 'Lea', channel: 'Telefon', phone: '089 5463788', area: 'Chefarzt' }, 'job');
  assert.ok(e.area);
});

test('fingerprint is stable across spacing and case', () => {
  const a = fingerprint({ name: 'Anna  Bauer', phone: '089 5463788', place: 'Laim' }, 'care');
  const b = fingerprint({ name: 'anna bauer', phone: '089 5463788', place: 'laim' }, 'care');
  assert.equal(a, b);
});
