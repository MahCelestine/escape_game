import React, { useState, useEffect, useRef } from "react"; // 1. AJOUT DE useRef

const PuzzlePatience = ({ data, onSuccess }) => {
  const START_TIME = 10;
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [message, setMessage] = useState("Ne bougez plus...");
  const [shake, setShake] = useState(false);

  // 2. LE VERROU DE SÉCURITÉ
  // Il va servir à être sûr qu'on ne gagne qu'une seule fois
  const isFinished = useRef(false);

  useEffect(() => {
    const handleMovement = () => {
      // Si c'est déjà fini, on ne fait plus rien (on ne reset pas le timer)
      if (isFinished.current) return;

      setTimeLeft(START_TIME);
      setMessage("Vous avez bougé ! On reprend à zéro.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    };

    window.addEventListener("mousemove", handleMovement);
    window.addEventListener("click", handleMovement);
    window.addEventListener("keydown", handleMovement);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Si le verrou est mis, on force le timer à rester à 0
        if (isFinished.current) return 0;

        if (prev <= 1) {
          // --- VICTOIRE ---

          // 3. ON VERROUILLE IMMÉDIATEMENT
          isFinished.current = true;

          clearInterval(timer);

          // Nettoyage des écouteurs
          window.removeEventListener("mousemove", handleMovement);
          window.removeEventListener("click", handleMovement);
          window.removeEventListener("keydown", handleMovement);

          // On appelle le succès UNE SEULE FOIS
          onSuccess();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMovement);
      window.removeEventListener("click", handleMovement);
      window.removeEventListener("keydown", handleMovement);
    };
  }, [onSuccess]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        animation: shake ? "shake 0.5s" : "none",
      }}
    >
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>

      <p
        style={{
          color: timeLeft === START_TIME ? "#ef4444" : "#94a3b8",
          fontSize: "18px",
          textAlign: "center",
          transition: "color 0.3s",
        }}
      >
        {message}
      </p>

      {/* Barre de progression */}
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#334155",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((START_TIME - timeLeft) / START_TIME) * 100}%`,
            backgroundColor: "#fbbf24",
            transition: "width 1s linear",
          }}
        ></div>
      </div>

      <div style={{ fontSize: "12px", color: "#64748b", fontStyle: "italic" }}>
        Lâchez votre souris...
      </div>
    </div>
  );
};

export default PuzzlePatience;
