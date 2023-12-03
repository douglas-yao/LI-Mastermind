import { NextFunction, Request, Response } from 'express';
import userGameModel from '../models/userGameModel';

type Score = {
  userId: string;
  totalGuesses: number;
};
type Scores = {
  Easy: number[];
  Normal: number[];
  Hard: number[];
};

const scoresController = {
  getScores: async (req: Request, res: Response, next: NextFunction) => {
    const scores = console.log('get scores here!');
    res.locals.scores = 'hi!';
    next();
  },
};

export default scoresController;
