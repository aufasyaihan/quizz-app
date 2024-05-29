import { useRef } from "react";

export default function Answers({
  answer,
  selectedAnswer,
  answersState,
  onSelectAnswer,
}) {
  const shuffledAnswer = useRef();
  if (!shuffledAnswer.current) {
    shuffledAnswer.current = [...answer].sort(() => Math.random() - 0.5); // randomize the order of the answers
  }
  return (
    <ul id="answers">
      {shuffledAnswer.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        let style = "";

        if (answersState === "answered" && isSelected) {
          style = "selected";
        } else if (
          (answersState === "correct" || answersState === "wrong") &&
          isSelected
        ) {
          style = answersState;
        }

        return (
          <li className="answer" key={index}>
            <button
              onClick={() => onSelectAnswer(answer)}
              className={style}
              disabled={answersState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
