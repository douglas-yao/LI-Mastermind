import express, { Request, Response, NextFunction } from 'express';
import scoresController from '../controllers/scoresController';

const router = express.Router();

router.post(
  '/',
  scoresController.getTopScores,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.scores);
  }
);

export default router;
