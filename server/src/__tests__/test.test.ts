import supertest from 'supertest';
import createServer from '../utils/createServer';
import pool from '../config/dbConnect';

const app = createServer();

beforeAll(async () => {
  
})

describe('game api', () => {
  describe('start endpoint', () => {
    describe('given invalid userId or no difficulty selected', () => {
      it('should return a 404', async () => {
        const requestBody = { userId: '!@#', difficulty: '' };
        await supertest(app).post('/game/start').send(requestBody).expect(400);
      });
    });
  });
});

describe('game api', () => {
  describe('start endpoint', () => {
    describe('given vaid userId and difficulty selected', () => {
      it('should return a 404', async () => {
        const requestBody = { userId: 'testUser', difficulty: 'Normal' };
        await supertest(app).post('/game/start').send(requestBody).expect(200);
      });
    });
  });
});
