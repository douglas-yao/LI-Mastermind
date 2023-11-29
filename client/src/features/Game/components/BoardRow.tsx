import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';

type BoardRowProps = {
  guess: number[];
  setCurrentGuess?: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
};

export default function BoardRow({
  guess,
  setCurrentGuess,
  disabled,
}: BoardRowProps) {
  console.log('guess: ', guess);

  function handleCurrentGuessUpdate() {
    null;
  }
  return (
    <div className="flex gap-7">
      <UserGuessRow
        guess={guess}
        setCurrentGuess={setCurrentGuess}
        disabled={disabled}
      />
      <GameCluesRow />
    </div>
  );
}
