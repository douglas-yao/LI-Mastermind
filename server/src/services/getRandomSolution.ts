import fetchRandomNumbers from '../utils/fetchRandomNumbers';
import parseRandomRes from '../utils/parseRandomRes';

export default async function getRandomSolution(difficulty: string): string {
  const randomNumberSequence = await fetchRandomNumbers(difficulty);
  const solution = parseRandomRes(randomNumberSequence);
  return solution;
}
