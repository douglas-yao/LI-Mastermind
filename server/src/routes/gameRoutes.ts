import express, { Request, Response, NextFunction } from 'express';
import {
  startGameController,
  updateGameController,
} from '../controllers/gameController';
import validateSubmittedGuess from '../middleware/validateSubmittedGuess';

const router = express.Router();

router.post('/start', startGameController, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newGameData);
});

router.post(
  '/update',
  validateSubmittedGuess,
  (req: Request, res: Response, next: NextFunction) => {
    const validationError = res.locals.validationError;
    if (validationError) {
      return res.status(200).json(validationError);
    }

    // Continue to the next middleware or route handler
    next();
  },
  updateGameController,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.evaluatedSubmission);
  }
);

export default router;
