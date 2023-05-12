import * as React from "react";
import "./quiz.css";
import { BuildQuiz } from "./quizComponents/BuildQuiz";

export const Quiz = () => {
  return (
    <>
      <div className="page">
        <BuildQuiz />
      </div>
    </>
  );
};
