import React, { useState, useEffect } from "react";

const PuzzlePatience = ({ data, onSuccess }) => {
  const START_TIME = 10;
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [message, setMessage] = useState("Ne bougez plus...");
  const [shake, setShake] = useState(false); // Pour l'effet visuel quand on rate

  useEffect(() => {
    // Fonction qui réinitialise le timer si on bouge
    const handleMovement = () => {
      setTimeLeft(START_TIME);
      setMessage("Vous avez bougé ! On reprend à zéro.");
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset de l'anim
    };

    // On écoute les mouvements de souris ET les clics partout sur la fenêtre
    window.addEventListener("mousemove", handleMovement);
    window.addEventListener("click", handleMovement);
    window.addEventListener("keydown", handleMovement); // Si tu veux aussi bloquer le clavier

    // Le Timer qui décrémente chaque seconde
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Victoire !
          clearInterval(timer);
          // On retire les écouteurs pour ne pas bloquer la victoire
          window.removeEventListener("mousemove", handleMovement);
          window.removeEventListener("click", handleMovement);
          window.removeEventListener("keydown", handleMovement);

          onSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Nettoyage quand le composant est démonté (fermé)
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMovement);
      window.removeEventListener("click", handleMovement);
      window.removeEventListener("keydown", handleMovement);
    };
  }, [onSuccess]); // Dépendance vide ou onSuccess pour ne lancer qu'une fois

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

      <h3 style={{ color: "#fbbf24", fontSize: "24px" }}>{timeLeft}s</h3>

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

      {/* Barre de progression visuelle */}
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
