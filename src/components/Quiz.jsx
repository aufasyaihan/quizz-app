import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Questions from "./Questions";
import Summary from "./Summary.jsx";

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
      <Summary userAnswers={userAnswers}/>
    );
  }

  return (
    <section id="quiz">
      <Questions
        key={currQuestion} // remount the component every changes in currQuestion
        index={currQuestion}
        onSkip={handleSkipAnswer}
        onSelect={handleSelectAnswer}
      />
    </section>
  );
}
