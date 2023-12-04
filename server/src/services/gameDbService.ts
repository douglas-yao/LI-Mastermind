import GameModel from '../models/GameModel';
import UserGameModel from '../models/userGameModel';
import { GameCache } from '../types/types';

class GameDbService {
  private gameModel: GameModel;
  private userGameModel: UserGameModel;

  constructor() {
    this.gameModel = new GameModel();
    this.userGameModel = new UserGameModel();
  }

  async createNewGameAndUser(
    userId: string,
    solution: any,
    currentGameCache: GameCache
  ) {
    try {
      // Create a new game instance
      await this.gameModel.createNewGameInstance(
        solution,
        currentGameCache.guessesRemaining,
        currentGameCache.gameId,
        currentGameCache.difficultyLevel
      );

      // Create a new user game
      await this.userGameModel.createNewUserGame(
        userId,
        currentGameCache.gameId,
        currentGameCache.difficultyLevel
      );

      console.log('New game and user game created successfully');
    } catch (error) {
      console.error('Error creating new game and user game:', error);
    }
  }

  async updatePlayGame(
    currentGuess: string,
    feedbackResponse: string,
    currentGameCache: GameCache
  ) {
    try {
      await this.gameModel.updateGameInstance(
        currentGuess,
        feedbackResponse,
        currentGameCache.gameId,
        currentGameCache.currentSolution,
        currentGameCache.guessesRemaining,
        currentGameCache.difficultyLevel
      );
    } catch (error) {
      console.error('Error updating game db:', error);
    }
  }

  async updateGameOver(userWonGame: boolean, currentGameCache: GameCache) {
    try {
      await this.userGameModel.updateGameCompletionStatus(
        currentGameCache.gameId,
        userWonGame,
        currentGameCache.difficultyLevel,
        currentGameCache.guessesRemaining,
        currentGameCache.guessesTaken
      );
    } catch (error) {
      console.error('Error updating usergames db: ', error);
    }
  }
}

const gameDbService = new GameDbService();
export default gameDbService;
