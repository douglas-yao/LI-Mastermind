import { useState, FormEvent } from 'react';
import axios from 'axios';

// modularize types

type Guesses = string[];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};
type FeedbackResponse = {
  response: string;
  won: boolean;
};
type IsGameOver = {
  status: boolean;
  message: string;
};

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  // Consider consolidating some state into one big ol' stateful object that can simply be set to the backend's DTO
  const [solution, setSolution] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Guesses>([]);
  const [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  const [feedback, setFeedback] = useState<FeedbackResponse[]>([]);
  const [isGameOver, setIsGameOver] = useState<IsGameOver>({
    status: false,
    message: '',
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

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

  async function handleGuessSubmit(e: FormEvent) {
    e.preventDefault();

    try {
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

      if (error) {
        console.error('Error submitting guess:', error);
        alert(`Error submitting guess: ${error}`);
        return;
      }

      setGuessesRemaining(updatedGuessesRemaining);
      setIsGameOver(isGameOver);
      setGuesses(updatedGuessHistory);
      setFeedback(feedback);
      setCurrentGuess('');
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
    if (guesses.length) {
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
  }

  function renderGuessInput() {
    if (!isGameOver.status && solution !== '') {
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
  }

  function renderGameHeader() {
    return (
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
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {renderStartButton()}
      {renderGameHeader()}
      {renderHistory()}
      {renderGuessInput()}
      {!feedback[feedback.length - 1]?.won && isGameOver.message}
    </div>
  );
}
