import { Request, Response, NextFunction } from 'express';
import difficultySettings from '../config/difficultySettings';

/**
 * Middleware to validate the submitted guess in the request.
 * It checks if currentGuess is a valid string of 4 digits, and each digit is between 0 and 7.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction to pass control to the next middleware.
 */
const validateCurrentGuess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess, difficulty } = req.body;

  // Validate each digit of currentGuess
  const isValidGuess = currentGuess.split('').every((digit: string) => {
    const numericDigit = parseInt(digit, 10);
    return !isNaN(numericDigit) && numericDigit >= 0 && numericDigit <= 7;
  });

  if (!isValidGuess) {
    return res.status(400).json({
      error: 'Invalid submitted guess. Each digit should be between 0 and 7.',
    });
  }

  // Get the configured length for the difficulty
  const difficultyLength = difficultySettings[difficulty]?.solutionLength;

  // Check if the difficulty length is configured
  if (!difficultyLength) {
    return res.status(400).json({
      error:
        "Something went wrong behind the scenes... don't worry, you're still a Mastermind.",
    });
  }

  // Check if the input is a number
  if (typeof currentGuess === 'number') {
    return res.status(400).json({
      error: `Invalid guess. It contain only numbers.`,
    });
  }

  // Check if the length of the currentGuess matches the configuration
  if (currentGuess.length !== difficultyLength) {
    return res.status(400).json({
      error: `Invalid guess length. It should be ${difficultyLength} digits.`,
    });
  }

  next();
};

export default validateCurrentGuess;
