import React, { useEffect } from "react";

// Import des énigmes
import PuzzleDigicode from "./énigmes/PuzzleDigicode.jsx";
import PuzzleQuiz from "./énigmes/PuzzleQuiz.jsx";
import PuzzleSliding from "./énigmes/PuzzleSliding.jsx";
import PuzzleCodeInput from "./énigmes/PuzzleCodeInput.jsx";
import PuzzlePatience from "./énigmes/PuzzlePatience.jsx";
import PuzzleHiddenWord from "./énigmes/PuzzleHiddenWord.jsx";
import PuzzleSwitches from "./énigmes/PuzzleSwitches.jsx";

// -------------------------------------------------------------
// 1. LE COMPOSANT D'AFFICHAGE
// -------------------------------------------------------------
const PuzzleModalComponent = ({ puzzle, onClose, onSuccess }) => {
  // Debug pour vérifier que le re-render est stoppé
  useEffect(() => {
    if (puzzle) {
      console.log(`[PuzzleModal] NOUVEAU PUZZLE CHARGÉ : ${puzzle.id}`);
    }
  }, [puzzle]);

  if (!puzzle) return null;

  const renderPuzzleContent = () => {
    // Clé unique stable basée sur l'ID de l'item
    const uniqueKey = puzzle.id || puzzle.puzzleType;

    switch (puzzle.puzzleType) {
      case "DIGICODE":
        return (
          <PuzzleDigicode
            key={uniqueKey}
            data={puzzle}
            onSuccess={onSuccess}
            onFailure={onClose}
          />
        );
      case "QUIZ":
        return (
          <PuzzleQuiz
            key={uniqueKey}
            data={puzzle}
            onSuccess={onSuccess}
            onFailure={onClose}
          />
        );

      case "SLIDING":
        return (
          <PuzzleSliding key={uniqueKey} data={puzzle} onSuccess={onSuccess} />
        );

      case "CODE_INPUT":
        return (
          <PuzzleCodeInput
            key={uniqueKey}
            data={puzzle}
            onSuccess={onSuccess}
          />
        );

      case "PATIENCE":
        return (
          <PuzzlePatience key={uniqueKey} data={puzzle} onSuccess={onSuccess} />
        );

      case "HIDDEN_WORD":
        return (
          <PuzzleHiddenWord
            key={uniqueKey}
            data={puzzle}
            onSuccess={onSuccess}
          />
        );

      case "SWITCHES":
        return (
          <PuzzleSwitches key={uniqueKey} data={puzzle} onSuccess={onSuccess} />
        );

      default:
        return (
          <div className="text-white">
            Type d'énigme inconnu : {puzzle.puzzleType}
          </div>
        );
    }
  };

  return (
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

        {renderPuzzleContent()}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. LE BOUCLIER (Comparaison personnalisée)
// -------------------------------------------------------------
// C'est ici que la magie opère. On force React à ignorer les mises à jour
// venant du parent SI l'ID du puzzle est le même qu'avant.
const arePropsEqual = (prevProps, nextProps) => {
  const prevId = prevProps.puzzle ? prevProps.puzzle.id : null;
  const nextId = nextProps.puzzle ? nextProps.puzzle.id : null;

  // Si c'est le même ID (ex: "loot_fetish"), on renvoie TRUE.
  // TRUE = "Ne change rien, ne te redessine pas, ignore le Timer du parent".
  return prevId === nextId;
};

// On exporte le composant protégé par memo + arePropsEqual
const PuzzleModal = React.memo(PuzzleModalComponent, arePropsEqual);

export default PuzzleModal;
