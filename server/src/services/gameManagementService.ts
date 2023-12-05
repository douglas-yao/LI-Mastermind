import { getRandomSolution } from '../services/index';
import difficultySettings from '../config/difficultySettings';
import { v4 as uuidv4 } from 'uuid';
import {
  DifficultySetting,
  InitialGameData,
  Feedback,
  Comparisons,
} from '../types/types';

/**
 * GameManagementService handles the management of game-related data and logic.
 */
class GameManagementService {
  /**
   * Retrieves initial game data including a random solution, difficulty setting, and a unique game ID.
   * @param difficulty - The difficulty level of the game.
   * @returns A promise resolving to InitialGameData.
   */
  async getInitialGameData(difficulty: string): Promise<InitialGameData> {
    const solution = await getRandomSolution(difficulty);
    const currentDifficultySetting: DifficultySetting =
      difficultySettings[difficulty];
    const gameId = uuidv4();

    return { solution, currentDifficultySetting, gameId };
  }

  /**
   * Generates feedback for a given guess and solution.
   * @param guess - The user's guess.
   * @param solution - The correct solution.
   * @returns The feedback for the guess.
   */
  getFeedback(guess: string, solution: string): Feedback {
    const comparisons = this.compareStrings(guess, solution) || {
      directMatches: 0,
      indirectMatches: 0,
      incorrect: 0,
      won: false,
    };

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

    feedback.won = comparisons.won;

    return feedback;
  }

  /**
   * Compares two strings and returns a Comparisons object.
   * @param attempt - The user's guess.
   * @param solution - The correct solution.
   * @returns The Comparisons object.
   */
  compareStrings(attempt: string, solution: string): Comparisons | void {
    if (
      attempt.length !== solution.length ||
      typeof attempt !== 'string' ||
      typeof solution !== 'string'
    ) {
      console.error('Attempt and solution lengths are different!');
      return;
    }

    const comparisons: Comparisons = {
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
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
