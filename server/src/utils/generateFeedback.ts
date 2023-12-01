import { Feedback, Comparisons } from '../types/types';

/**
 * To Do:
 * Change feedback object to:
 * {
 *  feedbackResponse: string
 *  won: boolean
 * }
 */

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

  // Construct the feedback response object:
  const feedback: Feedback = {
    response: '',
    won: false,
  };

  if (comparisons.incorrect === 4) {
    feedback.response = 'All incorrect';
  } else if (comparisons.directMatches === 4) {
    feedback.response = 'All correct, you are a Mastermind!';
  } else {
    feedback.response = `${comparisons.directMatches} correct number and ${comparisons.indirectMatches} correct location`;
  }

  feedback.won = comparisons.won;

  // Console logs for server debugging:
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
