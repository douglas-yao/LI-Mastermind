import GameModel from '../models/GameModel';
import UserGameModel from '../models/userGameModel';
import { GameCache } from '../types/types';

/**
 * GameDbService handles interactions with the database related to the game.
 */
class GameDbService {
  private gameModel: GameModel;
  private userGameModel: UserGameModel;

  /**
   * Constructor for GameDbService.
   * Initializes instances of GameModel and UserGameModel.
   */
  constructor() {
    this.gameModel = new GameModel();
    this.userGameModel = new UserGameModel();
  }

  /**
   * Creates a new game instance and a new user game in the database.
   * @param userId - The ID of the user playing the game.
   * @param solution - The solution to the game.
   * @param currentGameCache - The current state of the game cache.
   */
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

  /**
   * Updates the play state of the game in the database.
   * @param currentGuess - The user's current guess.
   * @param feedbackResponse - The feedback for the current guess.
   * @param currentGameCache - The current state of the game cache.
   */
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

  /**
   * Updates the game state when the game is over in the database.
   * @param userWonGame - A boolean indicating whether the user won the game.
   * @param currentGameCache - The current state of the game cache.
   */
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
