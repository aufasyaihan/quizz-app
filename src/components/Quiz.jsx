import { useCallback, useState } from "react";
import questions from "../questions";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const currQuestion = userAnswers.length;
  const isFinished = currQuestion === questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

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
          return (
            <li className="answer" key={index}>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
