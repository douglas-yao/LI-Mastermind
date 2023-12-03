import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

type RandomNumbers = number[][] | null;
type Guesses = string[];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};
type FeedbackResponse = string[];
type IsGameOver = {
  status: boolean;
  message: string;
};

// Guesses logic is handled using arrays and array methods, whereas backend guesses logic is handled with strings

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  // Consider consolidating some state into one big ol' stateful object
  const [solution, setSolution] = useState<RandomNumbers>(null);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Guesses>([]);
  const [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  const [feedback, setFeedback] = useState<FeedbackResponse[]>([]);
  const [isGameOver, setIsGameOver] = useState<IsGameOver>({
    status: false,
    message: '',
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    console.log('feedback: ', feedback);
  }, [feedback]);

  async function handleStartNewGame() {
    try {
      setIsFetching(true);

      const response = await axios.post('http://localhost:3001/game/start', {
        difficulty,
        userId: playerName,
      });

      console.log('data from backend: ', response.data);
      const { currentSolution, guessesRemaining, isGameOver } =
        response.data._gameCache;

      setSolution(currentSolution);
      setGuessesRemaining(guessesRemaining);
      setIsGameOver(isGameOver.status);
      setCurrentGuess('');
      setGuesses([]);
      setFeedback([]);

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
      // const submittedGuess = currentGuess.join('');

      const response = await axios.post('http://localhost:3001/game/update', {
        userId: playerName,
        currentGuess,
        solution,
      });

      console.log('response from submission: ', response);

      const {
        updatedGuessesRemaining,
        feedback,
        updatedGuessHistory,
        isGameOver,
        error,
      } = response.data;

      // Check for errors in the response
      if (response.data.error) {
        console.error('Error submitting guess:', response.data.error);
        alert(`Error submitting guess: ${response.data.error}`);
        return;
      }

      if (error) {
        console.error('Server error:', error);
        alert(`Server error: ${error}`);
        return;
      }

      setGuessesRemaining(updatedGuessesRemaining);
      setIsGameOver(isGameOver);
      setGuesses(updatedGuessHistory);
      setFeedback(feedback);
      setCurrentGuess('');

      if (isGameOver.status === true) {
        console.log(`${feedback.won ? 'You won!' : 'You lost!'}`);
      }
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

  function renderHistory() {
    return (
      <div className={`flex flex-col items-center p-4 `}>
        {guesses.map((guess, i) => (
          <div
            className="flex flex-col gap-2 items-center border-b-2 p-4"
            key={i}
          >
            <span>{guess}</span>
            <span>{feedback[i]?.response}</span>
          </div>
        ))}
      </div>
    );
  }

  function renderGuessInput() {
    return (
      <form onSubmit={handleGuessSubmit} className={`flex gap-7 p-4`}>
        <div className="flex flex-col gap-2 items-center">
          <input
            className="border border-slate-500 py-2 px-4 rounded-lg text-center"
            type="text"
            value={currentGuess}
            onChange={(e) =>
              setCurrentGuess(e.target.value.replace(/\D/, '').slice(0, 4))
            }
          />

          <span>{guessesRemaining} Guesses Remaining</span>
          <button
            onClick={handleGuessSubmit}
            className="bg-green-300 text-grey-600 px-4 py-1 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {renderStartButton()}
      <div className="flex flex-col gap-5 items-center border-b-2 p-4 w-[vw100]">
        <div className="flex flex-col items-center gap-1">
          <span>Player: {playerName}</span>
          <span>Current difficulty: {difficulty}</span>
        </div>
        <p className="flex flex-col gap-1 items-center">
          <span>Guess a combination of four numbers.</span>
          <span>
            Numbers can only range between 0 and 7 inclusive, and numbers can
            repeat.
          </span>
          <span>You have 10 guesses to prove you're a Mastermind.</span>
        </p>
        {/* <span>Current solution: {solution}</span> */}
      </div>
      {guesses.length ? renderHistory() : null}
      {isGameOver.status === true ? (
        <span>{isGameOver.message}</span>
      ) : (
        renderGuessInput()
      )}
    </div>
  );
}
