import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import SubmissionFeedback from './GameClues/SubmissionFeedback';

type Feedback = {
  directMatches: string;
  indirectMatches: string;
  incorrect: string;
  won: boolean;
};

type BoardRowProps = {
  guess: number[];
  setCurrentGuess?: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
  feedback: Feedback | null;
};

export default function BoardRow({
  guess,
  setCurrentGuess,
  disabled,
  feedback,
}: BoardRowProps) {
  // console.log('guess: ', guess);

  function handleCurrentGuessUpdate() {
    null;
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <UserGuessRow
        guess={guess}
        setCurrentGuess={setCurrentGuess}
        disabled={disabled}
      />
      {/* <GameCluesRow /> */}
      {feedback ? <SubmissionFeedback feedback={feedback} /> : null}
    </div>
  );
}
