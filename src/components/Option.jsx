import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Option({
  isOpen,
  onClose,
  timeLeft,
  isRunning,
  isFinished,
  onPause,
  onResume,
  onReset,
  onStart,
  formatTime
}) {
  const GAME_DURATION = 20 * 60 * 1000;

  const navigate = useNavigate();

  const restartGame = () => {
    navigate("/");
  };

  const isGameStarted = timeLeft < GAME_DURATION;
  const isPaused = isGameStarted && !isFinished && !isRunning;

  useEffect(() => {
    const handleEscape = (e) => {
      // Si le jeu est en pause, on empêche la fermeture avec Échap
      if (isPaused) {
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, isPaused]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        // Si le jeu est en pause, on empêche la fermeture en cliquant à l'extérieur
        if (!isPaused) onClose();
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginLeft: '200px',
        // Fond noir opaque quand le jeu est en pause
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000, // Z-index très élevé pour être au-dessus de tout
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#1a1a2e',
          padding: '25px',
          borderRadius: '12px',
          minWidth: '350px',
          color: 'white',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          background: 'rgba(18, 25, 40, 0.85)',
          boxShadow: 'none',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          paddingBottom: '10px'
        }}>
          <h3 style={{ color: 'white' }}>
            {isPaused ? 'Jeu en pause' : 'Option'}
          </h3>
          {/* Cacher le bouton de fermeture quand le jeu est en pause */}
          {!isPaused && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          )}
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '15px',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}>
            {formatTime(timeLeft)}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#aaa',
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: isRunning ? '#00ff00' : isFinished ? '#ff4757' : '#ffa500'
            }}></span>
            {isRunning ? 'Mission en cours' :
              isFinished ? 'Mission terminée' :
                isPaused ? 'Mission en pause' : 'Prêt à démarrer'}
          </div>
        </div>
        <div className="divider_option" style={{
          marginBottom: '25px',
        }}></div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {isGameStarted && !isFinished && (
            <>
              {isRunning && (
                <button
                  onClick={() => {
                    onPause();
                  }}
                  style={{
                    padding: '12px',
                    border: 'none',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                  <span>⏸</span> Mettre en Pause
                </button>
              )}

              {isPaused && (
                <button
                  onClick={() => {
                    onResume();
                    onClose();
                  }}
                  style={{
                    padding: '12px',
                    border: 'none',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                  <span>▶</span> Reprendre la Mission
                </button>
              )}
            </>
          )}

          <button
            onClick={() => {
              onReset();
              restartGame();
            }}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
            <span>↻</span> Redémarrer la partie
          </button>
        </div>
      </div>
    </div>
  );
}

export default Option;