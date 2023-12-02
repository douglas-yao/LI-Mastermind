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

class CurrentGameCache {
  private _gameCache: GameCache;

  constructor() {
    this._gameCache = { ...gameCache };
  }

  get gameId(): string {
    return this._gameCache.gameId;
  }

  set gameId(value: string) {
    this._gameCache.gameId = value;
  }

  get userId(): string {
    return this._gameCache.userId;
  }

  set userId(value: string) {
    this._gameCache.userId = value;
  }

  get currentSolution(): string {
    return this._gameCache.currentSolution;
  }

  set currentSolution(value: string) {
    this._gameCache.currentSolution = value;
  }

  get difficulty(): string {
    return this._gameCache.difficulty;
  }

  set difficulty(value: string) {
    this._gameCache.difficulty = value;
  }

  get guessesRemaining(): number {
    return this._gameCache.guessesRemaining;
  }

  set guessesRemaining(value: number) {
    this._gameCache.guessesRemaining = value;
  }

  setProperties(properties: Partial<GameCache>): void {
    this._gameCache = { ...this._gameCache, ...properties };
  }
}

export default CurrentGameCache;
