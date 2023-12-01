import pool from '../config/dbConnect';

// Operations for the user_games table:

// Insert a new game row
const createNewUserGame = async (
  userId: number,
  gameId: string,
  difficulty: string
) => {
  const query =
    'INSERT INTO user_games (userId, gameId, difficulty) VALUES (?, ?, ?)';
  const values = [userId, gameId, difficulty];

  const [result] = await pool.execute(query, values);
  return result;
};

const updateGameCompletionStatus = async (
  gameId: string,
  won: boolean,
  difficulty: string
) => {
  if (gameId === null) {
    throw new Error('gameId cannot be null.');
  }

  const query = `
    UPDATE user_games
    SET completed = true, won = ?, difficulty = ?
    WHERE gameId = ?
  `;

  const values = [won, difficulty, gameId];
  const [result] = await pool.execute(query, values);
  return result;
};

export { createNewUserGame, updateGameCompletionStatus };
