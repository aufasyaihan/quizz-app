import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Questions({
  questionText,
  questionAnswer,
  selectedAnswer,
  answerState,
  onSkip,
  onSelect,
}) {
  return (
    <div id="question">
      <QuestionTimer time={15000} onTimeout={onSkip} />
      <h2>{questionText}</h2>
      <Answers
        answer={questionAnswer}
        selectedAnswer={selectedAnswer}
        answersState={answerState}
        onSelectAnswer={onSelect}
      />
    </div>
  );
}
