import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import Card from "@mui/material/Card";
import { ModalTimeout } from "./Modal";
export const QuizQuestions = (props) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userAnswersMarked, setUserAnswersMarked] = useState([]);
  const [progress, setProgress] = useState(1);
  const [answers, setAnswers] = useState([]);
  const { numQuestions, difficulty, timedQuiz, category, categoryNum } = props;
  const [timeLeft, setTimeLeft] = useState(
    props.timedQuiz ? numQuestions * 10 : null
  );
  const [modalOpen, setModalOpen] = useState(false);

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

  //TO DO FIX TIMEOUT WHEN MODAL IS OPEN
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
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev + 1);
    setProgress((prevProgress) => prevProgress + 1);
  };

  const onClickFinish = () => {
    //send to results page
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div>
      <Card>
        {allQuestions.length > 0 && (
          <div key={allQuestions[activeQuestion].question}>
            <Typography variant="h2">
              Question {activeQuestion + 1 + " / " + numQuestions}
            </Typography>
            <Typography
              sx={{ margin: "10px" }}
              dangerouslySetInnerHTML={{
                __html: allQuestions[activeQuestion].question,
              }}
            ></Typography>

            {timedQuiz && formatTime(timeLeft)}

            {answers.map((answer, index) => (
              <Typography
                className={`${
                  selectedAnswerIndex === index ? "selectedAnswer" : ""
                } choice`}
                sx={{ margin: "10px" }}
                key={answer.answer}
                onClick={() => onAnswerSelected(answer.answer)}
                dangerouslySetInnerHTML={{ __html: answer.answer }}
              ></Typography>
            ))}
          </div>
        )}
        {activeQuestion < numQuestions - 1 ? (
          <Button
            onClick={() => {
              onClickNext();
            }}
            color="inherit"
            disabled={selectedAnswerIndex === null}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => {
              onClickFinish();
            }}
            color="inherit"
            disabled={selectedAnswerIndex === null}
          >
            Finish
          </Button>
        )}
        <ProgressBar total={numQuestions} current={progress} />
        <ModalTimeout
          modalOpen={
            (timedQuiz && modalOpen) || activeQuestion + 1 === numQuestions
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
