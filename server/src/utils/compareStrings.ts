import { Comparisons } from '../types/types';

export default function compareStrings(
  attempt: string,
  solution: string
): Comparisons | void {
  if (
    attempt.length !== solution.length ||
    typeof attempt !== 'string' ||
    typeof solution !== 'string'
  ) {
    console.error('Attempt and solution lengths are different!');
    return;
  }

  const comparisons = {
    directMatches: 0,
    indirectMatches: 0,
    incorrect: 0,
    won: false,
  };

  const attemptLeftover: string[] = [];
  const solutionLeftoverHash: {
    [key: string]: number;
  } = {};

  for (let i = 0; i < attempt.length; i++) {
    if (attempt[i] === solution[i]) {
      comparisons.directMatches++;
      comparisons.indirectMatches++;
    } else {
      attemptLeftover.push(attempt[i]);
      solutionLeftoverHash[solution[i]] =
        solutionLeftoverHash[solution[i]] + 1 || 1;
    }
  }

  for (let i = 0; i < attemptLeftover.length; i++) {
    if (solutionLeftoverHash[attemptLeftover[i]] > 0) {
      comparisons.indirectMatches++;
      solutionLeftoverHash[attemptLeftover[i]]--;
    } else {
      comparisons.incorrect++;
    }
  }

  comparisons.won = comparisons.directMatches === attempt.length;

  return comparisons;
}
