import supertest from 'supertest';
import { app } from '../index';

describe('game api', () => {
  describe('start endpoint', () => {
    describe('given invalid userId or no difficulty selected', () => {
      it('should return a 400', async () => {
        const requestBody = { userId: '!@#', difficulty: '' };
        await supertest(app).post('/game/start').send(requestBody).expect(400);
      });
    });
  });
});
