import './App.css';
import { useState } from 'react';
import GameBoard from './features/Game/GameBoard/components/GameBoard';
import Scoreboard from './features/Game/Scoreboard/components/Scoreboard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const [difficulty, setDifficulty] = useState<string>('Normal');

  function toggleGame() {
    setGameStarted((prevGameStarted) => !prevGameStarted);
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
      return <GameBoard difficulty={difficulty} />;
    } else {
      return (
        <div className="flex flex-col gap-5 items-center">
          {renderDifficultyButtons()}
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
