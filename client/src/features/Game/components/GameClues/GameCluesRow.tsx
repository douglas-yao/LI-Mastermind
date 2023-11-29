import GameCluesTile from './GameCluesTile';

export default function GameCluesRow() {
  const tiles = Array.from({ length: 4 }, (_, i) => ({ id: i, value: null }));

  return (
    <div className="flex gap-7 items-center">
      <div className="flex gap-2">
        {tiles.map((_, i) => (
          <div key={`gameCluesTile-${i}`}>
            <GameCluesTile />
          </div>
        ))}
      </div>
    </div>
  );
}
