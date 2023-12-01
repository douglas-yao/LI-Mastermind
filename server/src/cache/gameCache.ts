// Kinda cache for now:
// Consider implementing localstorage cache?
type GameCache = {
  gameId: number | null;
  userId: number | null;
  currentSolution: string;
  difficulty: string;
  guessesRemaining: number;
};

const gameCache: GameCache = {
  gameId: null,
  userId: null,
  currentSolution: '',
  difficulty: '',
  guessesRemaining: 10,
};

export { gameCache };
