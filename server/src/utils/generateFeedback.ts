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
  const comparisons: Comparisons = generateComparisons(attempt, solution) || {
    directMatches: 0,
    indirectMatches: 0,
    incorrect: 0,
    won: false,
  };
  // if (comparisons === null) {
  //   console.error('Error with comparing values');
  //   return null;
  // }

  console.log('comparisons: ', comparisons);

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
    feedback.response = `${comparisons.indirectMatches} correct number and ${comparisons.directMatches} correct location`;
  }
  2;
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

  const attemptArr = attempt.split('');
  const solutionArr = solution.split('');
  const attemptLeftover: string[] = [];
  const solutionLeftover: string[] = [];
  const solutionLeftoverHash: {
    [key: string]: number;
  } = {};

  for (let i = 0; i < attempt.length; i++) {
    if (attemptArr[i] === solutionArr[i]) {
      comparisons.directMatches++;
      comparisons.indirectMatches++;
    } else {
      attemptLeftover.push(attemptArr[i]);
      solutionLeftover.push(solutionArr[i]);
    }
  }

  for (let i = 0; i < solutionLeftover.length; i++) {
    solutionLeftoverHash[solutionLeftover[i]] =
      ++solutionLeftoverHash[solutionLeftover[i]] || 1;
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

export default generateFeedback;
