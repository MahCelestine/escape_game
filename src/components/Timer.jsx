import React from "react";

function Timer({
  timeLeft = 0,
  isRunning = false,
  isFinished = false,
  formatTime,
}) {
  const defaultFormatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const displayFormatTime = formatTime || defaultFormatTime;

  const isUrgent = timeLeft < 60000 && isRunning;
  const textColor = isUrgent ? "#ef4444" : "#e2e8f0";

  return (
    <div
      style={{
        backgroundColor: "rgba(18, 25, 40, 0.75)",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        borderRadius: "8px",
        padding: "10px 20px", // Ombre portée
        minWidth: "100px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Chrono
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: "monospace", // Police numérique
          fontSize: "24px",
          color: textColor,
          textShadow: isUrgent ? "0 0 10px #ef4444" : "none", // Effet néon si urgent
        }}
      >
        {displayFormatTime(timeLeft)}
      </h2>
    </div>
  );
}

export default Timer;
