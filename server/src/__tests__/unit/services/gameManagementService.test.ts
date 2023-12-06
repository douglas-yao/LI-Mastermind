import { gameManagementService } from '../../../services';

describe('GameManagementService', () => {
  describe('getInitialGameData', () => {
    test('returns valid initial game data for Normal difficulty', async () => {
      const difficulty = 'Normal';
      const initialGameData = await gameManagementService.getInitialGameData(
        difficulty
      );

      expect(initialGameData.solution).toHaveLength(4);
      expect(initialGameData.currentDifficultySetting).toBeDefined();
      expect(initialGameData.gameId).toHaveLength(36);
    });
  });

  describe('getFeedback', () => {
    test('returns correct feedback for a winning guess', () => {
      const guess = '1234';
      const solution = '1234';
      const feedback = gameManagementService.getFeedback(guess, solution);

      expect(feedback.response).toBe('You are a Mastermind!');
      expect(feedback.won).toBe(true);
    });

    test('returns correct feedback for an all-incorrect guess', () => {
      const guess = '9876';
      const solution = '1234';
      const feedback = gameManagementService.getFeedback(guess, solution);

      expect(feedback.response).toStrictEqual('All incorrect');
      expect(feedback.won).toBe(false);
    });

    test('returns correct feedback for a mix of correct and incorrect digits', () => {
      const guess = '1567';
      const solution = '5678';
      const feedback = gameManagementService.getFeedback(guess, solution);

      expect(feedback.response).toStrictEqual(
        '3 correct number and 0 correct location'
      );
      expect(feedback.won).toBe(false);
    });

    test('returns correct feedback for another mix of correct and incorrect digits', () => {
      const guess = '5566';
      const solution = '5678';
      const feedback = gameManagementService.getFeedback(guess, solution);

      expect(feedback.response).toStrictEqual(
        '2 correct number and 1 correct location'
      );
      expect(feedback.won).toBe(false);
    });
  });

  describe('compareStrings', () => {
    test('returns correct comparisons with no matches', () => {
      const attempt = '1234';
      const solution = '5678';
      const comparisons = gameManagementService.compareStrings(
        attempt,
        solution
      );

      expect(comparisons).toEqual({
        directMatches: 0,
        overallMatches: 0,
        incorrect: 4,
        won: false,
      });
    });

    test('returns correct comparisons with direct matches', () => {
      const attempt = '1234';
      const solution = '1234';
      const comparisons = gameManagementService.compareStrings(
        attempt,
        solution
      );

      expect(comparisons).toEqual({
        directMatches: 4,
        overallMatches: 4,
        incorrect: 0,
        won: true,
      });
    });

    test('returns correct comparisons with indirect matches', () => {
      const attempt = '1234';
      const solution = '4321';
      const comparisons = gameManagementService.compareStrings(
        attempt,
        solution
      );

      expect(comparisons).toEqual({
        directMatches: 0,
        overallMatches: 4,
        incorrect: 0,
        won: false,
      });
    });

    test('returns correct comparisons with both direct and indirect matches', () => {
      const attempt = '1234';
      const solution = '1243';
      const comparisons = gameManagementService.compareStrings(
        attempt,
        solution
      );

      expect(comparisons).toEqual({
        directMatches: 2,
        overallMatches: 4,
        incorrect: 0,
        won: false,
      });
    });
  });

  describe('parseRandomRes', () => {
    test('removes newline characters from the random number sequence', () => {
      const randomNumberSequence = '1\n2\n3\n4\n';
      const parsedResult =
        gameManagementService.parseRandomRes(randomNumberSequence);

      expect(parsedResult).toBe('1234');
    });
  });
});
