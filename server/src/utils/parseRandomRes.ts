/**
 * Parses a string representation of a random number sequence by removing newline characters and returning a string of concatenated numbers.
 *
 * @param {string} randomNumberSequence - The string representation of the random number sequence.
 * @returns {string} - A string with newline characters removed, containing concatenated numbers.
 * @throws {Error} - Throws an error if the input is not a string.
 *
 * @example
 * // Returns '1234' for input '1\n2\n3\n4'
 * const result = parseRandomRes('1\n2\n3\n4');
 */
export default function parseRandomRes(randomNumberSequence: string): string {
  // Check if the input is a string
  if (typeof randomNumberSequence !== 'string') {
    throw new Error('Input is not a string');
  }

  // Trim the string, split by newline, and join elements without spaces or commas
  const parsed = randomNumberSequence.trim().split('\n').join('');
  console.log(parsed);

  return parsed;
}
