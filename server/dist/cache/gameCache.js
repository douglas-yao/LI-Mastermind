"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameCache = {
    gameId: '',
    userId: 'Anonymous',
    currentSolution: '',
    difficultyLevel: '',
    guessesRemaining: 10,
    guessesTaken: 0,
    isGameOver: {
        status: false,
        message: '',
    },
    guessHistory: [],
    feedbackHistory: [],
};
class CurrentGameCache {
    constructor() {
        this._gameCache = { ...gameCache };
    }
    get gameId() {
        return this._gameCache.gameId;
    }
    set gameId(value) {
        this._gameCache.gameId = value;
    }
    get userId() {
        return this._gameCache.userId;
    }
    set userId(value) {
        this._gameCache.userId = value;
    }
    get currentSolution() {
        return this._gameCache.currentSolution;
    }
    set currentSolution(value) {
        this._gameCache.currentSolution = value;
    }
    get difficultyLevel() {
        return this._gameCache.difficultyLevel;
    }
    set difficultyLevel(value) {
        this._gameCache.difficultyLevel = value;
    }
    get guessesRemaining() {
        return this._gameCache.guessesRemaining;
    }
    set guessesRemaining(value) {
        this._gameCache.guessesRemaining = value;
    }
    get isGameOver() {
        return this._gameCache.isGameOver;
    }
    set isGameOver(value) {
        this._gameCache.isGameOver = value;
    }
    get guessHistory() {
        return this._gameCache.guessHistory;
    }
    set guessHistory(value) {
        this._gameCache.guessHistory = value;
    }
    get feedbackHistory() {
        return this._gameCache.feedbackHistory;
    }
    set feedbackHistory(value) {
        this._gameCache.feedbackHistory = value;
    }
    setProperties(properties) {
        this._gameCache = { ...this._gameCache, ...properties };
    }
}
exports.default = CurrentGameCache;
