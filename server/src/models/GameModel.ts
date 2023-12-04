import pool from '../config/dbConnect';

class GameModel {
  async createNewGameInstance(
    solution: string,
    guessesRemaining: number,
    gameId: string,
    difficulty: string
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO games (solution, guessesRemaining, gameId, difficulty) VALUES (?, ?, ?, ?)
      `;

      const values = [solution, guessesRemaining, gameId, difficulty];

      const [result] = await pool.execute(query, values);
    } catch (error) {
      console.error('Error creating new game instance:', error);
      throw error;
    }
  }

  async updateGameInstance(
    gameId: string,
    attempt: string,
    solution: string,
    feedback: string,
    guessesRemaining: number,
    difficultyLevel: string
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO games (gameId, attempt, solution, feedback, guessesRemaining, difficulty)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        gameId,
        attempt,
        solution,
        feedback,
        guessesRemaining,
        difficultyLevel,
      ];
      const [result] = await pool.execute(query, values);
    } catch (error) {
      console.error('Error updating game instance:', error);
      throw error;
    }
  }
}

export default GameModel;
