/*!
 * Just Die
 * Copyright(c) 2015 Jens Hedqist <jens.hedqvist@gmail.com>
 * MIT Licensed
 */

/**
* Returns a die function that returns random number between the provided range
* @param  {number} sides Number of sides of the die - "max" value
* @param  {number} min   The smallest number side on the die - "min" value (optional)
* @return {function}     Function that returns random number between range
*/
function die(sides, min = 1) {
  let d = () => roll_die(sides, min);
  d.minmax = [min, sides];
  return d;
}

/**
* Directly rolls die and returns a number randomly within range
* @param  {number} sides Largest number in die sides - max
* @param  {number} min   Smallest number in die sides - min
* @return {number}       The result of the roll
*/
function roll_die(sides, min = 1) {
  return Math.floor(Math.random() * ((sides + 1) - min)) + min;
}

/**
* Directly rolls die and returns a number randomly within range
* @param  {number} sides Largest number in die sides - max
* @param  {number} min   Smallest number in die sides - min
* @return {number}       The result of the roll
*/
function roll_die_verbose(die) {
  return {
    result: die(),
    minmax: die.minmax,
    sides: die.minmax[1]
  };
}

/**
* Takes a list of dies and returns a new function returning the product of all dices (right-to-left)
* @param  {function} N Any number of dies that will be rolled from left to right
* @return {function}   A dice pool that returns the product of N dies as number
*/
function roll_pool(...dies) {
  return (init_val = 0) => dies.reduceRight((previous_roll, currentDie) => currentDie() + previous_roll, init_val);
}

/**
* Takes a list of dies and returns a new function returning a list with roll info
* @param  {function} N Any number of dies that will be rolled from left to right
* @return {array}      A function that returns a list with roll result info
*/
function roll_pool_verbose(...dies) {
  return () => [...dies].map(die => roll_die_verbose(die));
}

let api = {
  die,
  roll_die,
  roll_die_verbose,
  roll_pool,
  roll_pool_verbose
};

export default api;
