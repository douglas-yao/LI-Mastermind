import pool from '../config/dbConnect';

class GameOperations {
  async createNewGameInstance(
    solution: string,
    guessesRemaining: number,
    gameId: string
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO games_normal (solution, guessesRemaining, gameId) VALUES (?, ?, ?)
      `;

      const values = [solution, guessesRemaining, gameId];

      // Add logic below to insert into Easy, Normal, or Hard table
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
    guessesRemaining: number
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO games_normal (gameId, attempt, solution, feedback, guessesRemaining)
        VALUES (?, ?, ?, ?, ?)
      `;

      const values = [gameId, attempt, solution, feedback, guessesRemaining];
      const [result] = await pool.execute(query, values);
    } catch (error) {
      console.error('Error updating game instance:', error);
      throw error;
    }
  }
}

const gameOperations = new GameOperations();
export default gameOperations;
