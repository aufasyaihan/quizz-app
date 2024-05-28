import { useState } from "react";
import questions from "../questions";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const currQuestion = userAnswers.length;

  function handleSelectAnswer(selectedAnswer){
    setUserAnswers(prevUserAnswers => {
        return [...prevUserAnswers, selectedAnswer]
    })
    console.log(userAnswers);
  }
  return (
    <section id="quiz">
      <div id="question">
        <progress value={50} max={100} />
        <h2>{questions[currQuestion].text}</h2>
      </div>
      <ul id="answers">
        {questions[currQuestion].answers.map((answer, index) => {
          return (
            <li className="answer" key={index}>
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
