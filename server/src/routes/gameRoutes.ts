import express, { Request, Response } from 'express';
import { startGame, submitAttempt } from '../controllers/gameController';

// Routes for game interactions

const router = express.Router();

router.post('/play', startGame, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newGameData);
});

router.post('/attempt', submitAttempt, (req: Request, res: Response) => {
  res.status(200).json(res.locals.evaluatedSubmission);
});

export default router;
