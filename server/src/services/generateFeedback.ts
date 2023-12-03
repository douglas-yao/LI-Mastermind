import { Feedback, Comparisons } from '../types/types';
import compareStrings from '../utils/compareStrings';

function generateFeedback(attempt: string, solution: string): Feedback {
  const comparisons: Comparisons = compareStrings(attempt, solution) || {
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
    feedback.response = 'You are a Mastermind!';
  } else {
    feedback.response = `${comparisons.indirectMatches} correct number and ${comparisons.directMatches} correct location`;
  }
  2;
  feedback.won = comparisons.won;

  // Console logs for server debugging:
  // console.log('attempt and solution: ', attempt, solution);
  // console.log('comparisons object: ', comparisons);
  // console.log('feedback object: ', feedback);

  return feedback;
}

export default generateFeedback;
