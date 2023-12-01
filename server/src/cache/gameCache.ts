// Kinda cache for now:
// Consider implementing localstorage cache?
type GameCache = {
  gameId: string;
  userId: number | null;
  currentSolution: string;
  difficulty: string;
  guessesRemaining: number;
};

const gameCache: GameCache = {
  gameId: '',
  userId: null,
  currentSolution: '',
  difficulty: '',
  guessesRemaining: 10,
};

export { gameCache };
