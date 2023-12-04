import { NextFunction, Request, Response } from 'express';
import userGameModel from '../models/userGameModel';
import { Scores, Score } from '../types/types';

const scoresController = {
  getTopScores: async (req: Request, res: Response, next: NextFunction) => {
    const { difficulty } = req.body;
    console.log('getTopScores req body: ', difficulty);
    const topScores = await userGameModel.getTopScores(difficulty, '10');
    // console.log(topScores);

    res.locals.scores = topScores;
    next();
  },
};

export default scoresController;
