import { useRef, useEffect, useState } from 'react';
import '../App.css';

function Timer() {
  const timeRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20 * 60 * 1000);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Mettre à jour l'affichage quand remainingTime change
  useEffect(() => {
    updateDisplay(remainingTime);
  }, [remainingTime]);

  // Initialisation au chargement
  useEffect(() => {
    const savedState = localStorage.getItem('timerState');
    
    if (savedState) {
      const { savedRemainingTime, savedIsRunning, savedTimestamp } = JSON.parse(savedState);
      const now = Date.now();
      const timeElapsed = now - savedTimestamp;
      
      let adjustedRemainingTime = Math.max(0, savedRemainingTime - timeElapsed);
      
      if (adjustedRemainingTime <= 0) {
        setRemainingTime(20 * 60 * 1000);
        localStorage.removeItem('timerState');
      } else {
        setRemainingTime(adjustedRemainingTime);
        
        if (savedIsRunning) {
          // Si le timer était en cours, le reprendre automatiquement
          setHasStarted(true);
          startTimer(adjustedRemainingTime);
        }
      }
    }
  }, []);

  // Mettre à jour l'affichage
  const updateDisplay = (time) => {
    if (timeRef.current) {
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      timeRef.current.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Démarrer le timer
  const startTimer = (startTime = null) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Initialiser le temps de départ
    const initialTime = startTime !== null ? startTime : remainingTime;
    startTimeRef.current = Date.now() - (20 * 60 * 1000 - initialTime);
    
    setIsRunning(true);
    setHasStarted(true);
    
    // Lancer l'intervalle
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemainingTime = Math.max(0, 20 * 60 * 1000 - elapsed);
      
      setRemainingTime(newRemainingTime);
      
      // Sauvegarder l'état
      saveTimerState(newRemainingTime, true);
      
      if (newRemainingTime <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        localStorage.removeItem('timerState');
      }
    }, 100);
  };

  // Sauvegarder l'état du timer
  const saveTimerState = (time, running) => {
    const timerState = {
      savedRemainingTime: time,
      savedIsRunning: running,
      savedTimestamp: Date.now()
    };
    localStorage.setItem('timerState', JSON.stringify(timerState));
  };

  // Nettoyage
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <p ref={timeRef}>20:00</p>
      <div style={{ marginTop: '20px' }}>
        {!hasStarted && (
          <button onClick={startTimer}>
            Démarrer le timer
          </button>
        )}
        {hasStarted && isRunning && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            Timer en cours...
          </p>
        )}
        {hasStarted && !isRunning && remainingTime <= 0 && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Timer terminé !
          </p>
        )}
      </div>
    </div>
  );
}

export default Timer;
