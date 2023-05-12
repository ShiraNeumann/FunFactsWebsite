import React, { useState, useContext } from "react";
import { BasicSelect } from "./BasicSelect";
import { Button } from "@mui/material";
import { QuizQuestions } from "./quizQuestions";
import "../quiz.css";
import { quizcontext } from "../../../state/quiz/quiz-context";

export const BuildQuiz = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timedQuiz, setTimedQuiz] = useState("");
  const [category, setCategory] = useState("");
  const [categoryNum, setCategoryNum] = useState("");
  const { quizState, quizDispatch } = useContext(quizcontext);

  const numVals = [
    { value: 27, label: "Animals" },
    { value: 25, label: "Art" },
    { value: 10, label: "Books" },
    { value: 18, label: "Computers" },
    { value: 9, label: "General" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 19, label: "Mathematics" },
    { value: 24, label: "Politics" },
    { value: 17, label: "Science & Nature" },
    { value: 21, label: "Sports" },
  ];

  const setStart = () => {
    quizDispatch({
      type: "START",
    });
  };
  return (
    <>
      {quizState.start ? (
        <QuizQuestions
          numQuestions={numQuestions}
          difficulty={difficulty}
          timedQuiz={timedQuiz == "Yes" ? true : false}
          categoryNum={categoryNum}
          category={category}
        />
      ) : (
        <div className="select-container">
          <BasicSelect
            title="Number of Questions"
            options={[5, 10, 15, 20]}
            value={numQuestions}
            onChange={(selectedValue) => {
              setNumQuestions(selectedValue);
            }}
          />

          <BasicSelect
            title="Difficulty Level"
            options={["easy", "medium", "hard"]}
            value={difficulty}
            onChange={(selectedValue) => {
              setDifficulty(selectedValue);
            }}
          />

          <BasicSelect
            title="Category"
            options={numVals.map((item) => item.label)}
            onChange={(selectedLabel) => {
              const selectedItem = numVals.find(
                (item) => item.label === selectedLabel
              );
              setCategoryNum(selectedItem.value);
              setCategory(selectedItem.label);
            }}
          />

          <BasicSelect
            title="Timed Quiz"
            options={["Yes", "No"]}
            value={timedQuiz}
            onChange={(selectedValue) => {
              setTimedQuiz(selectedValue);
            }}
          />
          <Button
            onClick={setStart}
            disabled={!numQuestions || !difficulty || !timedQuiz}
          >
            Start Quiz
          </Button>
        </div>
      )}
    </>
  );
};
