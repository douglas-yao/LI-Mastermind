"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUserId = (req, res, next) => {
    const { userId } = req.body;
    // Regular expression to match only letters and numbers
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!userId ||
        typeof userId !== 'string' ||
        !alphanumericRegex.test(userId)) {
        res.locals.validationError = {
            error: 'Invalid userId. It should be a string containing only letters and numbers.',
        };
    }
    next();
};
exports.default = validateUserId;
