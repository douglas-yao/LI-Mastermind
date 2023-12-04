import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  getRandomSolution,
  generateFeedback,
  gameLoggingService,
  gameDbService,
  GameCacheService,
} from '../services/index';
import { UpdateGameControllerResponse, GameCache } from '../types/types';
import difficultySettings from '../config/difficultySettings';

// CurrentGameCache to store current game instance's data
const gameCacheService = new GameCacheService();

const gameController = {
  // Handles the initiation of a new game
  /**
   * Input: Request body containing the userId:string and difficulty:string
   * Output: Response to the route handler containing a randomized solution:string and number of guesses:number
   */
  startGame: async (req: Request, res: Response, next: NextFunction) => {
    // if (!validationService.validateStartGame(req)) {
    //   // respond with 404
    //   res.status(404).json({error: ${error}})
    // }

    const { userId, difficulty } = req.body as {
      userId: string;
      difficulty: string;
    };

    try {
      // Game manager, game service, cache service, db services to wrap logic
      // Make it very clear what this controller is doing and what its job is

      // Fetch a random number sequence from the Random.org API
      const solution = await getRandomSolution(difficulty);

      // Get the current difficulty settings for the user selected difficulty
      // Set number of available guesses for the user
      const currentDifficultySettings = difficultySettings[difficulty];

      // Wrap into a game manager service:
      const gameId = uuidv4();

      // Instantiate game cache with starting data
      gameCacheService.initializeGameCache(
        userId,
        gameId,
        difficulty,
        solution,
        currentDifficultySettings.startingGuesses
      );

      // Save the solution and remaining guesses to the database
      await gameDbService.createNewGameAndUser(
        userId,
        solution,
        gameCacheService.currentGameCache
      );

      // Log start of game to the console
      // gameLoggingService.logNewGameStart(
      //   userId,
      //   difficulty,
      //   currentGameCache.guessesRemaining
      // );
      console.log('generated solution: ', solution);
      // Send the game cache back to the client
      res.locals.newGameData = <GameCache>gameCacheService.currentGameCache;
      return next();
    } catch (error) {
      console.error('Error starting the game:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Handles the submission of a new attempt
  updateGame: async (req: Request, res: Response, next: NextFunction) => {
    const { currentGuess } = req.body;
    const currentGameCache = gameCacheService.currentGameCache;
    console.log('current guess: ', currentGuess);
    try {
      // Generate feedback based on user's provided guess
      const feedback = generateFeedback(
        currentGuess,
        gameCacheService.currentGameCache.currentSolution
      );

      // Update the game cache with the user's new guess, the corresponding feedback, guesses taken, and guesses remaining
      gameCacheService.updateGameCacheOnAttempt(currentGuess, feedback);

      // Update the db with the same information
      await gameDbService.updatePlayGame(
        currentGuess,
        feedback.response,
        currentGameCache
      );
      // gameModel.updateGameInstance(
      //   currentGameCache.gameId,
      //   currentGuess,
      //   currentGameCache.currentSolution,
      //   feedback.response,
      //   currentGameCache.guessesRemaining,
      //   currentGameCache.difficultyLevel
      // );

      // Check if a winning or losing condition has been met, and update game cache and db appropriately
      if (currentGameCache.guessesRemaining === 0 || feedback.won === true) {
        gameDbService.updateGameOver(feedback.won, currentGameCache);
        // Wrap below!
        currentGameCache.isGameOver = {
          status: true,
          message: `${
            feedback.won
              ? 'You are a Mastermind!'
              : 'With each loss, you grow closer to becoming a Mastermind.'
          }`,
        };
      }

      // Server logs to show game progress:
      // gameLoggingService.logGameProgress(
      //   currentGameCache,
      //   currentGuess,
      //   feedback
      // );

      // Return data back to the client
      res.locals.evaluatedSubmission = <UpdateGameControllerResponse>{
        feedback: currentGameCache.feedbackHistory,
        updatedGuessesRemaining: currentGameCache.guessesRemaining,
        isGameOver: currentGameCache.isGameOver,
        updatedGuessHistory: currentGameCache.guessHistory,
      };
      return next();
    } catch (error) {
      console.error('Error submitting current attempt:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default gameController;
