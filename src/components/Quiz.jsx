import { useCallback, useState } from "react";
import questions from "../questions";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const currQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isFinished = currQuestion === questions.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === questions[currQuestion].answers[0]) {
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
      <div id="question">
        <QuestionTimer
          key={currQuestion} // remount the component when currQuestion changes
          time={15000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{questions[currQuestion].text}</h2>
      </div>
      <Answers
        key={currQuestion} // remount the component when currQuestion changes
        answer={questions[currQuestion].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answersState={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </section>
  );
}
