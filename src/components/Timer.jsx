// components/Timer.jsx
import React from 'react';

function Timer({ 
  timeLeft = 0, 
  isRunning = false, 
  isFinished = false, 
  formatTime,
  onStart = () => {}
}) {
  // Fonction de formatage par défaut
  const defaultFormatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Utiliser la prop formatTime si elle est fournie, sinon utiliser la fonction par défaut
  const displayFormatTime = formatTime || defaultFormatTime;

  return (
    <>
      <h2 style={{ margin: 0 }}>
        {displayFormatTime(timeLeft)} {/* Utiliser displayFormatTime */}
      </h2>
      
      {!isRunning && !isFinished && (
        <button 
          onClick={onStart}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Démarrer Mission
        </button>
      )}
    </>
  );
}

export default Timer;