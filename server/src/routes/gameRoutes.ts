import express, { Request, Response, NextFunction } from 'express';
import {
  startGameController,
  updateGameController,
} from '../controllers/gameController';
import validateSubmittedGuess from '../middleware/validateSubmittedGuess';
import validateUserId from '../middleware/validateUser';

// Create an Express Router instance
const router = express.Router();

/**
 * Route: POST /start
 * Middleware: validateUserId - Validates the user ID in the request.
 * Controller: startGameController - Handles the logic for starting a new game.
 * Description: Endpoint to start a new game.
 */
router.post(
  '/start',
  validateUserId,
  startGameController,
  (req: Request, res: Response, next: NextFunction) => {
    // Check if there is a validation error from the middleware
    const validationError = res.locals.validationError;
    if (validationError) {
      // Respond with the validation error
      return res.status(200).json(validationError);
    }

    // If no validation error, proceed to the next middleware/controller
    next();
  },
  (req: Request, res: Response) => {
    // Respond with the new game data
    res.status(200).json(res.locals.newGameData);
  }
);

/**
 * Route: POST /update
 * Middleware:
 *   - validateSubmittedGuess - Validates the submitted guess in the request.
 *   - validateUserId - Validates the user ID in the request.
 * Controller: updateGameController - Handles the logic for updating the game.
 * Description: Endpoint to update the game state based on a submitted guess.
 */
router.post(
  '/update',
  validateSubmittedGuess,
  (req: Request, res: Response, next: NextFunction) => {
    // Check if there is a validation error from the middleware
    const validationError = res.locals.validationError;
    if (validationError) {
      // Respond with the validation error
      return res.status(200).json(validationError);
    }

    // If no validation error, proceed to the next middleware/controller
    next();
  },
  updateGameController,
  (req: Request, res: Response) => {
    // Respond with the evaluated submission data
    res.status(200).json(res.locals.evaluatedSubmission);
  }
);

// Export the router for use in other parts of the application
export default router;
