import { GameCache, Feedback } from '../types/types';
import gameStartData from '../config/gameStart';

/**
 * GameCacheService manages the state of the current game, including user interactions
 * and updates to the game cache.
 */
class GameCacheService {
  /** The current state of the game cache. */
  currentGameCache: GameCache = gameStartData;

  /**
   * Initializes the game cache with the provided data.
   * @param userId - The ID of the user playing the game.
   * @param gameId - The ID of the game instance.
   * @param difficultyLevel - The difficulty level of the game.
   * @param currentSolution - The solution to the game.
   * @param guessesRemaining - The number of guesses remaining.
   * @param roundTimerDuration - The number of seconds a user has to make a guess.
   * @param totalElapsedGameTime - The number of seconds the user took to complete the game.
   * @returns The initialized game cache.
   */
  initializeGameCache(
    userId: string,
    gameId: string,
    difficultyLevel: string,
    currentSolution: string,
    guessesRemaining: number,
    roundTimerDuration?: number,
    totalElapsedGameTime?: number
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

  /**
   * Updates the game cache based on a user's attempt.
   * @param currentGuess - The user's current guess.
   * @param feedback - The feedback for the current guess.
   * @returns The updated game cache, or null if the current game cache is not available.
   */
  updateGameCacheOnAttempt(
    currentGuess: string,
    feedback: Feedback,
    elapsedTime: number
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
      totalElapsedGameTime: elapsedTime,
    };

    this.currentGameCache = updatedGameCache;
    return updatedGameCache;
  }

  /**
   * Updates the game cache when the game is completed.
   * @param feedback - The final feedback for the completed game.
   */
  updateGameCacheOnCompletion(feedback: Feedback): void {
    this.currentGameCache.isGameOver = {
      status: true,
      message: `${
        feedback.won
          ? 'You are a Mastermind!'
          : 'With each loss, you grow closer to becoming a Mastermind.'
      }`,
    };
  }

  /**
   * Retrieves the current game cache.
   * @returns The current game cache, or null if it's not available.
   */
  getCurrentGameCache(): GameCache | null {
    return this.currentGameCache;
  }

  reset(): void {
    this.currentGameCache = gameStartData;
  }
}

export default GameCacheService;
