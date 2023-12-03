import BoardRow from './BoardRow';
import { useState, FormEvent } from 'react';
import axios from 'axios';

type RandomNumbers = number[][] | null;
type Guesses = string[][];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};
type FeedbackResponse = {
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
  const [feedback, setFeedback] = useState<FeedbackResponse[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function handleStartNewGame() {
    try {
      setIsFetching(true);
      setGameFinished(false);
      setCurrentGuess(Array(4).fill(''));
      setGuesses([]);
      setFeedback([]);
      const response = await axios.post('http://localhost:3001/game/start', {
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

  // if (currentGuess.some((elem) => elem === '')) {
  //   console.error('Unable to submit fewer than 4 guesses!');
  //   alert('Must submit all four guesses!');
  //   return;
  // }
  async function handleGuessSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const submittedGuess = currentGuess.join('');

      const response = await axios.post('http://localhost:3001/game/update', {
        userId: playerName,
        submittedGuess,
        solution,
      });

      console.log('response from submission: ', response);

      // Check for errors in the response
      if (response.data.error) {
        console.error('Error submitting guess:', response.data.error);
        alert(`Error submitting guess: ${response.data.error}`);
        return;
      }

      const { updatedGuessesRemaining, feedback, error } = response.data;

      if (error) {
        console.error('Server error:', error);
        alert(`Server error: ${error}`);
        return;
      }

      if (feedback.won === true || updatedGuessesRemaining === 0) {
        setGameFinished(true);
      }

      setGuessesRemaining(updatedGuessesRemaining);
      setFeedback((prev) => [...prev, feedback]);
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess(Array(4).fill(''));
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
      <div className={`flex flex-col gap-8 items-center p-4 `}>
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
          className={`flex gap-7 p-4 ${guesses.length ? 'border-t-2' : ''}`}
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
      <div className="flex flex-col gap-2 items-center border-b-2 p-4 w-[vw100]">
        <span>Player: {playerName}</span>
        <span>Current difficulty: {difficulty}</span>
        {/* <span>Current solution: {solution}</span> */}
      </div>
      {renderBoardRows()}
    </div>
  );
}
