const gameStartData = {
  gameId: '',
  guessesRemaining: 10,
  guessesTaken: 0,
  currentSolution: null,
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
