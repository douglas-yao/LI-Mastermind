"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compareStrings_1 = __importDefault(require("../utils/compareStrings"));
function generateFeedback(attempt, solution) {
    const comparisons = (0, compareStrings_1.default)(attempt, solution) || {
        directMatches: 0,
        indirectMatches: 0,
        incorrect: 0,
        won: false,
    };
    // Construct the feedback response object:
    const feedback = {
        response: '',
        won: false,
    };
    if (comparisons.incorrect === 4) {
        feedback.response = 'All incorrect';
    }
    else if (comparisons.directMatches === 4) {
        feedback.response = 'You are a Mastermind!';
    }
    else {
        feedback.response = `${comparisons.indirectMatches} correct number and ${comparisons.directMatches} correct location`;
    }
    2;
    feedback.won = comparisons.won;
    // Console logs for server debugging:
    // console.log('attempt and solution: ', attempt, solution);
    // console.log('comparisons object: ', comparisons);
    // console.log('feedback object: ', feedback);
    return feedback;
}
exports.default = generateFeedback;
