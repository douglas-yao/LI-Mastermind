// Kinda cache for now:
// Consider implementing localstorage cache?
type GameCache = {
  gameId: string;
  userId: string;
  currentSolution: string;
  difficulty: string;
  guessesRemaining: number;
};

const gameCache: GameCache = {
  gameId: '',
  userId: 'Anonymous',
  currentSolution: '',
  difficulty: '',
  guessesRemaining: 10,
};

export { gameCache };
