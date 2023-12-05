import { NextFunction, Request, Response } from 'express';
import UserGameModel from '../models/UserGameModel';

const userGameModel = new UserGameModel();

const scoresController = {
  getTopScores: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { difficulty } = req.body;
      const topScores = await userGameModel.getTopScores(difficulty, '10');

      res.locals.scores = topScores;
      next();
    } catch (error) {
      console.error('Error fetching top scores:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default scoresController;
