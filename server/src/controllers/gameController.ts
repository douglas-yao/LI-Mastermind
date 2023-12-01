import { NextFunction, Request, Response } from 'express';
import { createNewGameInstance } from '../models/games_normalModel';
import { createNewUserGame } from '../models/user_gamesModel';
import parseRandomRes from '../utils/parseRandomRes';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';

// Controllers to handle game logic

// Handles the initiation of a new game
const startGame = async (req: Request, res: Response, next: NextFunction) => {
  console.log('incoming new game request: ', req.body);
  try {
    const { userId, difficulty } = req.body;
    // Fetch a random number sequence from the Random.org API
    const randomNumberSequence = await fetchRandomNumbers();
    // Parse the response string and convert to an array of numbers
    const solution = parseRandomRes(randomNumberSequence);

    // Save the solution and remaining guesses to the database
    const createdGameId = await createNewGameInstance(solution);
    const createdNewUserGame = await createNewUserGame(
      userId,
      createdGameId,
      difficulty
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
  console.log('incoming submissions request: ', req.body);
  try {
    console.log('in try block of submitAttempt controller');
  } catch (error) {
    console.error('Error submitting current attempt:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame, submitAttempt };
