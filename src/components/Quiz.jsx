import { useCallback, useState } from "react";
import questions from "../questions";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

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

  const shuffledAnswer = [...questions[currQuestion].answers].sort(
    () => Math.random() - 0.5
  ); // randomize the order of the answers

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
      <ul id="answers">
        {shuffledAnswer.map((answer, index) => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer;
          let style = "";

          if (answerState === "answered" && isSelected) {
            style = "selected";
          } else if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            style = answerState;
          }

          return (
            <li className="answer" key={index}>
              <button
                onClick={() => handleSelectAnswer(answer)}
                className={style}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
