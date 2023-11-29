import express, { Request, Response } from 'express';

const gameRouter = express.Router();

gameRouter.get('/randomSolution', async (req: Request, res: Response) => {
  console.log(`request: ${req.body}`);

  const randomNumber = generateRandomArray();

  res.json(randomNumber);

  function generateRandomArray() {
    const randomArray = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 8)
    );
    return randomArray;
  }
});

export default gameRouter;
