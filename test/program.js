import 'babel/polyfill';
import test from 'tape';
import justdie from './../lib/justdie';

/** Constants */
const common_dice = [1, 4, 6, 8, 10, 12, 20, 100];

/**
 * Tests
 * Note: all tests written in SIMPLE code, complex code has no place in tests.
 */

test('can create any common dice', assert => {
  assert.plan(common_dice.length);

  common_dice.forEach(sides => {
    let die_type = typeof justdie.die(sides);
    assert.equal(die_type, 'function', 'a ' + sides + ' sided die is a function');
  });
});

test('can roll any SINGLE common dice', assert => {
  assert.plan(common_dice.length);

  common_dice.forEach(sides => {
    let die = justdie.die(sides);
    assert.equal(typeof die(), 'number', 'a roll of common die ' + sides + ' returns number');
  });
});

test('can roll a POOL of the same dice', assert => {
  assert.plan(common_dice.length);

  common_dice.forEach(sides => {

    /** Create 3 identical dices */
    let die1 = justdie.die(sides);
    let die2 = justdie.die(sides);
    let die3 = justdie.die(sides);

    /** Create pool */
    let dice_pool = justdie.roll_pool(die1, die2, die3);

    /** Check that a roll of them returns true */
    assert.equal(typeof dice_pool(), 'number', 'a roll with three ' + sides + ' sided dices returns a number');
  });
});
