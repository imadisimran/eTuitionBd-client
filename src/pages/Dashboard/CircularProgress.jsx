import React from "react";

const CircularProgress = ({ percentage, size = 200, strokeWidth = 15 }) => {
  // 1. Calculate Geometry
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashOffset = circumference - (percentage / 100) * circumference;

  // 2. Define Colors (Matches the image)
  const gradientId = "progress-gradient";

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }} // Start from top (12 o'clock)
      >
        <defs>
          {/* The Gradient Definition */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" /> {/* Light Green */}
            <stop offset="100%" stopColor="#10b981" /> {/* Darker Green */}
          </linearGradient>

          {/* The Glow/Shadow Filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#4ade80"
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {/* Background Circle (Track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb" // Light grey
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle (Dynamic) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round" // Rounds the ends
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          filter="url(#glow)" // Applies the glow
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out", // Smooth animation
          }}
        />
      </svg>

      {/* Text Container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}
        >
          {percentage}%
        </span>
        <span style={{ fontSize: "1rem", color: "#6b7280" }}>Complete</span>
      </div>
    </div>
  );
};

export default CircularProgress;
