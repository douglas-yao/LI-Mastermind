import UserGuessTile from './UserGuessTile';

export default function UserGuessRow({ guess, setCurrentGuess }) {
  // const tiles = Array.from({ length: 4 }, (_, i) => ({ id: i, value: null }));

  return (
    <div className="flex gap-7 items-center">
      <div className="flex gap-2">
        {guess.map((num, i) => (
          <div key={`userGuessTile-${i}`}>
            <UserGuessTile num={num} setCurrentGuess={setCurrentGuess} />
          </div>
        ))}
      </div>
    </div>
  );
}
