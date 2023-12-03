import { Request, Response, NextFunction } from 'express';

const validateCurrentGuess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess } = req.body; // Change variable name here
  console.log(
    'in validation middleware: ',
    currentGuess, // Change variable name here
    typeof currentGuess // Change variable name here
  );
  if (
    !currentGuess || // Change variable name here
    typeof currentGuess !== 'string' || // Change variable name here
    currentGuess.length !== 4 // Change variable name here
  ) {
    res.locals.validationError = {
      error: 'Invalid submitted guess. It should be a string of length 4.',
    };
  } else {
    const isValidGuess = currentGuess.split('').every((digit) => {
      // Change variable name here
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

export default validateCurrentGuess;
