import { NextFunction, Request, Response } from 'express';
import { createGame } from '../models/games_normalModel';
import stringResToArray from '../utils/stringResToArray';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';

// Controllers to handle game logic

// Handles the initiation of a new game
const startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch a random number sequence from the Random.org API
    const randomNumberSequence = await fetchRandomNumbers();
    // Parse the response string and convert to an array of numbers
    const solution = stringResToArray(randomNumberSequence);
    // Initialize variables for db insertion
    const [solution1, solution2, solution3, solution4] = solution;

    // Save the solution and remaining guesses to the database
    const createdGameId = await createGame(
      solution1,
      solution2,
      solution3,
      solution4,
      10
    );

    res.locals.newGameData = { solution, totalGuesses: 10, createdGameId };
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame };
