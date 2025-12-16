// components/Timer.jsx
import React from 'react';

function Timer({ 
  timeLeft = 0, 
  isRunning = false, 
  isFinished = false, 
  formatTime,
  onStart = () => {}
}) {
  return (
    <>
      <h2 style={{ margin: 0 }}>
        {formatTime(timeLeft)}
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