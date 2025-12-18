import { useEffect, useState } from "react";

function BoiteDialogue({ message, title, onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (message || title) {
      setIsVisible(true);
      setIsClosing(false);

      // Auto-fermeture
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [message, title, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Correspond à la durée de l'animation CSS
  };

  // Si on n'a rien à afficher et qu'on est pas en train de fermer, on retourne null
  if (!isVisible && !message && !title) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        // L'animation se fait via la transformation CSS plus bas
        transform: isClosing ? "translate(-50%, 20px)" : "translate(-50%, 0)",
        opacity: isClosing ? 0 : 1,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", // Animation fluide "Apple style"
        zIndex: 1000,
        maxWidth: "600px",
        width: "90%",
        pointerEvents: "none", // Pour cliquer au travers si besoin (sauf sur la boite elle-même)
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(18, 25, 40, 0.75)",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          backdropFilter: "blur(8px)",
          borderLeft: "4px solid #fbbf24",
          borderRadius: "8px",
          padding: "20px 25px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Titre */}
        {title && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "bold",
                color: "#fbbf24", // Couleur Or/Jaune (style Cyberpunk/Loot)
                fontFamily: "monospace", // Même police que le Timer
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {title}
            </h3>
          </div>
        )}

        {/* Message */}
        {message && (
          <p
            style={{
              color: "#e2e8f0", // Blanc cassé pour ne pas agresser les yeux
              margin: 0,
              fontSize: "16px",
              fontFamily: "'Segoe UI', Roboto, sans-serif", // Police très lisible
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default BoiteDialogue;
