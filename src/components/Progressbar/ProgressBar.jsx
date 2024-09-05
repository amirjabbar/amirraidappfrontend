import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressBar = ({ intervalTime = 500, resetTime = 2000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 10, 100);
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      setTimeout(() => {
        setProgress(0); // Reset the progress bar after completion
      }, resetTime);
    };
  }, [intervalTime, resetTime]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default ProgressBar;
