import axios from 'axios';
import difficultySettings from '../config/difficultySettings';

/**
 * Fetches a string representation of a random number sequence based on the specified difficulty level.
 * @param {string} difficultyLevel - The difficulty level of the game.
 * @returns {Promise<string>} A promise resolving to a string representation of a random number sequence.
 * @throws {Error} Throws an error if the difficulty level is invalid or not found in the settings.
 *
 * @example
 * // Returns a string representation of a random number sequence for the 'Easy' difficulty level.
 * const randomNumberSequence = await fetchRandomNumbers('Easy');
 */

export default async function fetchRandomNumbers(
  difficultyLevel: string
): Promise<string> {
  const solutionLength = difficultySettings[difficultyLevel].solutionLength;

  // Construct the URL for fetching random numbers
  const apiUrl = new URL('https://www.random.org/integers/');
  // Length of sequence generated
  apiUrl.searchParams.set('num', solutionLength.toString());
  // Min value inclusive
  apiUrl.searchParams.set('min', '0');
  // Max value inclusive
  apiUrl.searchParams.set('max', '7');
  // Number of columns used to display the value
  apiUrl.searchParams.set('col', '1');
  // Specifiy base system
  apiUrl.searchParams.set('base', '10');
  // Response format
  apiUrl.searchParams.set('format', 'plain');
  // Generate new random numbers
  apiUrl.searchParams.set('rnd', 'new');

  // Fetch random numbers from the specified URL
  const response = await axios.get(apiUrl.toString());

  return response.data;
}
