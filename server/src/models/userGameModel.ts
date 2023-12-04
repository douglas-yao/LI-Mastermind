import pool from '../config/dbConnect';

class UserGameModel {
  async createNewUserGame(
    userId: string,
    gameId: string,
    difficultyLevel: string
  ) {
    try {
      const query =
        'INSERT INTO user_games (userId, gameId, difficulty) VALUES (?, ?, ?)';
      const values = [userId, gameId, difficultyLevel];

      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      console.error('Error in createNewUserGame:', error);
      throw error;
    }
  }

  async updateGameCompletionStatus(
    gameId: string,
    won: boolean,
    difficultyLevel: string,
    guessesRemaining: number,
    guessesTaken: number
  ) {
    try {
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
    } catch (error) {
      console.error('Error in updateGameCompletionStatus:', error);
      throw error;
    }
  }

  async getTopScores(difficulty: string, limit: string = '10') {
    try {
      console.log('in model: ', difficulty, limit);
      const query = `
        SELECT * FROM user_games
        WHERE difficulty = '${difficulty}'
        AND completed = true
        ORDER BY guessesTaken ASC
        LIMIT ${limit};
      `;

      const values = [difficulty, limit];

      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      console.error('Error in getTopScores:', error);
      throw error;
    }
  }
}

const userGameModel = new UserGameModel();
export default userGameModel;

/**
   SELECT userId, difficulty, guessesTaken
        FROM user_games
        WHERE completed = true
        AND difficulty = ?
        ORDER BY guessesTaken ASC
        LIMIT ?
 */
