"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateCurrentGuess = (req, res, next) => {
    const { currentGuess } = req.body;
    if (!currentGuess ||
        typeof currentGuess !== 'string' ||
        currentGuess.length !== 4) {
        res.locals.validationError = {
            error: 'Invalid submitted guess. It should be a string of length 4.',
        };
    }
    else {
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
exports.default = validateCurrentGuess;
