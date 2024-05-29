import completeImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
    const skippedAnswer = userAnswers.filter((answer) => answer === null);
    const correctAnswer = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedAnswerPercentage = Math.round(skippedAnswer.length / userAnswers.length * 100);
    const correctAnswerPercentage = Math.round(correctAnswer.length / userAnswers.length * 100);
    const incorrectAnswerPercentage = 100 - skippedAnswerPercentage - correctAnswerPercentage;
  return (
    <section id="summary">
      <img src={completeImg} alt="finished quiz" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectAnswerPercentage}%</span>
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
            <li key={index}>
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
