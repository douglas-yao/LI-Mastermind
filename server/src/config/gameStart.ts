import { GameCache } from '../types/types';

const gameStartData: GameCache = {
  gameId: '',
  guessesRemaining: 10,
  guessesTaken: 0,
  currentSolution: '',
  guessHistory: [],
  feedbackHistory: [],
  userId: 'Anonymous',
  difficultyLevel: 'Normal',
  isGameOver: {
    status: false,
    message: '',
  },
};

export default gameStartData;
