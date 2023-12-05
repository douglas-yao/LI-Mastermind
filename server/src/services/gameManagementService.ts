import { getRandomSolution, generateFeedback } from '../services/index';
import difficultySettings from '../config/difficultySettings';
import { v4 as uuidv4 } from 'uuid';
import { DifficultySetting, InitialGameData, Feedback } from '../types/types';

class GameManagementService {
  async getInitialGameData(difficulty: string): Promise<InitialGameData> {
    const solution = await getRandomSolution(difficulty);
    const currentDifficultySetting: DifficultySetting =
      difficultySettings[difficulty];
    const gameId = uuidv4();

    return { solution, currentDifficultySetting, gameId };
  }

  getFeedback(guess: string, solution: string): Feedback {
    const feedback = generateFeedback(guess, solution);
    return feedback;
  }
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
