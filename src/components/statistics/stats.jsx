import React, { useContext } from "react";
import { quizcontext } from "../../state/quiz/quiz-context";
import { Grid, Typography, ThemeProvider, createTheme } from "@mui/material";
import "./stats.css";
import { QuizDetails } from "./quizDetails";
import { AverageProgress } from "./progressAverage";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
export function Statistics() {
  const { quizState } = useContext(quizcontext);
  const numQuizzes = quizState.quizDetails.length;

  const getCategoryAverageScore = (category) => {
    const quizzesInCategory = quizState.quizDetails.filter(
      (quiz) => quiz.category === category
    );
    const totalPercentages = quizzesInCategory.reduce(
      (accumulator, quiz) => accumulator + quiz.score,
      0
    );
    const averageScore = totalPercentages / quizzesInCategory.length;

    return isNaN(averageScore) ? 0 : Math.round(averageScore);
  };
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu", "sans - serif"].join(","),
    },
  });

  const handleTakeQuiz = () => {
    navigate(`/quiz`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="page">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h2"
              sx={{ marginLeft: "10%", fontSize: "max(4vw, 24px)" }}
            >
              Quiz History
            </Typography>
            {quizState.quizDetails.map((quiz, index) => (
              <QuizDetails
                key={index}
                quiznumber={index + 1}
                category={quiz.category}
                score={Math.round((quiz.correct * 100) / quiz.questions)}
                totalQ={quiz.questions}
                correct={quiz.correct}
                incorrect={quiz.questions - quiz.correct}
                difficulty={quiz.difficulty}
                timed={quiz.timed}
              />
            ))}
          </Grid>
          <>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h2"
                sx={{ marginLeft: "5%", fontSize: "max(4vw, 24px)" }}
              >
                Averages
              </Typography>
              <Grid container spacing={2}>
                {Array.from(
                  new Set(quizState.quizDetails.map((quiz) => quiz.category))
                ).map((category) => (
                  <Grid item xs={12} key={category}>
                    <AverageProgress
                      category={category}
                      average={getCategoryAverageScore(category)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
          )
        </Grid>
        {numQuizzes === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h2" align="center">
              You have no quizzes.
              <br />
              Take one{" "}
              <Link
                onClick={handleTakeQuiz}
                underline="none"
                color="inherit"
                sx={{
                  "&:hover": {
                    color: "#f37ba3",
                  },
                }}
              >
                now!
              </Link>
            </Typography>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
