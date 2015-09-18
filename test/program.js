import 'babel/polyfill';
import test from 'tape';
import justdie from './../lib/justdie';

test('can roll a die', assert => {
  assert.plan(1);
  let die6 = justdie.die(6);
  assert.equal(typeof die6(), "number", "calling a six sided die returns number");
});
