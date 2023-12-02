import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  createNewGameInstance,
  updateGameInstance,
} from '../models/games_normalModel';
import {
  createNewUserGame,
  updateGameCompletionStatus,
} from '../models/user_gamesModel';
import { CurrentGameCache } from '../cache/gameCache';
import getRandomSolution from '../services/getRandomSolution';
import generateFeedback from '../utils/generateFeedback';

// CurrentGameCache to store current game instance's data
const currentGameCache = new CurrentGameCache();

// Controllers to handle game logic

// Handles the initiation of a new game
/**
 * Input: Request body containing the userId:string and difficulty:string
 * Output: Response to the route handler containing a randomized solution:string and number of guesses:number
 */

//
const startGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('incoming new game request: ', req.body);
  const { userId, difficulty } = req.body;
  try {
    // Fetch a random number sequence from the Random.org API
    const solution = await getRandomSolution(difficulty);

    // Wrap into a handler that initiates the gameCache
    // Inputs: guessesRemaining, solution, userId, difficulty
    // currentGameCache.gameId = uuidv4();
    // currentGameCache.guessesRemaining = 10;
    // currentGameCache.currentSolution = solution;
    // currentGameCache.userId = userId;
    // currentGameCache.difficulty = difficulty;
    currentGameCache.setProperties({
      gameId: uuidv4(),
      guessesRemaining: 10,
      currentSolution: solution,
      userId: userId,
      difficulty: difficulty,
    });
    console.log('current cache: ', currentGameCache);
    // Wrap below into a db class that handles new game db interactions
    // Save the solution and remaining guesses to the database
    await createNewGameInstance(
      solution,
      currentGameCache.guessesRemaining,
      currentGameCache.gameId
    );

    await createNewUserGame(userId, currentGameCache.gameId, difficulty);

    // Return to the client: the fetched random solution and the number of guesses remaining
    res.locals.newGameData = {
      solution,
      startingNumberGuesses: currentGameCache.guessesRemaining,
    };
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
  try {
    // Validation: Consider wrapping into its own module
    if (currentGameCache.gameId === null) {
      console.error('Server error occurred: no game id saved in cache');
      return;
    }

    // To-do: validation check if submittedGuess is an appropriate submission

    const { submittedGuess } = req.body;

    // Modularize feedback logic into its own handler function

    const { comparisons, feedback } = generateFeedback(
      submittedGuess,
      currentGameCache.currentSolution
    );

    if (--currentGameCache.guessesRemaining === 0 || feedback.won === true) {
      console.log('***** Game result ***** ', feedback.won);
      updateGameCompletionStatus(
        currentGameCache.gameId,
        feedback.won,
        currentGameCache.difficulty
      );
    } else {
      updateGameInstance(
        currentGameCache.gameId,
        submittedGuess,
        currentGameCache.currentSolution,
        feedback.response,
        currentGameCache.guessesRemaining
      );
    }

    console.log('incoming submission: ', req.body);
    console.log('comparisons: ', comparisons);
    console.log('feedback: ', feedback);
    res.locals.evaluatedSubmission = {
      comparisons,
      feedback,
      updatedGuessesRemaining: currentGameCache.guessesRemaining,
    };
    return next();
  } catch (error) {
    console.error('Error submitting current attempt:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGameController, updateGameController };

// cache: [{gameId: 1, solution: '1234'}, {gameId: 2, solution: '5678'}]
