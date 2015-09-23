/*!
 * Just Die
 * Copyright(c) 2015 Jens Hedqvist <jens.hedqvist@gmail.com>
 * MIT Licensed
 */

/**
 * Sums a pool of dices
 * @param  {function} ...dies Die functions
 * @return {number}           The combined roll result of all dices
 */
const sum_pool = (...dies) => dies.reduceRight((prev_roll, die) => die() + prev_roll, 0);

/**
 * Random number generator
 * @param  {number} min Min number in range
 * @param  {number} max Min number in range
 * @return {number}     A random number between range
 */
const rand_range = (min, max) => Math.floor(Math.random() * ((max + 1) - min)) + min;

/**
 * Get hightest number in array
 * @param  {array} ...arr Array of numbers
 * @return {number}       Hightest number in array
 */
const max = arr => Math.max(...arr);

/**
* Returns a die function that returns random number between the provided range
* @param  {number} sides Number of sides of the die - "max" value
* @param  {number} mod   A positive och negative modifier to add to die roll (optional)
* @return {function}     Function that returns random number between range
*/
const die = (sides, mod = 0) => {
  let d = () => max([rand_range(1, sides) + mod, 0]);
  d.minmax = [1, sides];
  return d;
};

/**
* Directly rolls die and returns result as info object
* @param  {number} sides Largest number in die sides - max
* @param  {number} min   Smallest number in die sides - min
* @return {number}       The result of the roll as extended object
*/
const verbose = (die) => ({
    result: die(),
    minmax: die.minmax,
    sides: die.minmax[1]
});

/**
 * Rolls any number of dice
 * @param  {function} ...dice Any number of die functions
 * @return {number}            The calculation result of all or any dice. Returns 0 if no dice provided.
 */
const roll = (...dice) => dice.length === 1 ? dice[0]() : sum_pool(...dice);

/**
 * Rolls any number of dice with verbose result
 * @param  {function} ...dice Any number of die functions
 * @return {object}            The result of the roll as extended object
 */
const roll_verbose = (...dice) => dice.length === 1 ? verbose(dice[0]) : (...dice) => dice.map(die => verbose(die));

/**
 * Export lib API
 */
export default { die, roll, roll_verbose };
