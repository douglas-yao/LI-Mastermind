import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import gameModel from '../models/GameModel';
import userGameModel from '../models/userGameModel';
import CurrentGameCache from '../cache/gameCache';
import {
  getRandomSolution,
  generateFeedback,
  gameLoggingService,
} from '../services/index';
import { UpdateGameControllerResponse } from '../types/types';

// CurrentGameCache to store current game instance's data
const currentGameCache = new CurrentGameCache();

// Handles the initiation of a new game
/**
 * Input: Request body containing the userId:string and difficulty:string
 * Output: Response to the route handler containing a randomized solution:string and number of guesses:number
 */
const startGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, difficulty } = req.body;
  console.log(
    `\n***** Starting new game for ${userId} on ${difficulty} difficulty! *****\n`
  );
  try {
    // Fetch a random number sequence from the Random.org API
    const solution = await getRandomSolution(difficulty);

    // Instantiate game cache with starting data
    currentGameCache.setProperties({
      gameId: uuidv4(),
      guessesRemaining: 10,
      currentSolution: solution,
      guessHistory: [],
      feedbackHistory: [],
      userId: userId,
      difficulty: difficulty,
      isGameOver: {
        status: false,
        message: '',
      },
    });

    // Save the solution and remaining guesses to the database
    await gameModel.createNewGameInstance(
      solution,
      currentGameCache.guessesRemaining,
      currentGameCache.gameId,
      difficulty
    );

    await userGameModel.createNewUserGame(
      userId,
      currentGameCache.gameId,
      difficulty
    );

    res.locals.newGameData = currentGameCache;
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handles the submission of a new attempt
const updateGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess } = req.body;

  try {
    const feedback = generateFeedback(
      currentGuess,
      currentGameCache.currentSolution
    );

    // Wrap into a db transaction handler that takes in guessesRemaining and feedback.won
    // Handle logic to send losing condition message to client
    // Handle game end if guesses 0
    // Consider creating a method or function to re-initialize gameCache
    // E.g., method called, client receives back all the empty pieces of state
    currentGameCache.setProperties({
      guessHistory: [...currentGameCache.guessHistory, currentGuess],
      feedbackHistory: [...currentGameCache.feedbackHistory, feedback],
    });

    if (--currentGameCache.guessesRemaining === 0 || feedback.won === true) {
      userGameModel.updateGameCompletionStatus(
        currentGameCache.gameId,
        feedback.won,
        currentGameCache.difficulty
      );
      currentGameCache.isGameOver = {
        status: true,
        message: `${
          feedback.won
            ? 'You are a Mastermind!'
            : 'With each loss, you grow closer to becoming a Mastermind.'
        }`,
      };
    }

    gameModel.updateGameInstance(
      currentGameCache.gameId,
      currentGuess,
      currentGameCache.currentSolution,
      feedback.response,
      currentGameCache.guessesRemaining,
      currentGameCache.difficulty
    );

    // Server logs to show game progress:
    gameLoggingService.logGameProgress(
      currentGameCache,
      currentGuess,
      feedback
    );

    // If keeping debugging logs below, consider wrapping
    // console.log('incoming submission: ', req.body);
    // console.log('feedback: ', feedback);

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
};

export { startGameController, updateGameController };
