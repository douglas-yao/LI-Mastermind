type Feedback = {
  response: string;
  won: boolean;
};

type SubmissionFeedbackProps = {
  feedback: Feedback | null;
};

export default function SubmissionFeedback({
  feedback,
}: SubmissionFeedbackProps) {
  const { response, won } = feedback;

  function renderFeedback() {
    return won === true ? (
      <span>You're a mastermind!</span>
    ) : (
      <div>
        <span>{response}</span>
      </div>
    );
  }
  return <div className="flex flex-col">{renderFeedback()}</div>;
}
