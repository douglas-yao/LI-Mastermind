import express, { Request, Response } from 'express';
import {
  startGameController,
  updateGameController,
} from '../controllers/gameController';

// Routes for game interactions

const router = express.Router();

router.post('/play', startGameController, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newGameData);
});

// Rename controller below to be more specific
router.post('/attempt', updateGameController, (req: Request, res: Response) => {
  res.status(200).json(res.locals.evaluatedSubmission);
});

export default router;
