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

beforeEach(() => {
  testGameCacheService = new GameCacheService();
  testGameCacheService.initializeGameCache(
    userId,
    gameId,
    difficultyLevel,
    solution,
    startingGuesses
  );
});

describe('Game API', () => {
  describe('POST /game/start', () => {
    it('should start a new game and return 200 with game data', async () => {
      const response = await request.post('/game/start').send({
        userId: 'validUserId',
        difficulty: 'Normal',
      });

      expect(response.status).toBe(200);
      expect(response.body.gameId).toBeTruthy();
    });
  });

  describe('POST /game/play', () => {
    it('should update the game and return 200 with evaluated game data', async () => {
      const response = await request.post('/game/play').send({
        userId: 'userId123',
        guess: '5678',
        difficulty: 'easy',
      });

      expect(response.status).toBe(200);
      expect(response.body.feedback.response).toBeTruthy();
    });

    it('should return 400 with invalid guess: contains non-numeric characters', async () => {
      const response = await request.post('/game/play').send({
        userId: 'userId123',
        guess: '!@#$', // Invalid guess
        difficulty: 'easy',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'Invalid guess. It should contain only numbers.'
      );
    });

    it('should return 400 with invalid guess: incorrect length', async () => {
      const response = await request.post('/game/play').send({
        userId: 'userId123',
        guess: '123', // Invalid length
        difficulty: 'easy',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'Invalid guess length. It should be 4 digits.'
      );
    });
  });
});
