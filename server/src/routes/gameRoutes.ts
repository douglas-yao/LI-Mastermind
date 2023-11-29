import express, { Request, Response } from 'express';
import axios from 'axios';

const gameRouter = express.Router();

gameRouter.post('/randomSolution', async (req: Request, res: Response) => {
  console.log('req body: ', req.body);
  const randomNumber = await getRandomNumber();
  res.json(randomNumber);

  async function getRandomNumber() {
    const response = await axios.get(
      'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    );
    const randomNumbers = convertStringToArray(response.data);
    return randomNumbers;
  }

  function convertStringToArray(str: string) {
    const stringArray = str.trim().split('\n');

    const numberArray = stringArray.map(Number);

    return numberArray;
  }
});

export default gameRouter;
