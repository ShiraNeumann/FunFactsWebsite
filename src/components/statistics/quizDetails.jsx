import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import animal from "../../images/animal.jpg";
import art from "../../images/art.jpg";
import books from "../../images/books.jpg";
import computer from "../../images/computer.jpg";
import general from "../../images/general.jpg";
import geography from "../../images/geography.jpg";
import history from "../../images/history.jpg";
import math from "../../images/math.jpg";
import politics from "../../images/politics.jpg";
import science from "../../images/science.jpg";
import sports from "../../images/sports.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export function QuizDetails(props) {
  const {
    quiznumber,
    category,
    score,
    correct,
    incorrect,
    totalQ,
    timed,
    difficulty,
  } = props;
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate(
      `/quiz?difficulty=${difficulty}&category=${category}&number=${totalQ}&timed=${timed}`
    );
  };
  const categoryImages = {
    Computers: computer,
    "Science & Nature": science,
    History: history,
    General: general,
    Geography: geography,
    Mathematics: math,
    Politics: politics,
    Sports: sports,
    Animals: animal,
    Art: art,
    Books: books,
  };

  const getCategoryImage = (category) => {
    return categoryImages[category] || "";
  };

  return (
    <Paper
      sx={{
        p: 2,
        marginLeft: "10%",
        maxWidth: 500,
        minWidth: 300,
        marginBottom: "2%",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        marginTop: "2%",
        position: "relative",
      }}
      key={quiznumber}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            sx={{
              width: 200,
              height: 200,
              overflow: "hidden",
            }}
            disableRipple
          >
            <Img src={getCategoryImage(category)} alt="category" />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid
            item
            xs={12}
            container
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: "max(2vw, 30px)" }}
                component="div"
              >
                Quiz {quiznumber}: {category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Difficulty: {difficulty}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Score: {score}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Questions: {totalQ}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Correct Questions: {correct}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Incorrect Questions: {incorrect}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Timed: {timed ? "Yes" : "No"}
              </Typography>
              <Grid
                item
                sx={{ position: "absolute", bottom: 0, right: 0, p: 2 }}
              >
                <Button onClick={handleTryAgain}>Try Another</Button>
              </Grid>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
