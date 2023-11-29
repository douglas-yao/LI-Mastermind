import './App.css';
import { useState } from 'react';
import GameBoard from './features/Game/components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function toggleGame() {
    gameStarted ? setGameStarted(false) : setGameStarted(true);
  }

  function renderGameBoard() {
    if (gameStarted) {
      return <GameBoard />;
    } else {
      return <div>Scoreboard here</div>;
    }
  }

  function renderPlayButton() {
    if (gameStarted) {
      return <button onClick={toggleGame}>Quit Game</button>;
    } else {
      return <button onClick={toggleGame}>Play!</button>;
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="text-xl font-bold">Mastermind</h1>
      {renderPlayButton()}
      {renderGameBoard()}
    </div>
  );
}

export default App;
