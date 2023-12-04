"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
class GameModel {
    async createNewGameInstance(solution, guessesRemaining, gameId, difficulty) {
        try {
            const query = `
        INSERT INTO games (solution, guessesRemaining, gameId, difficulty) VALUES (?, ?, ?, ?)
      `;
            const values = [solution, guessesRemaining, gameId, difficulty];
            const [result] = await dbConnect_1.default.execute(query, values);
        }
        catch (error) {
            console.error('Error creating new game instance:', error);
            throw error;
        }
    }
    async updateGameInstance(gameId, attempt, solution, feedback, guessesRemaining, difficulty) {
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
                difficulty.level,
            ];
            const [result] = await dbConnect_1.default.execute(query, values);
        }
        catch (error) {
            console.error('Error updating game instance:', error);
            throw error;
        }
    }
}
const gameModel = new GameModel();
exports.default = gameModel;
