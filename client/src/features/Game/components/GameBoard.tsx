import UserGuessRow from './UserGuesses/UserGuessRow';
import GameCluesRow from './GameClues/GameCluesRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[];
type Guesses = number[][];

export default function GameBoard({ difficulty, playerName }) {
  const [solution, setSolution] = useState<RandomNumbers>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>(Array(4).fill(''));
  const [guesses, setGuesses] = useState<Guesses>([currentGuess]);

  console.log(difficulty);

  useEffect(() => {
    generateRandomNumbers();
    console.log(guesses);
  }, []);

  useEffect(() => {
    if (guesses.length === 10) {
      alert('Game Over!');
    }
  }, [guesses]);

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

  function handleGuessSubmit(e) {
    e.preventDefault();

    setGuesses((prev) => [...prev, currentGuess]);
  }

  function handleNewGameClick() {
    generateRandomNumbers();
    setCurrentGuess(Array(4).fill(''));
    setGuesses([currentGuess]);
  }

  function renderBoardRows() {
    return guesses.map((guess, i) => (
      <form onSubmit={handleGuessSubmit} key={i} className="flex gap-7">
        <UserGuessRow
          key={`userGuessRow-${i}`}
          guess={guess}
          setCurrentGuess={setCurrentGuess}
        />
        <GameCluesRow key={`gameCluesRow-${i}`} />
        <button
          onClick={handleGuessSubmit}
          className="bg-green-300 text-grey-600 px-4 py-1 rounded-md"
        >
          Submit
        </button>
      </form>
    ));
  }

  // const rows = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="bg-orange-400 text-grey-600 px-4 py-2 rounded-md"
        onClick={handleNewGameClick}
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
