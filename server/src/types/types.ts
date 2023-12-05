export type Comparisons = {
  directMatches: number;
  indirectMatches: number;
  incorrect: number;
  won: boolean;
};

export type Feedback = {
  response: string;
  won: boolean;
};

export type FeedbackResponse = {
  response: string;
  won: boolean;
};

export type UpdateGameControllerResponse = {
  feedback: FeedbackResponse[];
  updatedGuessesRemaining: number;
  error?: string;
};

export type IsGameOver = {
  status: boolean;
  message: string;
};

export type GameCache = {
  gameId: string;
  userId: string;
  currentSolution: string;
  difficultyLevel: string;
  guessesRemaining: number;
  guessesTaken: number;
  isGameOver: IsGameOver;
  guessHistory: string[];
  feedbackHistory: Feedback[];
};

export type Score = {
  userId: string;
  totalGuesses: number;
};

export type Scores = {
  Easy: number[];
  Normal: number[];
  Hard: number[];
};

export type DifficultySettings = {
  [key: string]: DifficultySetting;
};

export type DifficultySetting = {
  startingGuesses: number;
};

export type InitialGameData = {
  solution: string;
  currentDifficultySetting: DifficultySetting;
  gameId: string;
};
