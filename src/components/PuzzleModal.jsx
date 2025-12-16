import React from "react";
import PuzzleDigicode from "./énigmes/PuzzleDigicode.jsx";
import PuzzleQuiz from "./énigmes/PuzzleQuiz.jsx";
import PuzzleSliding from "./énigmes/PuzzleSliding.jsx";
import PuzzleCodeInput from "./énigmes/PuzzleCodeInput.jsx";
import PuzzlePatience from "./énigmes/PuzzlePatience.jsx";

const PuzzleModal = ({ puzzle, onClose, onSuccess }) => {
  if (!puzzle) return null;

  const renderPuzzleContent = () => {
    switch (puzzle.puzzleType) {
      case "DIGICODE":
        return (
          <PuzzleDigicode
            data={puzzle}
            onSuccess={onSuccess}
            onFailure={onClose}
          />
        );
      case "QUIZ":
        return (
          <PuzzleQuiz data={puzzle} onSuccess={onSuccess} onFailure={onClose} />
        );

      case "SLIDING":
        return <PuzzleSliding data={puzzle} onSuccess={onSuccess} />;

      case "CODE_INPUT":
        return <PuzzleCodeInput data={puzzle} onSuccess={onSuccess} />;

      case "PATIENCE":
        return <PuzzlePatience data={puzzle} onSuccess={onSuccess} />;

      case "HIDDEN_WORD":
        return <PuzzleHiddenWord data={puzzle} onSuccess={onSuccess} />;

      case "SWITCHES":
        return <PuzzleSwitches data={puzzle} onSuccess={onSuccess} />;

      default:
        return (
          <div className="text-white">
            Type d'énigme inconnu : {puzzle.puzzleType}
          </div>
        );
    }
  };

  return (
    // L'Overlay sombre par-dessus le jeu
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* La Boîte de l'énigme */}
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "2px solid #fbbf24",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "500px",
          width: "90%",
          position: "relative",
          boxShadow: "0 0 30px rgba(251, 191, 36, 0.2)",
        }}
      >
        {/* Bouton fermer (Croix) */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Titre de l'énigme */}
        <h2
          style={{
            color: "#fbbf24",
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "monospace",
          }}
        >
          SYSTEME DE SÉCURITÉ
        </h2>

        {/* Le contenu spécifique de l'énigme */}
        {renderPuzzleContent()}
      </div>
    </div>
  );
};

export default PuzzleModal;
