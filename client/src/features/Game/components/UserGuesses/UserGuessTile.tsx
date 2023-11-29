export default function UserGuessTile({ num, setCurrentGuess }) {
  return (
    <div>
      <input
        className="border border-blue-400 p-2 rounded-full items-center justify-center w-12 h-12 text-center"
        type="text"
        maxLength={1}
        pattern="[0-7]"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}
