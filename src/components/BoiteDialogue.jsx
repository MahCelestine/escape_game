import { useEffect, useState } from "react";

function BoiteDialogue({ message, title, onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (message || title) {
      setIsVisible(true);
      setIsClosing(false);

      // Auto-fermeture après la durée spécifiée (sauf si duration = 0)
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
    }, 300);
  };

  if (!isVisible && !message && !title) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(148, 163, 184, 0.3)",
          background: "rgba(18, 25, 40, 0.85)",
          borderRadius: "15px",
          padding: "20px 25px",
          position: "relative",
        }}
      >
        {/* Titre */}
        {title && (
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Calibri",
            }}
          >
            {title}
          </h3>
        )}

        {/* Message */}
        {message && (
          <p
            style={{
              color: "#ffffff",
              margin: 0,
              fontSize: "16px",
              fontFamily: "Calibri",
              lineHeight: "1.5",
              paddingRight: title ? "0" : "30px",
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
