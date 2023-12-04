import express, { Request, Response, NextFunction } from 'express';
import gameController from '../controllers/gameController';
import validateSubmittedGuess from '../middleware/validateSubmittedGuess';
import validateUserId from '../middleware/validateUser';

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
  validateUserId,
  // Start game logic and db transactions
  gameController.startGame,
  (req: Request, res: Response) => {
    // check for errors
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
  '/update',
  // Validate user submitted guess for appropriate formatting and game difficulty constraints
  validateSubmittedGuess,
  // Handle db transactions to update new user guess and corresponding game feedback
  gameController.playGame,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.evaluatedSubmission);
  }
);

export default router;
