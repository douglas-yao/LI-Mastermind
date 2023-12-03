type Comparisons = {
  directMatches: number;
  indirectMatches: number;
  incorrect: number;
  won: boolean;
};

type Feedback = {
  response: string;
  won: boolean;
};

type FeedbackResponse = {
  response: string;
  won: boolean;
};

type UpdateGameControllerResponse = {
  feedback: FeedbackResponse[];
  updatedGuessesRemaining: number;
  error?: string;
};

type IsGameOver = {
  status: boolean;
  message: string;
};

type GameCache = {
  gameId: string;
  userId: string;
  currentSolution: string;
  difficulty: string;
  guessesRemaining: number;
  isGameOver: IsGameOver;
  guessHistory: string[];
  feedbackHistory: Feedback[];
};

export {
  Comparisons,
  Feedback,
  FeedbackResponse,
  UpdateGameControllerResponse,
  IsGameOver,
  GameCache,
};
