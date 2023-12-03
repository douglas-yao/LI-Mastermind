import { GameCache } from '../types/types';
import { FeedbackResponse } from '../types/types';

class GameLoggingService {
  logGameProgress(
    gameCache: GameCache,
    currentGuess: string,
    currentFeedback: FeedbackResponse
  ): void {
    console.log(`*** Round ${10 - gameCache.guessesRemaining} ***`);
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
}

const gameLoggingService = new GameLoggingService();
export default gameLoggingService;
