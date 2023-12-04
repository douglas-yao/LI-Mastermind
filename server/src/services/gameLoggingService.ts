import { GameCache, FeedbackResponse } from '../types/types';

class GameLoggingService {
  logGameProgress(
    gameCache: GameCache,
    currentGuess: string,
    currentFeedback: FeedbackResponse
  ): void {
    console.log(`*** Round ${gameCache.guessesTaken} ***`);
    console.log('---------------');
    console.log(`${gameCache.userId} guessed:`);
    console.log(currentGuess);
    console.log(
      gameCache.feedbackHistory[gameCache.feedbackHistory.length - 1].response
    );

    if (currentFeedback.won) {
      console.log('***** User won the game *****');
    } else if (gameCache.guessesRemaining === 0) {
      console.log('***** User lost the game *****');
    }

    console.log('\nGuess history:');
    for (let i = gameCache.guessHistory.length - 1; i >= 0; i--) {
      console.log(gameCache.guessHistory[i]);
      console.log(gameCache.feedbackHistory[i].response);
    }
    console.log(
      `\nGuesses remaining: ${gameCache.guessesRemaining}\n---------------\n`
    );
  }

  logNewGameStart(
    userId: string,
    difficulty: string,
    totalGuesses: number
  ): void {
    console.log(
      `\n***** Starting new game for ${userId} on ${difficulty} difficulty! *****\n`
    );
    console.log(
      `
        Guess four numbers. Each number can be one of 8 numbers from 0 to 7.\n
        There are potential repeats.\n
        You have ${totalGuesses} guesses to prove you are a Mastermind
      `
    );
  }
}

const gameLoggingService = new GameLoggingService();
export default gameLoggingService;
