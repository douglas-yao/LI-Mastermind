import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[];
type Guesses = number[][];

export default function GameBoard({ difficulty, playerName }) {
  const [solution, setSolution] = useState<RandomNumbers>([]);
  const [guesses, setGuesses] = useState<Guesses>([]);

  console.log(difficulty);

  useEffect(() => {
    generateRandomNumbers();
    console.log(guesses);
  }, []);

  async function generateRandomNumbers() {
    try {
      const randomNumbers = await axios.post(
        'http://localhost:3001/game/randomSolution',
        { difficulty }
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
      <button
        className="bg-orange-400 text-grey-600 px-4 py-2 rounded-md"
        onClick={generateRandomNumbers}
      >
        New Game
      </button>
      <span>Player: {playerName}</span>
      <span>Current difficulty: {difficulty}</span>
      <span>Current solution: {solution}</span>
      {renderBoardRows()}
    </div>
  );
}
