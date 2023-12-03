import { Request, Response, NextFunction } from 'express';

const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  console.log('in userId validation middleware: ', userId, typeof userId);

  // Regular expression to match only letters and numbers
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  if (
    !userId ||
    typeof userId !== 'string' ||
    !alphanumericRegex.test(userId)
  ) {
    res.locals.validationError = {
      error:
        'Invalid userId. It should be a string containing only letters and numbers.',
    };
  }

  next();
};

export default validateUserId;
