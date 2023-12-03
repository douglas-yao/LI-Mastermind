import { Request, Response, NextFunction } from 'express';

const validateSubmittedGuess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { submittedGuess } = req.body as { submittedGuess: string };

  if (
    !submittedGuess ||
    typeof submittedGuess !== 'string' ||
    submittedGuess.length !== 4
  ) {
    res.locals.validationError = {
      error: 'Invalid submitted guess. It should be a string of length 4.',
    };
  } else {
    const isValidGuess = submittedGuess.split('').every((digit) => {
      const numericDigit = parseInt(digit, 10);
      return !isNaN(numericDigit) && numericDigit >= 0 && numericDigit <= 7;
    });

    if (!isValidGuess) {
      res.locals.validationError = {
        error: 'Invalid submitted guess. Each digit should be between 0 and 7.',
      };
    }
  }

  // Continue to the next middleware or route handler
  next();
};

export default validateSubmittedGuess;
