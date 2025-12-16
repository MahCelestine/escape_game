import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GAME_DURATION = 0.1 * 60 * 1000;

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateTimeLeft = (startTime, duration) => {
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = duration - elapsed;
    return Math.max(0, remaining);
  };

  const startTimer = () => {
    if (isRunning) return;

    startTimeRef.current = Date.now();
    setIsRunning(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;

      const remaining = calculateTimeLeft(startTimeRef.current, GAME_DURATION);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleGameOver();
      }
    }, 100);
  };

  const handleGameOver = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(true);
    setTimeLeft(0);
    startTimeRef.current = null;

    if (onTimeUp) onTimeUp();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      navigate("/Fin");
    }
  }, [isFinished, navigate]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "1%",
        borderRadius: "5px",
      }}
    >
      <h2>{formatTime(timeLeft)}</h2>
      <div>
        {!isRunning && !isFinished && (
          <button onClick={startTimer}>Démarrer Mission</button>
        )}
      </div>
    </div>
  );
}

export default Timer;
