import { NextFunction, Request, Response } from 'express';
import { createNewGameInstance } from '../models/games_normalModel';
import { createNewUserGame } from '../models/user_gamesModel';
import { gameCache as currentGameCache, gameCache } from '../cache/gameCache';
import parseRandomRes from '../utils/parseRandomRes';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';
import generateFeedback from '../utils/generateFeedback';

// Controllers to handle game logic

// Look into annotations and beans?

// Handles the initiation of a new game
const startGame = async (req: Request, res: Response, next: NextFunction) => {
  console.log('incoming new game request: ', req.body);
  try {
    const { userId, difficulty } = req.body;
    // Fetch a random number sequence from the Random.org API
    const randomNumberSequence = await fetchRandomNumbers(difficulty);
    // Parse the response string and convert to an array of numbers
    const solution = parseRandomRes(randomNumberSequence);

    // Save the solution and remaining guesses to the database
    const createdGameId = await createNewGameInstance(solution);
    const createdNewUserGame = await createNewUserGame(
      userId,
      createdGameId,
      difficulty
    );

    currentGameCache.currentSolution = solution;
    currentGameCache.gameId = createdGameId;
    currentGameCache.userId = userId;

    console.log(
      'current solution set in cache: ',
      currentGameCache.currentSolution
    );

    res.locals.newGameData = { solution, guessesTaken: 0, createdGameId };
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
    console.log('incoming submission: ', req.body);
    const { submittedGuess, solution } = req.body;

    // To-do: validation check if submittedGuess is an appropriate submission

    console.log(currentGameCache.currentSolution === submittedGuess);
    const feedback = generateFeedback(submittedGuess, solution);
    console.log('feedback: ', feedback);
  } catch (error) {
    console.error('Error submitting current attempt:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame, submitAttempt };

// cache: [{gameId: 1, solution: '1234'}, {gameId: 2, solution: '5678'}]
