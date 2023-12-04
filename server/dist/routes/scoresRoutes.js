"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scoresController_1 = __importDefault(require("../controllers/scoresController"));
const router = express_1.default.Router();
router.get('/', scoresController_1.default.getScores, (req, res) => {
    res.status(200).json(res.locals.scores);
});
exports.default = router;
