import React, { useState, useContext, useEffect } from "react";
import { BasicSelect } from "./BasicSelect";
import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import { QuizQuestions } from "./quizQuestions";
import "../quiz.css";
import { quizcontext } from "../../../state/quiz/quiz-context";
import { useLocation } from "react-router-dom";

export const BuildQuiz = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timedQuiz, setTimedQuiz] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryNum, setCategoryNum] = useState("");
  const { quizState, quizDispatch } = useContext(quizcontext);

  const location = useLocation();

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Access the query parameters
    const difficulty = queryParams.get("difficulty");
    const category = queryParams.get("category");
    const number = queryParams.get("number");
    const timed = queryParams.get("timed") === "true";
    console.log(timed + " state " + timedQuiz);
    if (difficulty && category && number) {
      const selectedCategory = numVals.find((item) => item.label === category);

      setCategoryNum(selectedCategory.value);
      setCategory(category);
      setDifficulty(difficulty);
      setTimedQuiz(timed);
      console.log(timed + " insidestate " + timedQuiz);
      setNumQuestions(number);
      setStart();
    }
  }, [location]);

  return (
    <>
      {quizState.start ? (
        <QuizQuestions
          numQuestions={numQuestions}
          difficulty={difficulty}
          timedQuiz={timedQuiz}
          categoryNum={categoryNum}
          category={category}
        >
          {console.log(
            numQuestions,
            difficulty,
            timedQuiz,
            category,
            categoryNum
          )}
        </QuizQuestions>
      ) : (
        <div className="select-container">
          <Typography variant="h3" sx={{ fontSize: "max(2.5vw, 35px)" }}>
            Build Your Quiz
          </Typography>
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

          <FormControlLabel
            control={
              <Switch
                checked={timedQuiz}
                onChange={(event) => {
                  setTimedQuiz(event.target.checked);
                }}
              />
            }
            label="Timed Quiz"
            sx={{
              marginRight: "auto",
              paddingLeft: "5%",
              "& .MuiSwitch-thumb": {
                backgroundColor: "white", // Set the desired color for the thumb
              },
              "& .MuiSwitch-track": {
                backgroundColor: "pink", // Set the desired color for the track
              },
              "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                backgroundColor: "#ffbc4b",
              },
            }}
          />
          {console.log("timed: " + timedQuiz)}
          <Button
            onClick={setStart}
            color="inherit"
            disabled={!numQuestions || !difficulty}
            style={{ backgroundColor: "#98b8c7" }}
          >
            Start
          </Button>
        </div>
      )}
    </>
  );
};
