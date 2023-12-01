import { ResultSetHeader } from 'mysql2';
import pool from '../config/dbConnect';

// Operations for the games_normal table:

// Insert a new game row
// Add a difficulty param and logic to handle
const createNewGameInstance = async (
  solution: string,
  guessesRemaining: number
) => {
  // Add logic below to insert into Easy, Normal, or Hard table
  const [result] = await pool.execute(
    'INSERT INTO games_normal (solution, guessesRemaining) VALUES (?, ?)',
    [solution, 10]
  );

  // Retrieve the auto-generated (and auto-incremented id) from the db insertion
  const insertedId = (result as ResultSetHeader).insertId;
  return insertedId;
};

const updateGameInstance = async (
  gameId: number,
  attempt: string,
  solution: string,
  feedback: string,
  guessesRemaining: number
) => {
  try {
    const query = `
      INSERT INTO games_normal (id, attempt, solution, feedback, guessesRemaining)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        attempt = VALUES(attempt),
        solution = VALUES(solution),
        feedback = VALUES(feedback),
        guessesRemaining = VALUES(guessesRemaining);
    `;

    const values = [gameId, attempt, solution, feedback, guessesRemaining];
    const [result] = await pool.execute(query, values);

    return result;
  } catch (error) {
    console.error('Error updating game instance:', error);
    throw error;
  }
};

export { createNewGameInstance, updateGameInstance };
