/**
 * arrayContainsArray
 * - Compares a subset of the master array for 
 * - NOTE: Only works with simple arrays not arrays of objects they will always return false
 * 
 * @param {array} superset - master array which will be compared against
 * @param {array} subset - list which is compared agains the superset
 */

const arrayContainsArray = (superset, subset) => subset.length === 0 ? false : subset.every((value) =>  (superset.indexOf(value) >= 0))

export default arrayContainsArray