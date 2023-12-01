type Feedback = {
  directMatches: string;
  indirectMatches: string;
  incorrect: string;
  won: boolean;
};

type SubmissionFeedbackProps = {
  feedback: Feedback | null;
};

export default function SubmissionFeedback({
  feedback,
}: SubmissionFeedbackProps) {
  const {
    directMatches = '',
    indirectMatches = '',
    incorrect = '',
    won,
  } = feedback;

  function renderFeedback() {
    return won === true ? (
      <span>'You\'re a mastermind!'</span>
    ) : (
      <div>
        <span>{directMatches}</span>
        <span>{indirectMatches}</span>
        <span>{incorrect}</span>
      </div>
    );
  }
  return <div className="flex flex-col">{renderFeedback()}</div>;
}
