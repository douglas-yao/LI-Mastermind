import express, { Request, Response } from 'express';
import { startGame } from '../controllers/gameController';

const router = express.Router();

router.post('/play', startGame, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newGameData);
});

export default router;
