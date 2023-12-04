"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameController = exports.startGameController = void 0;
const uuid_1 = require("uuid");
const GameModel_1 = __importDefault(require("../models/GameModel"));
const userGameModel_1 = __importDefault(require("../models/userGameModel"));
const gameCache_1 = __importDefault(require("../cache/gameCache"));
const index_1 = require("../services/index");
const difficultySettings_1 = __importDefault(require("../config/difficultySettings"));
// CurrentGameCache to store current game instance's data
const currentGameCache = new gameCache_1.default();
// Handles the initiation of a new game
/**
 * Input: Request body containing the userId:string and difficulty:string
 * Output: Response to the route handler containing a randomized solution:string and number of guesses:number
 */
const startGameController = async (req, res, next) => {
    const { userId, difficulty } = req.body;
    console.log(`\n***** Starting new game for ${userId} on ${difficulty} difficulty! *****\n`);
    try {
        // Fetch a random number sequence from the Random.org API
        const solution = await (0, index_1.getRandomSolution)(difficulty);
        // Instantiate game cache with starting data
        currentGameCache.setProperties({
            gameId: (0, uuid_1.v4)(),
            guessesRemaining: difficultySettings_1.default[difficulty].startingGuesses,
            currentSolution: solution,
            guessHistory: [],
            feedbackHistory: [],
            userId: userId,
            difficultyLevel: difficulty,
            isGameOver: {
                status: false,
                message: '',
            },
        });
        // Save the solution and remaining guesses to the database
        await GameModel_1.default.createNewGameInstance(solution, currentGameCache.guessesRemaining, currentGameCache.gameId, currentGameCache.difficultyLevel);
        await userGameModel_1.default.createNewUserGame(userId, currentGameCache.gameId, currentGameCache.difficultyLevel);
        res.locals.newGameData = currentGameCache;
        return next();
    }
    catch (error) {
        console.error('Error starting the game:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.startGameController = startGameController;
// Handles the submission of a new attempt
const updateGameController = async (req, res, next) => {
    const { currentGuess } = req.body;
    try {
        const feedback = (0, index_1.generateFeedback)(currentGuess, currentGameCache.currentSolution);
        // Wrap into a db transaction handler that takes in guessesRemaining and feedback.won
        // Handle logic to send losing condition message to client
        // Handle game end if guesses 0
        // Consider creating a method or function to re-initialize gameCache
        // E.g., method called, client receives back all the empty pieces of state
        currentGameCache.setProperties({
            guessHistory: [...currentGameCache.guessHistory, currentGuess],
            feedbackHistory: [...currentGameCache.feedbackHistory, feedback],
        });
        if (--currentGameCache.guessesRemaining === 0 || feedback.won === true) {
            userGameModel_1.default.updateGameCompletionStatus(currentGameCache.gameId, feedback.won, currentGameCache.difficultyLevel, currentGameCache.guessesRemaining);
            currentGameCache.isGameOver = {
                status: true,
                message: `${feedback.won
                    ? 'You are a Mastermind!'
                    : 'With each loss, you grow closer to becoming a Mastermind.'}`,
            };
        }
        GameModel_1.default.updateGameInstance(currentGameCache.gameId, currentGuess, currentGameCache.currentSolution, feedback.response, currentGameCache.guessesRemaining, currentGameCache.difficultyLevel);
        // Server logs to show game progress:
        index_1.gameLoggingService.logGameProgress(currentGameCache, currentGuess, feedback);
        // If keeping debugging logs below, consider wrapping
        // console.log('incoming submission: ', req.body);
        // console.log('feedback: ', feedback);
        res.locals.evaluatedSubmission = {
            feedback: currentGameCache.feedbackHistory,
            updatedGuessesRemaining: currentGameCache.guessesRemaining,
            isGameOver: currentGameCache.isGameOver,
            updatedGuessHistory: currentGameCache.guessHistory,
        };
        return next();
    }
    catch (error) {
        console.error('Error submitting current attempt:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateGameController = updateGameController;
