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

export { Comparisons, Feedback };
