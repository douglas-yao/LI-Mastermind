import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import { useState, useEffect } from 'react';

export default function GameBoard() {
  const [solution, setSolution] = useState<number[] | null>(null);

  useEffect(() => {
    generateRandomArray();
  }, []);

  function generateRandomArray() {
    const randomArray = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 8)
    );
    setSolution(randomArray);
  }

  function renderBoardRows() {
    return rows.map((_, i) => (
      <div className="flex gap-7">
        <UserGuessRow key={i} />
        <GameCluesRow />
      </div>
    ));
  }

  const rows = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={generateRandomArray}>Restart</button>
      <span>{solution}</span>
      {renderBoardRows()}
    </div>
  );
}
