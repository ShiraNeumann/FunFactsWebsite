import React, { useContext } from "react";
import { quizcontext } from "../../state/quiz/quiz-context";
import {
  Grid,
  Typography,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./stats.css";
import { QuizDetails } from "./quizDetails";
import { SkeletonQuiz } from "./skeleton";
import { AverageProgress } from "./progressAverage";
import Skeleton from "@mui/material/Skeleton";

export function Statistics() {
  const { quizState } = useContext(quizcontext);
  const numQuizzes = quizState.quizDetails.length;
  const numSkeletons = Math.max(2 - numQuizzes, 0);
  const numCategories = Array.from(
    new Set(quizState.quizDetails.map((quiz) => quiz.category))
  ).length;
  const numAverageSkeletons = Math.max(2 - numCategories, 0);

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

  const theme = createTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <div className="page">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h2" sx={{ marginLeft: "10%" }}>
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
                difficulty={
                  quiz.difficulty.charAt(0).toUpperCase() +
                  quiz.difficulty.slice(1)
                }
                timed={quiz.timed ? "Yes" : "No"}
              />
            ))}
            {[...Array(numSkeletons)].map((_, index) => (
              <SkeletonQuiz
                key={index}
                variant="rectangular"
                height={118}
                sx={{ padding: "5%" }}
              />
            ))}
          </Grid>
          {!isSmallScreen && (
            <>
              <Grid item xs={12} sm={4}>
                <Typography variant="h2" sx={{ marginLeft: "5%" }}>
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
                  {[...Array(numAverageSkeletons)].map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <Skeleton
                        variant="circular"
                        width={"16vw"}
                        height={"16vw"}
                        sx={{ marginTop: "12%" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
}
