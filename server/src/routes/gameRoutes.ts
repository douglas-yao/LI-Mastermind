import express, { Request, Response } from 'express';
import gameController from '../controllers/gameController';
import logger from '../middleware/logger';
import { validateStartGame, validateCurrentGuess } from '../middleware/index';

const router = express.Router();

/**
 * Route: POST /start
 * Middleware: validateUserId - Validates the user ID in the request.
 * Controller: startGameController - Handles the logic for starting a new game.
 * Description: Endpoint to start a new game.
 */
router.post(
  '/start',
  // Validate player name string for format and to prevent injection attacks
  // If inputs are invalid, route short-circuits and an error response is sent to client
  validateStartGame,
  // Start game logic and data storage transactions
  gameController.startGame,
  // Log start game information to the server console
  logger.logStartGame,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.newGameData);
  }
);

/**
 * Route: POST /update
 * Middleware:
 *   - validateSubmittedGuess - Validates the submitted guess in the request.
 * Controller: updateGameController - Handles the logic for updating the game.
 * Description: Endpoint to update the game state based on a submitted guess.
 */
router.post(
  '/play',
  // Validate user submitted guess for appropriate formatting and game rule constraints
  // If inputs are invalid, route is short-circuited and detailed error response sent to client
  validateCurrentGuess,
  // Handle game logic and data storage transactions
  gameController.playGame,
  // Log play game progress to the server console
  logger.logPlayGame,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.evaluatedGameData);
  }
);

export default router;
