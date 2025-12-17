import React from "react";

const IndiceModal = ({ clue, onClose }) => {
  if (!clue) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)", // Fond sombre
        zIndex: 200, // Au-dessus de tout (même du HUD)
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose} // Un clic n'importe où ferme la fenêtre
    >
      <div
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image
      >
        {/* L'IMAGE DE L'INDICE */}
        <img
          src={clue.image}
          alt="Indice"
          style={{
            maxWidth: "100%",
            maxHeight: "70vh", // Laisse de la place pour le texte
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            border: "2px solid #fbbf24", // Bordure dorée style enquête
            objectFit: "contain",
          }}
        />

        {/* LE TEXTE DESCRIPTIF */}
        {clue.description && (
          <div
            style={{
              color: "#e2e8f0",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "18px",
              maxWidth: "600px",
              fontFamily: "monospace",
            }}
          >
            {clue.description}
          </div>
        )}

        {/* BOUTON FERMER (Optionnel car le clic fond marche aussi) */}
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          FERMER
        </button>
      </div>
    </div>
  );
};

export default IndiceModal;
