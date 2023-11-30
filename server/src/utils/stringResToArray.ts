/**
 * Converts a string representation of a random number sequence to an array of numbers.
 *
 * @param {string} randomNumberSequence - The string representation of the random number sequence.
 * @returns {number[]} - An array of numbers extracted from the input string.
 * @throws {Error} - Throws an error if the input is not a string.
 *
 * @example
 * // Returns [1, 2, 3, 4] for input '1\n2\n3\n4'
 * const result = stringResToArray('1\n2\n3\n4');
 */
export default function stringResToArray(randomNumberSequence: any) {
  if (typeof randomNumberSequence !== 'string') {
    throw new Error('Input is not a string');
  }

  const stringArray = randomNumberSequence.trim().split('\n');
  const solution = stringArray.map(Number);
  return solution;
}
