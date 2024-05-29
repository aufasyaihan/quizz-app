import completeImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  return (
    <section id="summary">
      <img src={completeImg} alt="finished quiz" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">10%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">10%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">10%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let style = "user-answer";
            if(answer === null) {
                style += " skipped";
            } else if(answer === QUESTIONS[index].answers[0]) {
                style += " correct";
            } else {
                style += " wrong";
            }
          return (
            <li key={answer}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={style}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
