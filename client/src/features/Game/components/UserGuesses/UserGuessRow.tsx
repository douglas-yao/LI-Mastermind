import UserGuessTile from './UserGuessTile';

export default function UserGuessRow({ guess, setCurrentGuess, disabled }) {
  function handleCurrentGuessRowUpdate(e, i) {
    setCurrentGuess((prev) => {
      const updatedGuessRow = [...prev];
      const updatedGuessTile = e.target.value;
      updatedGuessRow[i] = updatedGuessTile;
      return updatedGuessRow;
    });
  }

  return (
    <div className="flex gap-7 items-center">
      <div className="flex gap-2">
        {guess.map((num, i) => (
          <div key={`userGuessTile-${i}`}>
            <UserGuessTile
              value={num}
              index={i}
              setCurrentGuess={setCurrentGuess}
              disabled={disabled}
              onChange={handleCurrentGuessRowUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
