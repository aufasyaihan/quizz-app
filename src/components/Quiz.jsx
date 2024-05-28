import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import completeImg from "../assets/quiz-complete.png";
import Questions from "./Questions";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const currQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isFinished = currQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[currQuestion].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [currQuestion]
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
        currQuestion={currQuestion}
        questionText={QUESTIONS[currQuestion].text}
        questionAnswer={QUESTIONS[currQuestion].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkip={handleSkipAnswer}
        onSelect={handleSelectAnswer}
      />
    </section>
  );
}
