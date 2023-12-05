import { getRandomSolution, generateFeedback } from '../services/index';
import difficultySettings from '../config/difficultySettings';
import { v4 as uuidv4 } from 'uuid';
import { DifficultySetting, InitialGameData } from '../types/types';

class GameManagementService {
  async getInitialGameData(difficulty: string): Promise<InitialGameData> {
    const solution = await getRandomSolution(difficulty);
    const currentDifficultySetting: DifficultySetting =
      difficultySettings[difficulty];
    const gameId = uuidv4();

    return { solution, currentDifficultySetting, gameId };
  }
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
