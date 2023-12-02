import BoardRow from './BoardRow';
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

type RandomNumbers = number[][] | null;
type Guesses = string[][];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};
type Feedback = {
  response: string;
  won: boolean;
};

// Guesses logic is handled using arrays and array methods, whereas backend guesses logic is handled with strings

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  // Consider consolidating some state into one big ol' stateful object
  const [solution, setSolution] = useState<RandomNumbers>(null);
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(4).fill(''));
  const [guesses, setGuesses] = useState<Guesses>([]);
  const [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // useEffect(() => {
  //   startNewGame();
  // }, []);

  useEffect(() => {
    console.log('guesses: ', guesses);
  }, [guesses]);

  async function handleStartNewGame() {
    try {
      setIsFetching(true);
      setGameFinished(false);
      setCurrentGuess(Array(4).fill(''));
      setGuesses([]);
      setFeedback([]);
      console.log('initiating post request to /game/play');
      const response = await axios.post('http://localhost:3001/game/play', {
        difficulty,
        userId: playerName,
      });

      console.log('data from backend: ', response.data);
      const { solution, startingNumberGuesses } = response.data;
      setSolution(solution);
      setGuessesRemaining(startingNumberGuesses);
      setIsFetching(false);
    } catch (error) {
      console.error('Error generating random number:', error);
    }
  }

  async function handleGuessSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      console.log('current guess: ', currentGuess, typeof currentGuess);
      if (currentGuess.some((elem) => elem === '')) {
        console.error('Unable to submit fewer than 4 guesses!');
        alert('Must submit all four guesses!');
        return;
      }
      const submittedGuess = currentGuess.join('');
      console.log('guesses from handler: ', guesses);
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess(Array(4).fill(''));

      const response = await axios.post('http://localhost:3001/game/attempt', {
        userId: playerName,
        submittedGuess,
        solution,
      });
      console.log('response from submission: ', response);
      const { updatedGuessesRemaining, feedback } = response.data;
      console.log(updatedGuessesRemaining);
      if (feedback.won === true || updatedGuessesRemaining === 0) {
        setGameFinished(true);
      }
      setGuessesRemaining(updatedGuessesRemaining);
      setFeedback((prev) => [...prev, feedback]);
    } catch (error) {
      console.error('Error occurred submitting an attempt: ', error);
    }
  }

  function renderStartButton() {
    if (isFetching === true) {
      return (
        <button
          className="bg-orange-400 text-grey-600 px-4 py-2 rounded-md"
          disabled={true}
        >
          Loading...
        </button>
      );
    } else {
      return (
        <button
          className="bg-orange-400 text-grey-600 px-4 py-2 rounded-md"
          onClick={handleStartNewGame}
        >
          {solution === null ? 'Start' : 'New Game'}
        </button>
      );
    }
  }

  function renderBoardRows() {
    return (
      <div className="flex flex-col gap-8 items-center border-t-2 p-4">
        {guesses.map((guess, i) => (
          <BoardRow
            key={i}
            guess={guess}
            disabled={true}
            feedback={feedback[i]}
          />
        ))}
        <form
          onSubmit={handleGuessSubmit}
          className="flex gap-7 border-t-2 p-4"
        >
          {solution === null || gameFinished ? null : (
            <div className="flex flex-col gap-2 items-center">
              <BoardRow
                guess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                disabled={false}
                feedback={null}
              />
              <span>{guessesRemaining} Guesses Remaining</span>
              <button
                onClick={handleGuessSubmit}
                className="bg-green-300 text-grey-600 px-4 py-1 rounded-md w-full"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {renderStartButton()}
      <span>Player: {playerName}</span>
      <span>Current difficulty: {difficulty}</span>
      <span>Current solution: {solution}</span>
      {renderBoardRows()}
    </div>
  );
}
