import { Feedback, Comparisons } from '../types/types';
import compareStrings from './compareStrings';

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
  const comparisons: Comparisons = compareStrings(attempt, solution) || {
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

export default generateFeedback;
