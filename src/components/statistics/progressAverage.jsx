import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="div">
          {props.label}
        </Typography>
        <Typography variant="h4" component="div">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
  /**
   * The label to display along with the value.
   */
  label: PropTypes.string.isRequired,
};

export function AverageProgress(props) {
  const { average, category } = props;

  return (
    <CircularProgressWithLabel
      value={average}
      label={category}
      size={"16vw"}
      style={{
        color: "#ee78a2",
        borderRadius: "50%",
        boxShadow: "inset 0 0 0 1.3vw #ffff",
      }}
    />
  );
}
