"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoresController = {
    getScores: async (req, res, next) => {
        const scores = console.log('get scores here!');
        res.locals.scores = 'hi!';
        next();
    },
};
exports.default = scoresController;
