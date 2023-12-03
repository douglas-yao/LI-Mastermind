import './App.css';
import { useState, useEffect } from 'react';
import GameBoard from './features/Game/components/GameBoard/GameBoard';
import Scoreboard from './features/Game/components/Scoreboard/Scoreboard';
import axios from 'axios';

type Score = {
  userId: string;
  totalGuesses: number;
};
type Scores = {
  Easy: Score[];
  Normal: Score[];
  Hard: Score[];
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [difficulty, setDifficulty] = useState('Normal');
  const [scores, setScores] = useState<Scores>();

  useEffect(() => {
    getTopScores();
  }, []);

  function toggleGame() {
    setGameStarted((prevGameStarted) => !prevGameStarted);
    if (!playerName) {
      setPlayerName('Anonymous');
    }
  }

  async function getTopScores() {
    const response = await axios.get(`/scores/`);
    console.log('/scores response: ', response.data);
    // setScores(response.data);
  }

  function renderHomeScreen() {
    return (
      <div>
        <Scoreboard />
      </div>
    );
  }

  function renderContent() {
    if (gameStarted) {
      return <GameBoard difficulty={difficulty} playerName={playerName} />;
    } else {
      return (
        <div className="flex flex-col gap-5 items-center">
          {renderDifficultyButtons()}
          <input
            className="border border-slate-500 rounded-md px-2 py-1"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            onKeyDown={(e) => (e.key === 'Enter' ? e.target.blur() : null)}
          />
          {renderHomeScreen()}
        </div>
      );
    }
  }

  function renderDifficultyButtons() {
    return (
      <div className="flex gap-2">
        <button
          className={`border px-4 py-2 rounded-md ${
            difficulty === 'Easy' && 'font-bold'
          }`}
          onClick={() => setDifficulty('Easy')}
        >
          Easy
        </button>
        <button
          className={`border px-4 py-2 rounded-md ${
            difficulty === 'Normal' && 'font-bold'
          }`}
          onClick={() => setDifficulty('Normal')}
        >
          Normal
        </button>
        <button
          className={`border px-4 py-2 rounded-md ${
            difficulty === 'Hard' && 'font-bold'
          }`}
          onClick={() => setDifficulty('Hard')}
        >
          Hard
        </button>
      </div>
    );
  }

  function renderPlayButton() {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={toggleGame}
      >
        {gameStarted ? 'Home' : 'Play'}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 p-8 mb-12">
      <h1 className="text-xl font-bold">Mastermind</h1>
      {renderPlayButton()}
      {renderContent()}
    </div>
  );
}

export default App;
