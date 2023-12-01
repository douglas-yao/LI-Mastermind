import BoardRow from './BoardRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[][];
type Guesses = number[];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  const [solution, setSolution] = useState<RandomNumbers>([]);
  const [currentGuess, setCurrentGuess] = useState<number[]>(Array(4).fill(''));
  const [guesses, setGuesses] = useState<Guesses>([]);
  const [userId, setUserId] = useState<number>(1);
  const [gameId, setGameId] = useState<number | null>(null);
  const [guessesTaken, setGuessesTaken] = useState<number | null>(null);

  // useEffect(() => {
  //   startNewGame();
  // }, []);

  useEffect(() => {
    console.log('guesses: ', guesses);
  }, [guesses]);

  async function handleStartNewGame() {
    try {
      setCurrentGuess(Array(4).fill(''));
      setGuesses([]);
      const response = await axios.post('http://localhost:3001/game/play', {
        difficulty,
        userId: 1,
      });

      console.log('data from backend: ', response.data);
      const { solution, gameId, guessesTaken } = response.data;
      setSolution(solution);
      setGameId(gameId);
      setGuessesTaken(guessesTaken);
    } catch (error) {
      console.error('Error generating random number:', error);
    }
  }

  // async function handleNewGameClick() {
  //   await handleStartNewGame();
  //   setCurrentGuess(Array(4).fill(''));
  //   setGuesses([]);
  // }

  async function handleGuessSubmit(e) {
    e.preventDefault();

    try {
      const submittedGuess = currentGuess.join('');
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess(Array(4).fill(''));

      const response = await axios.post('http://localhost:3001/game/attempt', {
        userId,
        gameId,
        submittedGuess,
      });
    } catch (error) {
      console.error('Error occurred submitting an attempt: ', error);
    }
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
        onClick={handleStartNewGame}
      >
        New Game
      </button>
      <span>Player: {playerName}</span>
      <span>Current difficulty: {difficulty}</span>
      <span>Current solution: {solution}</span>
      <span>Guesses left: {10 - guessesTaken}</span>
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
