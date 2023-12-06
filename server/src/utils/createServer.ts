import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());

  return app;
}

export default createServer;
