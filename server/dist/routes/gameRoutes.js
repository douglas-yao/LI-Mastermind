"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameController_1 = require("../controllers/gameController");
const validateSubmittedGuess_1 = __importDefault(require("../middleware/validateSubmittedGuess"));
const validateUser_1 = __importDefault(require("../middleware/validateUser"));
const router = express_1.default.Router();
/**
 * Route: POST /start
 * Middleware: validateUserId - Validates the user ID in the request.
 * Controller: startGameController - Handles the logic for starting a new game.
 * Description: Endpoint to start a new game.
 */
router.post('/start', 
// Validate player name string for format and to prevent injection attacks
validateUser_1.default, (req, res, next) => {
    const validationError = res.locals.validationError;
    if (validationError) {
        return res.status(200).json(validationError);
    }
    next();
}, 
// Start game logic and db transactions
gameController_1.startGameController, (req, res) => {
    res.status(200).json(res.locals.newGameData);
});
/**
 * Route: POST /update
 * Middleware:
 *   - validateSubmittedGuess - Validates the submitted guess in the request.
 * Controller: updateGameController - Handles the logic for updating the game.
 * Description: Endpoint to update the game state based on a submitted guess.
 */
router.post('/update', 
// Validate user submitted guess for appropriate formatting and game difficulty constraints
validateSubmittedGuess_1.default, (req, res, next) => {
    const validationError = res.locals.validationError;
    if (validationError) {
        return res.status(200).json(validationError);
    }
    next();
}, 
// Handle db transactions to update new user guess and corresponding game feedback
gameController_1.updateGameController, (req, res) => {
    res.status(200).json(res.locals.evaluatedSubmission);
});
exports.default = router;
