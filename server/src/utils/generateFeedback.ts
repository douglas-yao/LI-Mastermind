type Comparisons = {
  directMatches: number;
  indirectMatches: number;
  incorrect: number;
  won: boolean;
};

type Feedback = {
  directMatches: string;
  indirectMatches: string;
  incorrect: string;
  won: boolean;
};

function generateFeedback(
  attempt: string,
  solution: string
): { comparisons: Comparisons; feedback: Feedback } {
  const comparisons = generateComparisons(attempt, solution) || {
    directMatches: 0,
    indirectMatches: 0,
    incorrect: 0,
    won: false,
  };

  const feedback: Feedback = {
    directMatches: `${comparisons.directMatches} exact matches.`,
    indirectMatches: `${comparisons.indirectMatches} matches out of place.`,
    incorrect: `${comparisons.incorrect} incorrect guesses.`,
    won: comparisons.won,
  };

  console.log('attempt and solution: ', attempt, solution);
  console.log('comparisons object: ', comparisons);
  console.log('feedback object: ', feedback);

  return { comparisons, feedback };
}

function generateComparisons(
  attempt: string,
  solution: string
): Comparisons | void {
  if (attempt.length !== solution.length) {
    console.error('Attempt and solution lengths are different!');
    return;
  }

  const comparisons = {
    directMatches: 0,
    indirectMatches: 0,
    incorrect: 0,
    won: false,
  };

  const solutionHash: { [key: string]: number[] } = {};

  for (let i = 0; i < solution.length; i++) {
    solutionHash.hasOwnProperty(solution[i])
      ? solutionHash[solution[i]].push(i)
      : (solutionHash[solution[i]] = [i]);
  }

  for (let i = 0; i < attempt.length; i++) {
    if (
      solutionHash.hasOwnProperty(attempt[i]) &&
      solutionHash[attempt[i]].includes(i)
    ) {
      // Direct match
      comparisons.directMatches++;
    } else if (solutionHash.hasOwnProperty(attempt[i])) {
      // Indirect match
      comparisons.indirectMatches++;
    } else {
      // Incorrect
      comparisons.incorrect++;
    }
  }

  comparisons.won = comparisons.directMatches === attempt.length;

  return comparisons;
}

export default generateFeedback;
