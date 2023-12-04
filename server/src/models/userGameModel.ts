import pool from '../config/dbConnect';

class UserGameModel {
  async createNewUserGame(
    userId: string,
    gameId: string,
    difficultyLevel: string
  ) {
    const query =
      'INSERT INTO user_games (userId, gameId, difficulty) VALUES (?, ?, ?)';
    const values = [userId, gameId, difficultyLevel];

    const [result] = await pool.execute(query, values);
    return result;
  }

  async updateGameCompletionStatus(
    gameId: string,
    won: boolean,
    difficultyLevel: string,
    guessesRemaining: number,
    guessesTaken: number
  ) {
    if (gameId === null) {
      throw new Error('gameId cannot be null.');
    }

    const query = `
      UPDATE user_games
      SET completed = true, won = ?, difficulty = ?, guessesTaken = ?
      WHERE gameId = ?
    `;

    const values = [won, difficultyLevel, guessesTaken, gameId];
    const [result] = await pool.execute(query, values);
    return result;
  }
}

const userGameModel = new UserGameModel();
export default userGameModel;
