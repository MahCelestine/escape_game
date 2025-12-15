import { useRef, useEffect } from 'react';
import { createTimer } from 'animejs';
import '../App.css';

function Timer() {
  const timeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeRef.current) {
      const totalMinutes = 20;
      const totalMilliseconds = totalMinutes * 60 * 1000;

      const timer = createTimer({
        duration: totalMilliseconds,
        onUpdate: self => {
          const remainingTime = totalMilliseconds - self.currentTime;
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          if (timeRef.current) {
            timeRef.current.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          }
        },
        onComplete: () => {
          if (timeRef.current) {
            timeRef.current.textContent = "00:00";
          }
        }
      });

      timerRef.current = timer;

      // Nettoyage
      return () => {
        if (timerRef.current) {
          timerRef.current.pause();
        }
      };
    }
  }, []);

  return (
    <div>
      <p ref={timeRef}>20:00</p>
    </div>
  );
}

export default Timer;