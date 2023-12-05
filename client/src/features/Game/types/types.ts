export type Guesses = string[];

export type GameBoardProps = {
  difficulty: string;
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

export type Score = {
  userId: string;
  guessesTaken: number;
};

export type Scores = {
  Easy: Score[];
  Normal: Score[];
  Hard: Score[];
};

export type DifficultySettings = {
  [key: string]: DifficultySetting;
};

export type DifficultySetting = {
  startingGuesses: number;
  solutionLength: number;
};
