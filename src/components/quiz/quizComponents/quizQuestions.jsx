import React, { useEffect, useState } from "react";
import { Button, Skeleton, Typography, Grid } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import { ModalTimeout } from "./Modal";
import { Timer } from "./Timer";

export const QuizQuestions = (props) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userAnswersMarked, setUserAnswersMarked] = useState([]);
  const [progress, setProgress] = useState(1);
  const [answers, setAnswers] = useState([]);
  const { numQuestions, difficulty, timedQuiz, category, categoryNum } = props;
  const [timeLeft, setTimeLeft] = useState(
    timedQuiz ? numQuestions * 10 : null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=" +
          numQuestions +
          "&difficulty=" +
          difficulty +
          "&type=multiple&category=" +
          categoryNum
      );

      const data = await response.json();
      setAllQuestions(data.results);
    };
    fetchQuestions();
  }, [numQuestions, difficulty]);

  useEffect(() => {
    if (allQuestions.length > 0) {
      setAnswers(() => {
        const ans = [
          ...allQuestions[activeQuestion].incorrect_answers,
          allQuestions[activeQuestion].correct_answer,
        ];
        const randomizedAnswers = ans
          .map((answer) => ({ answer, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort);
        return randomizedAnswers;
      });
    }
  }, [allQuestions, activeQuestion]);

  useEffect(() => {
    setUserAnswersMarked(Array(numQuestions).fill(0));
  }, []);

  useEffect(() => {
    if (timedQuiz) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(timer);
            setModalOpen(true); // Open the modal when time reaches 0
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timedQuiz]);

  const onAnswerSelected = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === allQuestions[activeQuestion].correct_answer;
    setSelectedAnswerIndex(() =>
      answers.findIndex((answer) => answer.answer === selectedAnswer)
    );
    const newMarked = [...userAnswersMarked];
    if (isCorrect) {
      newMarked[activeQuestion] = 1;
    } else {
      newMarked[activeQuestion] = 0;
    }
    setUserAnswersMarked(newMarked);
    setOptionsDisabled(true);
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev + 1);
    setProgress((prevProgress) => prevProgress + 1);

    setOptionsDisabled(false);
  };

  const getClass = (option, index) => {
    const corr = allQuestions[activeQuestion].correct_answer;
    if (selectedAnswerIndex == null) {
      return ``;
    }
    if (option !== corr && index === selectedAnswerIndex) {
      return `incorrectAnswer`;
    } else if (option === corr) {
      return `correctAnswer`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card
        sx={{
          width: "35vw",
          height: "35vw",
          minHeight: "400px",
          minWidth: "400px",
          position: "relative",
        }}
      >
        {allQuestions.length > 0 ? (
          <div key={allQuestions[activeQuestion].question}>
            <Grid
              container
              alignItems="baseline"
              justifyContent="space-between"
              sx={{ padding: "2%" }}
            >
              <Grid item>
                <Grid container alignItems="baseline">
                  <Grid item>
                    <Typography variant="h4">{activeQuestion + 1}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="text.secondary">
                      {" / " + numQuestions}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {timedQuiz && (
                <Timer time={timeLeft} totalTime={numQuestions * 10} />
              )}
            </Grid>

            <Typography
              variant="h4"
              sx={{ margin: "10px", fontSize: "max(2vw, 24px)" }}
              dangerouslySetInnerHTML={{
                __html: allQuestions[activeQuestion].question,
              }}
              align="center"
            />

            {answers.map((answer, index) => (
              <Typography
                className={`${getClass(answer.answer, index)} choice`}
                sx={{
                  margin: "10px",
                  pointerEvents: optionsDisabled ? "none" : "auto",
                }}
                key={answer.answer}
                onClick={
                  optionsDisabled ? null : () => onAnswerSelected(answer.answer)
                }
                dangerouslySetInnerHTML={{ __html: answer.answer }}
              />
            ))}
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Stack spacing={0} direction="column">
                  <Skeleton
                    variant="rectangular"
                    width={"30vw"}
                    height={"8vw"}
                  />
                  <Skeleton variant="text" width={"30vw"} height={"5vw"} />
                  <Skeleton variant="text" width={"30vw"} height={"5vw"} />
                  <Skeleton variant="text" width={"30vw"} height={"5vw"} />
                  <Skeleton variant="text" width={"30vw"} height={"5vw"} />
                </Stack>
              </div>
            </div>
          </>
        )}
        {activeQuestion < numQuestions - 1 ? (
          <Grid container justifyContent="flex-end">
            <Button
              onClick={() => {
                onClickNext();
              }}
              color="inherit"
              disabled={selectedAnswerIndex === null}
              sx={{ backgroundColor: "#98b8c7", margin: "2%" }}
            >
              Next
            </Button>
          </Grid>
        ) : (
          ""
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <ProgressBar total={numQuestions} current={progress} />
        </div>

        <ModalTimeout
          modalOpen={
            modalOpen ||
            (activeQuestion === numQuestions - 1 &&
              selectedAnswerIndex !== null)
          }
          timedQuiz={timedQuiz}
          timeLeft={timeLeft}
          details={{
            category: category,
            questions: numQuestions,
            correct: userAnswersMarked.reduce((total, num) => total + num, 0),
            difficulty: difficulty,
            timed: timedQuiz,
            score: Math.round(
              (userAnswersMarked.reduce((total, num) => total + num, 0) * 100) /
                numQuestions
            ),
          }}
        />
      </Card>
    </div>
  );
};
