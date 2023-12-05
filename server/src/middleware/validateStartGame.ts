import { Request, Response, NextFunction } from 'express';

const validateStartGame = (req: Request, res: Response, next: NextFunction) => {
  const { userId, difficulty } = req.body;

  // Regular expression to match only letters and numbers
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  if (
    !userId ||
    typeof userId !== 'string' ||
    !alphanumericRegex.test(userId)
  ) {
    res.status(400).json({
      error:
        'Invalid userId. It should be a string containing only letters and numbers.',
    });
  }

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

  next();
};

export default validateStartGame;
