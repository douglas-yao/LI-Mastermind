"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const scoresRoutes_1 = __importDefault(require("./routes/scoresRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/game', gameRoutes_1.default);
app.use('/scores', scoresRoutes_1.default);
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
