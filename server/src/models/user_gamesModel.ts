import pool from '../config/dbConnect';

// Operations for the user_games table:

// Insert a new game row
const createNewUserGame = async (
  userId: number,
  gameId: number,
  difficulty: string
) => {
  const [result] = await pool.execute(
    'INSERT INTO user_games (userId, gameId, difficulty) VALUES (?, ?, ?)',
    [userId, gameId, difficulty]
  );

  return result;
};

export { createNewUserGame };
