import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumber = number[];
type Guesses = number[][];

export default function GameBoard() {
  const [solution, setSolution] = useState<RandomNumber>([]);
  const [guesses, setGuesses] = useState<Guesses>([]);

  useEffect(() => {
    getRandomNumber();
  }, []);

  async function getRandomNumber() {
    const randomNumber = await axios.get(
      'http://localhost:3001/game/randomSolution'
    );
    setSolution(randomNumber.data);
  }

  function renderBoardRows() {
    return rows.map((_, i) => (
      <div key={i} className="flex gap-7">
        <UserGuessRow key={`userGuessRow-${i}`} />
        <GameCluesRow key={`gameCluesRow-${i}`} />
      </div>
    ));
  }

  const rows = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={getRandomNumber}>Restart</button>
      <span>{solution}</span>
      {renderBoardRows()}
    </div>
  );
}
