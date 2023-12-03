export type Guesses = string[];

export type GameBoardProps = {
  difficulty: Difficulty;
  playerName: string;
};

export type FeedbackResponse = {
  response: string;
  won: boolean;
};

export type IsGameOver = {
  status: boolean;
  message: string;
};

export type Difficulty = {
  level: string;
  startingGuesses: number;
};
