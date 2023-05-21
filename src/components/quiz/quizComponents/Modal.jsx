import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { quizcontext } from "../../../state/quiz/quiz-context";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "max(30vw, 300px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ModalTimeout(props) {
  const { modalOpen, details } = props;
  const [open, setOpen] = React.useState(modalOpen);
  const { quizDispatch } = useContext(quizcontext);

  React.useEffect(() => {
    setOpen(modalOpen);
    if (modalOpen) {
      quizDispatch({ type: "ADD_QUIZ", quiz: details });
    }
  }, [modalOpen]);

  let navigate = useNavigate();

  const onClickstatistics = () => {
    quizDispatch({
      type: "RESTART",
    });
    navigate("/statistics");
  };

  const restart = () => {
    quizDispatch({
      type: "RESTART",
    });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h2" sx={{ fontSize: " max(4vw, 30px)" }}>
            Quiz Results
          </Typography>
          <div style={{ textAlign: "justify", margin: "auto", width: "75%" }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <Typography>You scored:</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography>{details.score}</Typography>
              </Grid>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <Typography>Total questions:</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography>{details.questions}</Typography>
              </Grid>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <Typography>Correct questions:</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography>{details.correct}</Typography>
              </Grid>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <Typography>Incorrect questions:</Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography>{details.questions - details.correct}</Typography>
              </Grid>
              <Grid item xs={8} style={{ textAlign: "left" }}>
                <Button variant="contained" color="secondary" onClick={restart}>
                  Try Again
                </Button>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onClickstatistics}
                >
                  Statistics
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
