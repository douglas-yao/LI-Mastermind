import { NextFunction, Request, Response } from 'express';
import { createGame } from '../models/games_normalModel';
import parseRandomRes from '../utils/parseRandomRes';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';

// Controllers to handle game logic

// Handles the initiation of a new game
const startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch a random number sequence from the Random.org API
    const randomNumberSequence = await fetchRandomNumbers();
    // Parse the response string and convert to an array of numbers
    const solution = parseRandomRes(randomNumberSequence);

    // Save the solution and remaining guesses to the database
    const createdGameId = await createGame(solution, 0);

    res.locals.newGameData = { solution, guesses: 0, createdGameId };
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame };
