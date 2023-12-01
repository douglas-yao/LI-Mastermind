import BoardRow from './BoardRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RandomNumbers = number[][] | null;
type Guesses = [][];
type GameBoardProps = {
  difficulty: string;
  playerName: string;
};
type Feedback = {
  directMatches: string;
  indirectMatches: string;
  incorrect: string;
  won: boolean;
};

// Guesses logic is handled using arrays and array methods, whereas backend guesses logic is handled with strings

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  // Consider consolidating some state into one big ol' stateful object
  const [solution, setSolution] = useState<RandomNumbers>(null);
  const [currentGuess, setCurrentGuess] = useState<number[]>(Array(4).fill(''));
  const [guesses, setGuesses] = useState<Guesses>([]);
  const [userId, setUserId] = useState<number>(1);
  const [gameId, setGameId] = useState<number | null>(null);
  const [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
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
      setCurrentGuess(Array(4).fill(''));
      setGuesses([]);
      console.log('initiating post request to /game/play');
      const response = await axios.post('http://localhost:3001/game/play', {
        difficulty,
        userId: 1,
      });

      console.log('data from backend: ', response.data);
      const { solution, gameId, startingNumberGuesses } = response.data;
      setSolution(solution);
      setGameId(gameId);
      setGuessesRemaining(startingNumberGuesses);
      setIsFetching(false);
    } catch (error) {
      console.error('Error generating random number:', error);
    }
  }

  async function handleGuessSubmit(e) {
    e.preventDefault();

    try {
      const submittedGuess = currentGuess.join('');
      console.log('guesses from handler: ', guesses);
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess(Array(4).fill(''));

      const response = await axios.post('http://localhost:3001/game/attempt', {
        userId,
        gameId,
        submittedGuess,
        solution,
      });
      console.log('response from submission: ', response);
      const { updatedGuessesRemaining, feedback } = response.data;
      console.log(updatedGuessesRemaining);
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
      <div className="flex flex-col gap-5">
        {guesses.map((guess, i) => (
          <BoardRow
            key={i}
            guess={guess}
            disabled={true}
            feedback={feedback[i]}
          />
        ))}
        <form onSubmit={handleGuessSubmit} className="flex gap-7">
          {solution === null ? null : (
            <div className="flex gap-7">
              <BoardRow
                guess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                disabled={false}
                feedback={null}
              />
              <button
                onClick={handleGuessSubmit}
                className="bg-green-300 text-grey-600 px-4 py-1 rounded-md"
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
      <span>Guesses remaining: {guessesRemaining}</span>
      {renderBoardRows()}
    </div>
  );
}
