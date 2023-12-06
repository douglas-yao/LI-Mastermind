import supertest from 'supertest';
import createServer from '../../../utils/createServer';
import difficultySettings from '../../../config/difficultySettings';
import { GameCacheService } from '../../../services';

const app = createServer();
const request = supertest(app);
let testGameCacheService;

// Initial test game data can be set here:
const userId = 'validUserId';
const gameId = 'validGameId';
const difficultyLevel = 'Normal';
const solution = '1234';
const startingGuesses = 10;

beforeEach(async () => {
  testGameCacheService = new GameCacheService();
  const test = await request.post('/game/start').send({
    userId: userId,
    difficulty: difficultyLevel,
  });
});

describe('Game API', () => {
  describe('POST /game/play', () => {
    it('should update the game and return 200 with evaluated game data', async () => {
      const response = await request.post('/game/play').send({
        currentGuess: '4321',
      });
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.body.guessHistory[0]).toBeTruthy;
      // expect(response.body.feedback.response).toBeTruthy();
    });

    it('should return 400 with invalid guess: contains non-numeric characters', async () => {
      const response = await request.post('/game/play').send({
        guess: '!@#$a',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 with invalid guess: incorrect length', async () => {
      const response = await request.post('/game/play').send({
        guess: '123', // Invalid length
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'Invalid guess length. It should be 4 digits.'
      );
    });
  });
});
