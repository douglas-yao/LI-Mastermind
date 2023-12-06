/**
 * Currently, this test runs, but pushes data straight to the actual database.
 * Mock the db instead
 */

// import supertest from 'supertest';
// import createServer from '../../../utils/createServer';

// const app = createServer();

// describe('Game API', () => {
//   describe('POST /start', () => {
//     it('should start a new game and return 200 with game data', async () => {
//       const response = await supertest(app)
//         .post('/game/start')
//         .send({ userId: 'validUserId', difficulty: 'Normal' });

//       expect(response.status).toBe(200);
//       expect(response.body.gameId).toBeTruthy();
//     });

//     it("should return 200 and a randomized solution with length 3 for a difficulty of 'Easy'", async () => {
//       const response = await supertest(app)
//         .post('/game/start')
//         .send({ userId: 'validUserId', difficulty: 'Easy' });

//       expect(response.status).toBe(200);
//       expect(response.body.currentSolution).toHaveLength(3);
//     });

//     it("should return 200 and a randomized solution with length 4 for a difficulty of 'Normal'", async () => {
//       const response = await supertest(app)
//         .post('/game/start')
//         .send({ userId: 'validUserId', difficulty: 'Normal' });

//       expect(response.status).toBe(200);
//       expect(response.body.currentSolution).toHaveLength(4);
//     });

//     it("should return 200 and a randomized solution with length 4 for a difficulty of 'Hard'", async () => {
//       const response = await supertest(app)
//         .post('/game/start')
//         .send({ userId: 'validUserId', difficulty: 'Hard' });

//       expect(response.status).toBe(200);
//       expect(response.body.currentSolution).toHaveLength(5);
//     });
//   });

//   it('should return 400 with invalid userId or no difficulty selected', async () => {
//     const response = await supertest(app)
//       .post('/game/start')
//       .send({ userId: `SELECT * FROM games`, difficulty: '' });

//     expect(response.status).toBe(400);
//   });

//   beforeAll(async () => {});
// });
