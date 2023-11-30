import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import gameRoutes from './routes/gameRoutes';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mastermind',
});

app.get('/users', (req: Request, res: Response) => {
  const q = 'SELECT * FROM users';
  db.query(q, (err, data) => {
    if (err) {
      console.log('error!');
      return res.json(err);
    }
    return res.json(data);
  });
});

app.use('/game', gameRoutes);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
