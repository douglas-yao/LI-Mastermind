import { DifficultySettings } from '../types/types';

const difficultySettings: DifficultySettings = {
  Easy: {
    startingGuesses: 10,
    solutionLength: 3,
  },
  Normal: {
    startingGuesses: 10,
    solutionLength: 4,
  },
  Hard: {
    startingGuesses: 10,
    solutionLength: 5,
  },
};

export default difficultySettings;
