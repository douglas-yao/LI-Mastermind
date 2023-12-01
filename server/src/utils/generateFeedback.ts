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
  won: string;
};

function generateFeedback(attempt: string, solution: string): Feedback {
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
    won: comparisons.won ? 'You won!' : 'You lost.',
  };

  return feedback;
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

  for (let i = 0; i < attempt.length; i++) {
    if (attempt[i] === solution[i]) {
      comparisons.directMatches++;
    } else if (solution.includes(attempt[i])) {
      comparisons.indirectMatches++;
    } else {
      comparisons.incorrect++;
    }
  }

  return comparisons;
}

export default generateFeedback;
