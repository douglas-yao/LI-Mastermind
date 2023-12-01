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
import { gameCache as currentGameCache, gameCache } from '../cache/gameCache';
import parseRandomRes from '../utils/parseRandomRes';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';
import generateFeedback from '../utils/generateFeedback';

// Controllers to handle game logic

// Handles the initiation of a new game
// Very clear inputs and outputs
const startGame = async (req: Request, res: Response, next: NextFunction) => {
  console.log('incoming new game request: ', req.body);
  try {
    const { userId, difficulty } = req.body;
    // Fetch a random number sequence from the Random.org API
    const randomNumberSequence = await fetchRandomNumbers(difficulty);
    // Parse the response string and convert to an array of numbers
    // const solution = parseRandomRes(randomNumberSequence);
    // solution = parseRandomRes(randomNumberSequence);
    const solution = parseRandomRes(randomNumberSequence);

    // Save the solution and remaining guesses to the database
    currentGameCache.gameId = uuidv4();
    currentGameCache.guessesRemaining = 10;
    const insertId = await createNewGameInstance(
      solution,
      currentGameCache.guessesRemaining,
      currentGameCache.gameId
    );

    const createdNewUserGame = await createNewUserGame(
      userId,
      currentGameCache.gameId,
      difficulty
    );

    currentGameCache.currentSolution = solution;
    currentGameCache.gameId = currentGameCache.gameId;
    currentGameCache.userId = userId;
    currentGameCache.difficulty = difficulty;

    console.log(
      'current solution set in cache: ',
      currentGameCache.currentSolution
    );

    res.locals.newGameData = {
      solution,
      startingNumberGuesses: currentGameCache.guessesRemaining,
      gameId: currentGameCache.gameId,
    };
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handles the submission of a new attempt
const submitAttempt = async (
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

    if (--gameCache.guessesRemaining === 0 || feedback.won === true) {
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

export { startGame, submitAttempt };

// cache: [{gameId: 1, solution: '1234'}, {gameId: 2, solution: '5678'}]
