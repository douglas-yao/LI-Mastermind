import { useState, FormEvent } from 'react';
import axios from 'axios';
import {
  GameBoardProps,
  FeedbackResponse,
  IsGameOver,
  Difficulty,
} from '../../types/types';

export default function GameBoard({ difficulty, playerName }: GameBoardProps) {
  // Consider consolidating some state into one big ol' stateful object that can simply be set to the backend's DTO
  const [solution, setSolution] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  const [feedback, setFeedback] = useState<FeedbackResponse[]>([]);
  const [isGameOver, setIsGameOver] = useState<IsGameOver>({
    status: false,
    message: '',
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /**
   * Initiates a new game by sending a POST request to the server with the provided user ID and difficulty level.
   * Receives a response object with a randomized solution, number of guesses remaining, and end-of-game data.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   * @throws {Error} If there's an issue generating the random number.
   */
  async function handleStartNewGame() {
    try {
      // Set the loading state to true
      setIsFetching(true);

      // Make a POST request to the server to initiate a new game with user ID and difficulty level
      const response = await axios.post('http://localhost:8080/game/start', {
        difficulty,
        userId: playerName,
      });

      // Log the data received from the backend
      console.log('data from backend: ', response.data);

      // Destructure the relevant data from the response
      const {
        currentSolution,
        guessesRemaining,
        guessHistory,
        feedbackHistory,
        isGameOver,
      } = response.data._gameCache;

      // Update the local state with the received data
      setSolution(currentSolution);
      setGuessesRemaining(guessesRemaining);
      setIsGameOver(isGameOver.status);
      setGuesses(guessHistory);
      setFeedback(feedbackHistory);
      setCurrentGuess('');

      // Set the loading state to false
      setIsFetching(false);
    } catch (error) {
      // Log an error if there's an issue generating the random number
      console.error('Error generating random number:', error);
      throw error;
    }
  }

  /**
   * Handles the submission of a player's guess by sending a POST request to the server.
   * Updates local state with the response data, including feedback on the guess.
   *
   * @async
   * @function
   * @param {FormEvent} e - The form event triggering the guess submission.
   * @returns {Promise<void>}
   * @throws {Error} If there's an issue submitting the guess.
   */
  async function handleGuessSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      // Make a POST request to the server to update the game with the player's guess
      const response = await axios.post('http://localhost:8080/game/update', {
        userId: playerName,
        currentGuess,
        solution,
      });

      // Log the response data for debugging
      console.log('response from submission: ', response);

      // Destructure relevant data from the response
      const {
        updatedGuessesRemaining,
        feedback,
        updatedGuessHistory,
        isGameOver,
        error,
      } = response.data;

      // Check for errors in the response and display an alert if needed
      if (error) {
        console.error('Error submitting guess:', error);
        alert(`Error submitting guess: ${error}`);
        return;
      }

      // Update local state with the received data
      setGuessesRemaining(updatedGuessesRemaining);
      setIsGameOver(isGameOver);
      setGuesses(updatedGuessHistory);
      setFeedback(feedback);
      setCurrentGuess('');
    } catch (error) {
      // Log an error if there's an issue submitting the guess
      console.error('Error occurred submitting an attempt: ', error);
      throw error;
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
              className="flex flex-col gap-1 items-center border-b-2 p-4"
              key={i}
            >
              <span className="text-xl">{guess}</span>
              <span className="text-slate-700">{feedback[i]?.response}</span>
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
          <span>Current difficulty: {difficulty.level}</span>
        </div>
        <p className="flex flex-col gap-1 items-center">
          <span>
            Guess four numbers. Each number can be one of 7 numbers from 0 to 7
            (potential repeats).
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
      {!feedback[feedback.length - 1]?.won && (
        <span className="text-slate">{isGameOver.message}</span>
      )}
    </div>
  );
}
