import { DifficultySettings } from '../types/types';

const difficultySettings: DifficultySettings = {
  Easy: {
    startingGuesses: 10,
    solutionLength: 3,
    timerDuration: 120000,
  },
  Normal: {
    startingGuesses: 10,
    solutionLength: 4,
    timerDuration: 60000,
  },
  Hard: {
    startingGuesses: 10,
    solutionLength: 5,
    timerDuration: 30000,
  },
};

export default difficultySettings;
