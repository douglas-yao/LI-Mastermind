export default function extractSolution(randomNumberSequence: any) {
  if (typeof randomNumberSequence !== 'string') {
    throw new Error('Input is not a string');
  }

  const stringArray = randomNumberSequence.trim().split('\n');
  const solution = stringArray.map(Number);
  return solution;
}
