import { GameCache, Feedback } from '../types/types';
import gameStartData from '../config/gameStart';

class GameCacheService {
  currentGameCache: GameCache = gameStartData;

  initializeGameCache(
    userId: string,
    gameId: string,
    difficultyLevel: string,
    currentSolution: string,
    guessesRemaining: number
  ): GameCache {
    this.currentGameCache = {
      userId: userId,
      gameId: gameId,
      difficultyLevel: difficultyLevel,
      currentSolution: currentSolution,
      guessesRemaining: guessesRemaining,
      guessesTaken: 0,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    };

    return this.currentGameCache;
  }

  updateGameCacheOnAttempt(
    currentGuess: string,
    feedback: Feedback
  ): GameCache | null {
    if (!this.currentGameCache) {
      return null;
    }

    const updatedGameCache: GameCache = {
      ...this.currentGameCache,
      guessHistory: [...this.currentGameCache.guessHistory, currentGuess],
      feedbackHistory: [...this.currentGameCache.feedbackHistory, feedback],
      guessesTaken: this.currentGameCache.guessesTaken + 1,
      guessesRemaining: this.currentGameCache.guessesRemaining - 1,
    };

    this.currentGameCache = updatedGameCache;
    return updatedGameCache;
  }

  updateGameCacheOnCompletion(feedback: Feedback): void {
    if (this.currentGameCache.guessesRemaining === 0 || feedback.won === true) {
      this.currentGameCache.isGameOver = {
        status: true,
        message: `${
          feedback.won
            ? 'You are a Mastermind!'
            : 'With each loss, you grow closer to becoming a Mastermind.'
        }`,
      };
    }
  }

  getCurrentGameCache(): GameCache | null {
    return this.currentGameCache;
  }
}

export default GameCacheService;
