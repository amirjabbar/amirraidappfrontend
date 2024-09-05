import React, { useState, useEffect } from "react";

// todo: clean this up abit.
const Circulargraph = ({
  percentage,
  size,
  strokeWidth = 2,
  gradientId = null,
  duration = 1, // Duration of the animation in seconds
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const startPercentage = 0;
    const endPercentage = percentage;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);
      const newPercentage = Math.floor(
        progress * (endPercentage - startPercentage) + startPercentage
      );
      setDisplayPercentage(newPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage, duration]);

  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayPercentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Definitions for gradients */}
        {gradientId && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1569fc" /> {/* Lightest color */}
              <stop offset="33%" stopColor="#2c92f8" />
              <stop offset="66%" stopColor="#65c8fd" />
              <stop offset="100%" stopColor="#88fffd" /> {/* Darkest color */}
            </linearGradient>
          </defs>
        )}

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000000"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle (dynamic) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradientId ? `url(#${gradientId})` : "#4db6ac"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference} // Set the total circumference for the stroke
          strokeDashoffset={strokeDashoffset} // Set the stroke offset to show progress
          style={{
            transition: `stroke-dashoffset ${duration}s linear`, // Ensure transition matches duration
          }}
        />
      </svg>
      {/* Text displaying the progress percentage */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: size / 5,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {displayPercentage}%
      </div>
    </div>
  );
};

export default Circulargraph;
