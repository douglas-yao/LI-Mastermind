// gameModel.ts
import { ResultSetHeader } from 'mysql2';
import pool from '../config/dbConnect';

// Operations for the games_normal table:

// Insert a new game row
const createGame = async (
  // userId: number,
  solution1: number,
  solution2: number,
  solution3: number,
  solution4: number,
  totalGuesses: number
) => {
  const [result] = await pool.execute(
    'INSERT INTO games_normal (solution1, solution2, solution3, solution4, guesses) VALUES (?, ?, ?, ?, ?)',
    [solution1, solution2, solution3, solution4, totalGuesses]
  );

  // Retrieve the auto-generated (and auto-incremented id) from the db insertion
  const insertedId = (result as ResultSetHeader).insertId;
  return insertedId;
};

export { createGame };
