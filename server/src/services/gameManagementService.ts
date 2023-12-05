import fetchRandomNumbers from '../utils/fetchRandomNumbers';
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
    const rawSolution = await this.getRandomSolution(difficulty);
    const solution = this.parseRandomRes(rawSolution);
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
    // Construct the feedback response object:
    const feedback: Feedback = {
      response: '',
      won: false,
    };

    // Get the length of the solution
    const solutionLength = solution.length;

    const comparisons = this.compareStrings(guess, solution);

    if (comparisons.incorrect === solutionLength) {
      feedback.response = 'All incorrect';
    } else if (comparisons.directMatches === solutionLength) {
      feedback.response = 'You are a Mastermind!';
    } else {
      feedback.response = `${comparisons.indirectMatches} correct number and ${comparisons.directMatches} correct location`;
    }

    // Set the 'won' property based on comparisons
    feedback.won = comparisons.won;

    return feedback;
  }

  /**
   * Compares two strings and provides feedback based on the comparison.
   * @param attempt - The user's guess.
   * @param solution - The correct solution.
   * @returns The comparisons object.
   */
  compareStrings(attempt: string, solution: string): Comparisons {
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

  /**
   * Parses a string representation of a random number sequence by removing newline characters
   * and returning a string of concatenated numbers.
   * @param randomNumberSequence - The string representation of the random number sequence.
   * @returns A string with newline characters removed, containing concatenated numbers.
   * @throws Throws an error if the input is not a string.
   */
  parseRandomRes(randomNumberSequence: string): string {
    // Check if the input is a string
    if (typeof randomNumberSequence !== 'string') {
      throw new Error('Input is not a string');
    }

    // Trim the string, split by newline, and join elements without spaces or commas
    const parsed = randomNumberSequence.trim().split('\n').join('');

    return parsed;
  }

  /**
   * Retrieves a random solution for the given difficulty.
   * @param difficulty - The difficulty level of the game.
   * @returns A promise resolving to the random solution.
   */
  async getRandomSolution(difficulty: string): Promise<string> {
    const randomNumberSequence = await fetchRandomNumbers(difficulty);
    const solution = this.parseRandomRes(randomNumberSequence);
    return solution;
  }
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
