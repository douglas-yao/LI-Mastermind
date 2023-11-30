import express, { Request, Response } from 'express';
import getRandomNumber from '../utils/generateSolution';
import { startGame } from '../controllers/gameController';

const router = express.Router();

router.post('/play', startGame);

// Generate a random number
router.post('/randomSolution', async (req: Request, res: Response) => {
  const { difficulty } = req.body;

  const randomNumber = await getRandomNumber(difficulty);
  res.json(randomNumber);
});

router.post('/submitRow', async (req: Request, res: Response) => {
  const { submission } = req.body;
});

export default router;
