import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const pool = mysql.createPool({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT ? parseInt(DB_PORT, 10) : 3306,
  database: 'mastermind_game',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
