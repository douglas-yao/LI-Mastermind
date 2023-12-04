import { Request, Response, NextFunction } from 'express';

const validateCurrentGuess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess } = req.body;

  if (
    !currentGuess ||
    typeof currentGuess !== 'string' ||
    currentGuess.length !== 4
  ) {
    return res.status(400).json({
      error: 'Invalid submitted guess. It should be 4 digits.',
    });
  }

  const isValidGuess = currentGuess.split('').every((digit) => {
    const numericDigit = parseInt(digit, 10);
    return !isNaN(numericDigit) && numericDigit >= 0 && numericDigit <= 7;
  });

  if (!isValidGuess) {
    return res.status(400).json({
      error: 'Invalid submitted guess. Each digit should be between 0 and 7.',
    });
  }

  next();
};

export default validateCurrentGuess;
