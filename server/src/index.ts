import express, { Request, Response } from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';

const app = express();

app.use(express.json());
app.use(cors());

// async function queryAllDatabase() {
//   try {
//     const [rows, fields] = await pool.execute('SELECT * FROM users');
//     console.log('Query Result:', rows);
//     return rows;
//   } catch (error) {
//     console.error('Error executing query:', error);
//   } finally {
//   }
// }

// // Release the connection back to the pool
// pool.end();

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'mastermind',
// });

// app.get('/users', (req: Request, res: Response) => {
//   const q = 'SELECT * FROM users';
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log('error!');
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });

app.use('/game', gameRoutes);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
