import 'babel/polyfill';
import test from 'tape';
import * as lib from './../lib/justdie';

/** Constants */
const common_dice = [4, 6, 8, 10, 12, 20, 100];

/**
 * Checks if target is number
 * @type {number} item A thing to test
 * @return {boolean}   True if it is a number, false otherwise
 */
const is_number = item => (typeof item === "number" && !isNaN(item));

/**
 * Tests
 * Note: all tests written in SIMPLE code, complex code has no place in tests.
 */

test('can CREATE any common dice', assert => {
  assert.plan(common_dice.length);

  common_dice.forEach(sides => {
    let die_type = typeof lib.die(sides);
    assert.equal(die_type, 'function', `a ${sides} sided die is a function`);
  });
});

test('can ROLL any SINGLE common dice (with and w/o explicit roll)', assert => {
  assert.plan(common_dice.length * 2);

  common_dice.forEach(sides => {
    let die = lib.die(sides);
    assert.equal(typeof lib.roll(die), 'number', `a roll of common die ${sides} returns number`);
    assert.equal(typeof die(), 'number', 'a bare roll die-fn also returns number');
  });
});

test('can roll a POOL of the same dice', assert => {
  assert.plan(1);

  let result = common_dice.map(sides => {

    /** Create 3 identical dices */
    let die1 = lib.die(sides);
    let die2 = lib.die(sides);
    let die3 = lib.die(sides);

    /** Roll pool */
    return lib.roll(die1, die2, die3);

  });
  assert.equal(result.every(is_number), true, `a roll with three dices of any common sided dice returns a number`);
});


test('can roll a mixed POOL of dice', assert => {
  assert.plan(4);

  /** Roll 4 pools of mixed dices */
  let rolls = [
    lib.roll(lib.die(common_dice[0]), lib.die(common_dice[2]), lib.die(common_dice[3])),
    lib.roll(lib.die(common_dice[6]), lib.die(common_dice[1]), lib.die(common_dice[0])),
    lib.roll(lib.die(common_dice[4]), lib.die(common_dice[4]), lib.die(common_dice[3])),
    lib.roll(lib.die(common_dice[5]), lib.die(common_dice[6]), lib.die(common_dice[1]))
  ];
  rolls.forEach((roll) => {
    assert.equal(is_number(roll), true, `a mixed dice pool roll returns a number (${roll})`);
  });
});

test('can ROLL any SINGLE common dice VERBOSE', assert => {
  assert.plan(common_dice.length * 4);

  common_dice.forEach(sides => {
    let die = lib.die(sides);
    let verbose_roll = lib.roll_verbose(die);
    assert.equal(typeof verbose_roll, 'object', `a roll of common die ${sides} returns info object...`);
    assert.equal(typeof verbose_roll.result, 'number', `... "result" contains result of roll as number (${verbose_roll.result})`);
    assert.equal(
      (Array.isArray(verbose_roll.minmax) && verbose_roll.minmax.length === 2), true,
      `... "minmax" contains min/max value as array (${verbose_roll.minmax.join(', ')})`);
    assert.equal(typeof verbose_roll.sides, 'number', `... "sides" contains number of sides as number (${verbose_roll.sides})`);
  });
});

test('can ROLL a SINGLE die and add an modifier', assert => {
  assert.plan(3);

  let die6plus2 = lib.die(6, 2)();
  let die8plus12 = lib.die(8, 12)();
  let die4minus2 = lib.die(4, -2)();
  assert.equal(is_number(die6plus2) && (die6plus2 >= 0), true, `a roll d6 +2 returns valid  number (${ die6plus2 })`);
  assert.equal(is_number(die8plus12) && (die8plus12 >= 0), true, `a roll d8 +12 returns valid number (${ die8plus12 })`);
  assert.equal(is_number(die4minus2) && (die4minus2 >= 0), true, `a roll d4 -2 returns valid number (${ die4minus2 })`);
});

test('can ROLL a POOL of dices and add an modifier', assert => {
  assert.plan(4);

  /** Roll 4 pools of mixed dices */
  let rolls = [
    lib.roll(lib.die(common_dice[1], 3), lib.die(common_dice[6], -40), lib.die(common_dice[1], 1)),
    lib.roll(lib.die(common_dice[6], 23), lib.die(common_dice[4], 0), lib.die(common_dice[0], -0)),
    lib.roll(lib.die(common_dice[2], -3), lib.die(common_dice[3], 13), lib.die(common_dice[5], 7)),
    lib.roll(lib.die(common_dice[4], 1), lib.die(common_dice[6], -3), lib.die(common_dice[5], -4))
  ];
  rolls.forEach((roll) => {
    assert.equal(is_number(roll), true, `a mixed dice pool roll with modifier returns a number (${roll})`);
  });
});
