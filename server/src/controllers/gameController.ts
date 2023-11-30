import { NextFunction, Request, Response } from 'express';
import { createGame } from '../models/gameModel';
import generateSolution from '../utils/generateSolution';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';

const startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const randomNumberSequence = await fetchRandomNumbers();
    const solution = generateSolution(randomNumberSequence);
    const [solution1, solution2, solution3, solution4] = solution;

    // Save the sequence and remaining guesses to the database
    const createdGameId = await createGame(
      solution1,
      solution2,
      solution3,
      solution4,
      10
    );
    console.log('created game id: ', createdGameId);

    // res.json({ solution, totalGuesses: 10 });
    res.locals.newGameData = { solution, totalGuesses: 10, createdGameId };
    return next();
  } catch (error) {
    console.error('Error playing the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame };
