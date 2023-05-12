import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { quizcontext } from "../../../state/quiz/quiz-context";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ModalTimeout(props) {
  const { modalOpen, timedQuiz, timeLeft, details } = props;
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
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {timedQuiz && timeLeft <= 0 ? "Time is up!" : "Finished!"}
          </Typography> */}

          <Typography variant="h2">Quiz Results</Typography>
          <Typography>
            You scored :{" "}
            {Math.round((details.correct * 100) / details.questions)}
          </Typography>
          <Typography>Total questions: {details.questions}</Typography>
          <Typography>Correct questions: {details.correct}</Typography>
          <Typography>
            Incorrect questions: {details.questions - details.correct}
          </Typography>
          <Button onClick={restart}>Try Again</Button>
          <Button onClick={onClickstatistics}>View Statistics</Button>
        </Box>
      </Modal>
    </div>
  );
}
