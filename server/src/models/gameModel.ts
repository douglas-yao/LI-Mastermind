import pool from '../config/dbConnect';

const createGame = async (
  // userId: number,
  solution1: number,
  solution2: number,
  solution3: number,
  solution4: number,
  totalGuesses: number
): Promise<void> => {
  await pool.execute(
    'INSERT INTO games_normal (solution1, solution2, solution3, solution4, guesses) VALUES (5, 6, 7, 8, 10)',
    // [userId, randomNumberSequence, totalGuesses]
    [solution1, solution2, solution3, solution4, totalGuesses]
  );
};

export default createGame;
