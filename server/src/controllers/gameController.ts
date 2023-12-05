import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  getRandomSolution,
  generateFeedback,
  gameDbService,
  gameManagementService,
  GameCacheService,
} from '../services/index';
import { GameCache } from '../types/types';
import difficultySetting from '../config/difficultySettings';

// Cache to store current game instance's data
const gameCacheService = new GameCacheService();

const gameController = {
  // Handles the initiation of a new game
  /**
   * Input: User-provided username and difficulty level to start a game
   * Output: All data relevant for the user to play the game
   * NOTE TO DEV: TYPE THE RESPONSE BODY <STARTGAMECONTROLLERRESPONSE>
   */
  startGame: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, difficulty } = req.body as {
      userId: string;
      difficulty: string;
    };

    try {
      // Get a new randomized solution, the current difficulty's settings, and a randomized gameId
      const { solution, currentDifficultySetting, gameId } =
        await gameManagementService.getInitialGameData(difficulty);

      // Instantiate game cache and db with starting data
      gameCacheService.initializeGameCache(
        userId,
        gameId,
        difficulty,
        solution,
        currentDifficultySetting.startingGuesses
      );

      await gameDbService.createNewGameAndUser(
        userId,
        solution,
        gameCacheService.currentGameCache
      );

      console.log('generated solution: ', solution);
      // Send the game cache back to the client
      res.locals.newGameData = <GameCache>gameCacheService.currentGameCache;
      return next();
    } catch (error) {
      console.error('Error starting the game:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  /**
   * Input: The user's current guess
   * Output: Returns updated game data, including whether or not a winning condition has been met
   */
  playGame: async (req: Request, res: Response, next: NextFunction) => {
    const { currentGuess } = req.body;
    console.log('current guess: ', currentGuess);
    try {
      // Generate feedback based on user's provided guess
      const feedback = gameManagementService.getFeedback(
        currentGuess,
        gameCacheService.currentGameCache.currentSolution
      );

      // Update the db and game cache with the user's new guess, the corresponding feedback, guesses taken, and guesses remaining
      gameCacheService.updateGameCacheOnAttempt(currentGuess, feedback);
      await gameDbService.updatePlayGame(
        currentGuess,
        feedback.response,
        gameCacheService.currentGameCache
      );

      // Check if a winning or losing condition has been met, and update game cache and db appropriately
      if (
        gameCacheService.currentGameCache.guessesRemaining === 0 ||
        feedback.won === true
      ) {
        gameDbService.updateGameOver(
          feedback.won,
          gameCacheService.currentGameCache
        );
        gameCacheService.updateGameCacheOnCompletion(feedback);
      }

      // Return data back to the client
      res.locals.evaluatedGameData = {
        currentGameCache: gameCacheService.currentGameCache,
        currentGuess,
        feedback,
      };
      return next();
    } catch (error) {
      console.error('Error submitting current attempt:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default gameController;
