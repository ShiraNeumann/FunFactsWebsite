import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function ProgressBar(props) {
  const [progress, setProgress] = React.useState(0);
  const { current, total } = props;

  React.useEffect(() => {
    const calculateProgress = () => {
      const percentage = (current / total) * 100;
      setProgress(percentage);
    };

    calculateProgress();
  }, [total, current]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        sx={{
          backgroundColor: "#f7e6e8",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#ee78a2",
          },
          outlineColor: "#a1c3d3",
        }}
        value={progress}
      />
    </Box>
  );
}
