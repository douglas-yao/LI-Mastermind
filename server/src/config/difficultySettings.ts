type DifficultySettings = {
  [key: string]: {
    startingGuesses: number;
  };
};

const difficultySettings: DifficultySettings = {
  Easy: {
    startingGuesses: 12,
  },
  Normal: {
    startingGuesses: 10,
  },
  Hard: {
    startingGuesses: 8,
  },
};

export default difficultySettings;
