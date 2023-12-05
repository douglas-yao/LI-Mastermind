import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate and sanitize the start game request.
 * It checks if userId is a valid string containing only letters and numbers,
 * and if difficulty is a valid string representing difficulty levels (Easy, Normal, Hard).
 * If userId is an empty string or becomes empty after trimming, it is set to 'Anonymous'.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction to pass control to the next middleware.
 */
const validateStartGame = (req: Request, res: Response, next: NextFunction) => {
  let { userId, difficulty } = req.body;

  // Regex to match only letters and numbers
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  // Validate and sanitize userId
  userId = (userId || 'Anonymous').trim() || 'Anonymous';

  if (typeof userId !== 'string' || !alphanumericRegex.test(userId)) {
    return res.status(400).json({
      error:
        'Invalid userId. It should be a string containing only letters and numbers.',
    });
  }

  // Validate difficulty
  const validDifficulties = ['Easy', 'Normal', 'Hard'];
  if (
    !difficulty ||
    typeof difficulty !== 'string' ||
    !validDifficulties.includes(difficulty)
  ) {
    return res.status(400).json({
      error: 'Invalid difficulty. It should be one of: Easy, Normal, Hard.',
    });
  }

  // Pass sanitized userId to the next middleware
  req.body.userId = userId;
  next();
};

export default validateStartGame;
