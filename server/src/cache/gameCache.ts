type GameCache = {
  gameId: string;
  userId: string;
  currentSolution: string;
  difficulty: string;
  guessesRemaining: number;
  isGameOver: boolean;
  guessHistory: string[];
};

const gameCache: GameCache = {
  gameId: '',
  userId: 'Anonymous',
  currentSolution: '',
  difficulty: '',
  guessesRemaining: 10,
  isGameOver: false,
  guessHistory: [],
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

  get isGameOver(): boolean {
    return this._gameCache.isGameOver;
  }

  set isGameOver(value: boolean) {
    this._gameCache.isGameOver = value;
  }

  get guessHistory(): string[] {
    return this._gameCache.guessHistory;
  }

  set guessHistory(value: string[]) {
    this._gameCache.guessHistory = value;
  }

  setProperties(properties: Partial<GameCache>): void {
    this._gameCache = { ...this._gameCache, ...properties };
  }
}

export default CurrentGameCache;
