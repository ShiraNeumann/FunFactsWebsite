import { React, useContext } from "react";
import { quizcontext } from "../../state/quiz/quiz-context";
import { Typography } from "@mui/material";
export function Statistics() {
  const { quizState } = useContext(quizcontext);
  return (
    <div>
      {quizState.quizDetails.map((quiz, index) => (
        <div key={index}>
          <br />
          <h3>Quiz {index + 1}</h3>
          <p>Category: {quiz.category}</p>

          <p>Score: {Math.round((quiz.correct * 100) / quiz.questions)}</p>

          <p>Total questions: {quiz.questions}</p>
          <p>Correct questions: {quiz.correct}</p>
          <p>Inorrect questions: {quiz.questions - quiz.correct}</p>
          <p>Difficulty: {quiz.difficulty}</p>

          <p>Timed: {quiz.timed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}
