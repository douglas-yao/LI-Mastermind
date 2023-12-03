import { Feedback, IsGameOver, GameCache, Difficulty } from '../types/types';

const gameCache: GameCache = {
  gameId: '',
  userId: 'Anonymous',
  currentSolution: '',
  difficulty: {
    level: 'Normal',
    startingGuesses: 10,
  },
  guessesRemaining: 10,
  isGameOver: {
    status: false,
    message: '',
  },
  guessHistory: [],
  feedbackHistory: [],
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

  get difficulty(): Difficulty {
    return this._gameCache.difficulty;
  }

  set difficulty(value: Difficulty) {
    this._gameCache.difficulty = value;
  }

  get guessesRemaining(): number {
    return this._gameCache.guessesRemaining;
  }

  set guessesRemaining(value: number) {
    this._gameCache.guessesRemaining = value;
  }

  get isGameOver(): IsGameOver {
    return this._gameCache.isGameOver;
  }

  set isGameOver(value: IsGameOver) {
    this._gameCache.isGameOver = value;
  }

  get guessHistory(): string[] {
    return this._gameCache.guessHistory;
  }

  set guessHistory(value: string[]) {
    this._gameCache.guessHistory = value;
  }

  get feedbackHistory(): Feedback[] {
    return this._gameCache.feedbackHistory;
  }

  set feedbackHistory(value: Feedback[]) {
    this._gameCache.feedbackHistory = value;
  }

  setProperties(properties: Partial<GameCache>): void {
    this._gameCache = { ...this._gameCache, ...properties };
  }
}

export default CurrentGameCache;
