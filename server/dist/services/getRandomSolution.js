"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchRandomNumbers_1 = __importDefault(require("../utils/fetchRandomNumbers"));
const parseRandomRes_1 = __importDefault(require("../utils/parseRandomRes"));
async function getRandomSolution(difficulty) {
    const randomNumberSequence = await (0, fetchRandomNumbers_1.default)(difficulty);
    const solution = (0, parseRandomRes_1.default)(randomNumberSequence);
    return solution;
}
exports.default = getRandomSolution;
