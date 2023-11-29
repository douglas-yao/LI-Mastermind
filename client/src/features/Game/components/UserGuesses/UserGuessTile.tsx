export default function UserGuessTile() {
  return (
    <div>
      <input
        className="border border-blue-400 p-2 rounded-full flex items-center justify-center w-12 h-12 text-center"
        type="text"
        maxLength={1}
        pattern="[0-7]"
      />
    </div>
  );
}
