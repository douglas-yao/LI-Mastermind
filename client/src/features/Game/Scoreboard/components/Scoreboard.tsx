import { useState, useEffect } from 'react';
import axios from 'axios';
import { Score } from '../../types/types';

export default function Scoreboard() {
  // Array of difficulty levels
  const difficulties = ['Easy', 'Normal', 'Hard'];

  // State for the selected difficulty index and the fetched scores
  const [difficultyIndex, setDifficultyIndex] = useState<number>(1); // Start with 'Normal'
  const [scores, setScores] = useState<Score[]>([]);

  // Effect to fetch scores whenever the difficulty index changes
  useEffect(() => {
    getTopScores(difficulties[difficultyIndex]);
  }, [difficultyIndex]);

  // Function to fetch top scores for a specific difficulty
  async function getTopScores(selectedDifficulty: string) {
    try {
      // Fetch scores from the server
      const response = await axios.post(`http://localhost:8080/scores/`, {
        difficulty: selectedDifficulty,
      });

      // Update the scores state with the fetched data
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching top scores:', error);
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

  return (
    // Render buttons, the current difficulty selected, and corresponding table of players and scores
    <div className="max-w-screen-md mx-auto p-4">
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
      {scores && difficulties[difficultyIndex] ? (
        <table className="min-w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Player Name</th>
              <th className="py-2 px-4 border">Guesses Taken</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => (
              <tr key={i} className="border">
                <td className="py-2 px-4 border">{score.userId}</td>
                <td className="py-2 px-4 border">{score.guessesTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Display a message if there are no scores for the current difficulty
        <p className="text-red-500">
          No scores available for {difficulties[difficultyIndex]} difficulty.
        </p>
      )}
    </div>
  );
}
