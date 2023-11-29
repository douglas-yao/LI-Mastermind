export default function UserGuessTile({
  setCurrentGuess,
  value,
  index,
  onChange,
  disabled,
}) {
  return (
    <div>
      <input
        className="border border-blue-400 p-2 rounded-full items-center justify-center w-12 h-12 text-center"
        type="text"
        maxLength={1}
        pattern="[0-7]"
        onChange={(e) => onChange(e, index)}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
