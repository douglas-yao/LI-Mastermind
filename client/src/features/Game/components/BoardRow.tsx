import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';

type BoardRowProps = {
  guess: number[];
  setCurrentGuess?: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function BoardRow({ guess, setCurrentGuess }: BoardRowProps) {
  console.log('guess: ', guess);
  return (
    <div className="flex gap-7">
      <UserGuessRow guess={guess} setCurrentGuess={setCurrentGuess} />
      <GameCluesRow />
    </div>
  );
}
