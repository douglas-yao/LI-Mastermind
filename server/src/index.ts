import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
