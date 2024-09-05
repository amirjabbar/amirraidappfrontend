import React, { useState, useEffect, useRef } from "react";

const Circulardash = ({
  percentage,
  size = 150,
  strokeWidth = 8,
  dashLength = 4,
  gapLength = 6,
  gradientId = "gradient",
  duration = 2, // Duration for the animation in seconds
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const circleRef = useRef(null);
  const maskRef = useRef(null);
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Generate a unique ID for the mask element
  const maskId = `dashMask-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);
      const newPercentage = Math.floor(progress * percentage);
      setDisplayPercentage(newPercentage);

      // Calculate the animated strokeDashoffset
      const animatedOffset = -((newPercentage / 100) * circumference);

      // Update the strokeDashoffset property for the circle
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = animatedOffset;
      }

      // Update the strokeDashoffset property for the mask
      if (maskRef.current) {
        maskRef.current.style.strokeDashoffset = animatedOffset;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start the animation loop
    requestAnimationFrame(animate);
  }, [percentage, duration, circumference]);

  // Calculate the visible dash length based on the percentage
  const visibleDashLength = circumference * (percentage / 100);
  const strokeDashoffset = -visibleDashLength;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          {/* Define your linear gradient here */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1569fc" /> {/* Lightest color */}
            <stop offset="33%" stopColor="#2c92f8" />
            <stop offset="66%" stopColor="#65c8fd" />
            <stop offset="100%" stopColor="#88fffd" /> {/* Darkest color */}
          </linearGradient>

          {/* Mask for gradient */}
          <mask id={maskId}>
            <circle
              ref={maskRef}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="white"
              stroke="black"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference} // Start fully masked
            />
          </mask>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="none"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle with reversed gradient */}
        <circle
          ref={circleRef} // Use ref to access the circle element
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dashLength} ${gapLength}`}
          mask={`url(#${maskId})`}
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

export default Circulardash;
