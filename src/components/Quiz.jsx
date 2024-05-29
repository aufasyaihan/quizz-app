import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import completeImg from "../assets/quiz-complete.png";
import Questions from "./Questions";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const currQuestion = userAnswers.length;
  const isFinished = currQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (isFinished) {
    return (
      <section id="summary">
        <img src={completeImg} alt="finished quiz" />
        <h2>Quiz Completed</h2>
      </section>
    );
  }

  return (
    <section id="quiz">
      <Questions
        key={currQuestion}
        index={currQuestion}
        onSkip={handleSkipAnswer}
        onSelect={handleSelectAnswer}
      />
    </section>
  );
}
