import { useState, useEffect } from 'react';
import axios from 'axios';
import { Score } from '../../types/types';

export default function Scoreboard() {
  // Array of difficulty levels
  const difficulties = ['Easy', 'Normal', 'Hard'];

  // State for the selected difficulty index and the fetched scores
  const [difficultyIndex, setDifficultyIndex] = useState<number>(1); // Start with 'Normal'
  const [scores, setScores] = useState<Score[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Effect to fetch scores whenever the difficulty index changes
  useEffect(() => {
    // When the difficulty index changes, fetch scores
    getTopScores(difficulties[difficultyIndex]);
  }, [difficultyIndex]);

  // Function to fetch top scores for a specific difficulty
  async function getTopScores(selectedDifficulty: string) {
    try {
      // Set isFetching to true while fetching
      setIsFetching(true);

      // Fetch scores from the server
      const response = await axios.post(`http://localhost:8080/scores/`, {
        difficulty: selectedDifficulty,
      });
      console.log(response.data);
      // Update the scores state with the fetched data
      setScores(response.data);

      // Set isFetching to false after fetching
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching top scores:', error);

      // Set isFetching to false in case of an error
      setIsFetching(false);
    }
  }

  // Function to handle arrow clicks for changing difficulty
  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setDifficultyIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else {
      setDifficultyIndex((prevIndex) =>
        prevIndex < difficulties.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  // Function to format seconds into a readable time format
  const formatTime = (seconds: number | undefined): string => {
    if (typeof seconds !== 'number') {
      return 'No time recorded';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  // Function to render the header and arrow buttons that dynamically change the rendered table
  function renderHeader() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Top Ten Masterminds
        </h1>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleArrowClick('prev')}
          >
            {'<'}
          </button>
          <span className="text-xl font-semibold">
            {difficulties[difficultyIndex]}
          </span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleArrowClick('next')}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }

  // Render a scoreboard based on stored values in state
  function renderScoreBoard() {
    return (
      <div className="max-w-screen-md mx-auto p-4 text-center">
        {isFetching ? (
          <p>Loading...</p>
        ) : !scores.length ? (
          <p className="text-center">No scores to display</p>
        ) : (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Player Name</th>
                <th className="py-2 px-4 border">Guesses Taken</th>
                <th className="py-2 px-4 border">Elapsed Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, i) => (
                <tr key={i} className="border">
                  <td className="py-2 px-4 border">{score.userId}</td>
                  <td className="py-2 px-4 border">{score.guessesTaken}</td>
                  <td className="py-2 px-4 border">
                    {formatTime(score.timeElapsed)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      {renderHeader()}
      {renderScoreBoard()}
    </div>
  );
}
