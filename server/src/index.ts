import express, { Request, Response } from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import scoresRoutes from './routes/scoresRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/game', gameRoutes);
app.use('/scores', scoresRoutes);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
