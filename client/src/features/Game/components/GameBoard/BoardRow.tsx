// import UserGuessRow from '../UserGuesses/UserGuessRow';
// import SubmissionFeedback from '../GameClues/SubmissionFeedback';

// type Feedback = {
//   response: string;
//   won: boolean;
// };

// type BoardRowProps = {
//   guess: string[];
//   setCurrentGuess?: React.Dispatch<React.SetStateAction<string[]>>;
//   disabled: boolean;
//   feedback: Feedback | null;
// };

// export default function BoardRow({
//   guess,
//   setCurrentGuess,
//   disabled,
//   feedback,
// }: BoardRowProps) {
//   // console.log('guess: ', guess);

//   // function handleCurrentGuessUpdate() {
//   //   null;
//   // }
//   return (
//     <div className="flex flex-col items-center gap-2">
//       <UserGuessRow
//         guess={guess}
//         setCurrentGuess={setCurrentGuess}
//         disabled={disabled}
//       />
//       {/* <GameCluesRow /> */}
//       {feedback ? <SubmissionFeedback feedback={feedback} /> : null}
//     </div>
//   );
// }
