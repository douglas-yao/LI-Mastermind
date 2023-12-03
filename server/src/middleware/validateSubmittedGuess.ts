import { Request, Response, NextFunction } from 'express';

const validateCurrentGuess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess } = req.body;
  console.log('in validation middleware: ', currentGuess, typeof currentGuess);
  if (
    !currentGuess ||
    typeof currentGuess !== 'string' ||
    currentGuess.length !== 4
  ) {
    res.locals.validationError = {
      error: 'Invalid submitted guess. It should be a string of length 4.',
    };
  } else {
    const isValidGuess = currentGuess.split('').every((digit) => {
      const numericDigit = parseInt(digit, 10);
      return !isNaN(numericDigit) && numericDigit >= 0 && numericDigit <= 7;
    });

    if (!isValidGuess) {
      res.locals.validationError = {
        error: 'Invalid submitted guess. Each digit should be between 0 and 7.',
      };
    }
  }

  next();
};

export default validateCurrentGuess;
