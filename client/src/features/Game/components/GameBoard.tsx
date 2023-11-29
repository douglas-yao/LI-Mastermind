import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';

export default function GameBoard() {
  const rows = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div className="flex flex-col items-center gap-4">
      {rows.map((_, i) => (
        <div className="flex gap-7">
          <UserGuessRow key={i} />
          <GameCluesRow />
        </div>
      ))}
    </div>
  );
}
