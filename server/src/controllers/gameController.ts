import { Request, Response } from 'express';
import createGame from '../models/gameModel';
import generateSolution from '../utils/generateSolution';
import fetchRandomNumbers from '../utils/fetchRandomNumbers';

const startGame = async (req: Request, res: Response) => {
  try {
    // Assume you have a function to generate a random number sequence
    const randomNumberSequence = await fetchRandomNumbers();
    console.log('random sequence: ', randomNumberSequence);
    const solution = generateSolution(randomNumberSequence);
    console.log('solution: ', solution);
    const [solution1, solution2, solution3, solution4] = solution;

    // Save the sequence and remaining guesses to the database
    const createdGame = await createGame(
      solution1,
      solution2,
      solution3,
      solution4,
      10
    );
    console.log('created game: ', createdGame);

    res.json({ solution, totalGuesses: 10 });
  } catch (error) {
    console.error('Error playing the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGame };
