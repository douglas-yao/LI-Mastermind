import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[];
type Guesses = number[][];

export default function GameBoard() {
  const [solution, setSolution] = useState<RandomNumbers>([]);
  const [guesses, setGuesses] = useState<Guesses>([]);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  async function generateRandomNumber() {
    try {
      const randomNumbers = await axios.get(
        'http://localhost:3001/game/randomSolution'
      );

      setSolution(randomNumbers.data);
    } catch (error) {
      console.error('Error generating random number:', error);
    }
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
      <button onClick={generateRandomNumber}>Restart</button>
      <span>{solution}</span>
      {renderBoardRows()}
    </div>
  );
}
