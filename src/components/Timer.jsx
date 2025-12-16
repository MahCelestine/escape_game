import { useEffect, useState, useRef, useCallback } from 'react';
// Configuration
const GAME_DURATION = 20 * 60 * 1000; // 20 minutes en ms

function Timer({ onTimeUp }) {
  // On gère l'affichage via le state, pas via ref
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef(null);

  // Fonction utilitaire pour formater le temps (MM:SS)
  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fonction principale de calcul du temps restant
  const calculateTimeLeft = useCallback((targetDate) => {
    const now = Date.now();
    const difference = targetDate - now;
    return Math.max(0, difference);
  }, []);

  // Démarrer le timer
  const startTimer = () => {
    if (isRunning) return;

    // On définit la date de fin (Maintenant + Durée restante ou totale)
    // Si on avait déjà commencé (pause), on reprend là où on était, sinon on part de 20min
    const targetDate = Date.now() + timeLeft;

    // On sauvegarde SEULEMENT la date de fin cible
    localStorage.setItem('escapeGameTargetDate', targetDate.toString());
    localStorage.setItem('escapeGameIsRunning', 'true');

    setIsRunning(true);

    // Lancement de la boucle
    runInterval(targetDate);
  };

  // Boucle d'intervalle
  const runInterval = (targetDate) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleGameOver();
      }
    }, 100); // 100ms suffit largement pour l'affichage
  };

  // Gestion de la fin du timer
  const handleGameOver = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(true);
    setTimeLeft(0);
    localStorage.removeItem('escapeGameTargetDate');
    localStorage.removeItem('escapeGameIsRunning');

    // Appeler une fonction du parent si besoin (ex: afficher écran Game Over)
    if (onTimeUp) onTimeUp();
  };

  // Initialisation au chargement de la page (F5)
  useEffect(() => {
    const savedTarget = localStorage.getItem('escapeGameTargetDate');
    const savedIsRunning = localStorage.getItem('escapeGameIsRunning') === 'true';

    if (savedTarget && savedIsRunning) {
      const targetDate = parseInt(savedTarget, 10);
      const remaining = calculateTimeLeft(targetDate);

      if (remaining <= 0) {
        // Le temps s'est écoulé pendant que la page était fermée
        handleGameOver();
      } else {
        // On reprend le timer
        setTimeLeft(remaining);
        setIsRunning(true);
        runInterval(targetDate);
      }
    } else {
      // Cas optionnel : si on veut garder le temps restant en cas de "Pause" + Refresh
      // Pour l'instant, si ce n'est pas "Running", on remet à 20min par défaut
    }

    // Nettoyage à la destruction du composant
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{backgroundColor: "rgba(0,0,0,0.6)",padding:"1%", borderRadius:"5px"}}>

      {/* Affichage direct du state, pas de ref */}
      <h2>
        {formatTime(timeLeft)}
      </h2>

      <div>
        {!isRunning && !isFinished && (
          <button onClick={startTimer}>
            Démarrer Mission
          </button>
        )}
      </div>

      {isFinished && (
        <p>
          TEMPS ÉCOULÉ !
        </p>
      )}
    </div>
  );
}

export default Timer;