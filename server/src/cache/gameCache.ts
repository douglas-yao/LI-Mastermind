// Kinda cache for now:
// Consider implementing localstorage cache?
type GameCache = {
  currentSolution: string | null;
  gameId: number | null;
  userId: number | null;
};

const gameCache: GameCache = {
  currentSolution: null,
  gameId: null,
  userId: null,
};

export { gameCache };
