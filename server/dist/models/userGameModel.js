"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
class UserGameModel {
    async createNewUserGame(userId, gameId, difficulty) {
        const query = 'INSERT INTO user_games (userId, gameId, difficulty) VALUES (?, ?, ?)';
        const values = [userId, gameId, difficulty];
        const [result] = await dbConnect_1.default.execute(query, values);
        return result;
    }
    async updateGameCompletionStatus(gameId, won, difficulty, guessesRemaining) {
        if (gameId === null) {
            throw new Error('gameId cannot be null.');
        }
        const query = `
      UPDATE user_games
      SET completed = true, won = ?, difficulty = ?, guessesTaken = ?
      WHERE gameId = ?
    `;
        const guessesTaken = difficulty.startingGuesses - guessesRemaining;
        const values = [won, difficulty.level, guessesTaken, gameId];
        const [result] = await dbConnect_1.default.execute(query, values);
        return result;
    }
}
const userGameModel = new UserGameModel();
exports.default = userGameModel;
