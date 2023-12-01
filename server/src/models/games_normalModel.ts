import { ResultSetHeader } from 'mysql2';
import pool from '../config/dbConnect';

// Operations for the games_normal table:

// Insert a new game row
// Add a difficulty param and logic to handle
const createNewGameInstance = async (solution: string) => {
  const guesses = 0;

  // Add logic below to insert into Easy, Normal, or Hard table
  const [result] = await pool.execute(
    'INSERT INTO games_normal (solution, guesses) VALUES (?, ?)',
    [solution, guesses]
  );

  // Retrieve the auto-generated (and auto-incremented id) from the db insertion
  const insertedId = (result as ResultSetHeader).insertId;
  return insertedId;
};

export { createNewGameInstance };
