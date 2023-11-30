// gameModel.ts
import { ResultSetHeader } from 'mysql2';
import pool from '../config/dbConnect';

// Operations for the games_normal table:

// Insert a new game row
const createGame = async (
  // userId: number,
  solution: string,
  guesses: number
) => {
  const [result] = await pool.execute(
    'INSERT INTO games_normal (solution, guesses) VALUES (?, ?)',
    [solution, guesses]
  );

  // Retrieve the auto-generated (and auto-incremented id) from the db insertion
  const insertedId = (result as ResultSetHeader).insertId;
  return insertedId;
};

export { createGame };
