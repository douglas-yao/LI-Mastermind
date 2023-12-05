import { NextFunction, Request, Response } from 'express';
import { gameLoggingService } from '../services';

const loggingController = {
  logStartGame: (req: Request, res: Response, next: NextFunction) => {
    const { userId, difficulty, guessesRemaining } = res.locals.newGameData;

    // Server logs to show start game information
    gameLoggingService.logNewGameStart(userId, difficulty, guessesRemaining);

    next();
  },

  logPlayGame: (req: Request, res: Response, next: NextFunction) => {
    const { currentGameCache, currentGuess, feedback } =
      res.locals.evaluatedGameData;

    // Server logs to show game progress:
    gameLoggingService.logGameProgress(
      currentGameCache,
      currentGuess,
      feedback
    );

    next();
  },
};

export default loggingController;
