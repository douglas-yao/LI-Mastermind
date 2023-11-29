import BoardRow from './BoardRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[];
type Guesses = number[][];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  const [solution, setSolution] = useState<RandomNumbers>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>(Array(4).fill(''));
  const [guesses, setGuesses] = useState<Guesses>([]);

  console.log(difficulty);

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    console.log('guesses: ', guesses);
    console.log('current guess: ', currentGuess);
    if (guesses.length === 10) {
      alert('Game Over!');
    }
  }, [guesses, currentGuess]);

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

  function handleNewGameClick() {
    generateRandomNumbers();
    setCurrentGuess(Array(4).fill(''));
    setGuesses([]);
  }

  function handleGuessSubmit(e) {
    e.preventDefault();

    const submittedGuess = [...currentGuess];
    setGuesses((prev) => [...prev, submittedGuess]);
    setCurrentGuess(Array(4).fill(''));
  }

  function renderBoardRows() {
    return (
      <div className="flex flex-col gap-5">
        {guesses.map((guess, i) => (
          <BoardRow key={i} guess={guess} disabled={true} />
        ))}
        <form onSubmit={handleGuessSubmit} className="flex gap-7">
          <BoardRow
            guess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            disabled={false}
          />
          <button
            onClick={handleGuessSubmit}
            className="bg-green-300 text-grey-600 px-4 py-1 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    );

    // <form onSubmit={handleGuessSubmit} key={i} className="flex gap-7">
    //   <UserGuessRow
    //     key={`userGuessRow-${i}`}
    //     guess={guess}
    //     setCurrentGuess={setCurrentGuess}
    //   />
    //   {/* Add a component for current guess, change above component to be presentational of submitted guesses */}
    //   <GameCluesRow key={`gameCluesRow-${i}`} />
    // <button
    //   onClick={handleGuessSubmit}
    //   className="bg-green-300 text-grey-600 px-4 py-1 rounded-md"
    // >
    //   Submit
    // </button>
    // </form>
  }

  // const rows = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div className="flex flex-col items-center gap-5">
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

/**
   function handleNewGameClick() {
    generateRandomNumbers();
    setCurrentGuess(Array(4).fill(''));
    setGuesses([currentGuess]);
  }

  <button
    className="bg-orange-400 text-grey-600 px-4 py-2 rounded-md"
    onClick={handleNewGameClick}
  >
    New Game
  </button>
 */
