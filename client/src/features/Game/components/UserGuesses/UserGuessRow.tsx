import UserGuessTile from './UserGuessTile';

export default function UserGuessRow() {
  const tiles = Array.from({ length: 4 }, (_, i) => ({ id: i, value: null }));

  return (
    <div className="flex gap-7 items-center">
      <div className="flex gap-2">
        {tiles.map((_, i) => (
          <div>
            <UserGuessTile key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
