import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/scores', (req: Request, res: Response) => {
  res.status(200).json('/scores endpoint reached!');
});
