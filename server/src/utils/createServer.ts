import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import gameRoutes from '../routes/gameRoutes';
import scoresRoutes from '../routes/scoresRoutes';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/game', gameRoutes);
  app.use('/scores', scoresRoutes);

  return app;
}

export default createServer;
