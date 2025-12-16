import React from "react";

const PuzzleQuiz = ({ data, onSuccess, onFailure }) => {
  // data.options doit contenir les choix (ex: ["L'écho", "Une question", "Le vent"])

  const handleAnswer = (choice) => {
    if (choice === data.solution) {
      onSuccess();
    } else {
      alert("Ce n'est pas la bonne réponse...");
      // Optionnel : onFailure() si tu veux fermer la fenêtre après une erreur
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* Le texte de l'énigme */}
      <div
        style={{
          color: "#e2e8f0",
          fontSize: "16px",
          fontStyle: "italic",
          textAlign: "center",
          whiteSpace: "pre-line", // Pour garder les sauts de lignes du poème
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "15px",
          borderRadius: "8px",
          width: "90%",
        }}
      >
        "{data.description}"
      </div>

      <p style={{ color: "#fbbf24", fontSize: "14px" }}>
        Choisissez la bonne réponse :
      </p>

      {/* Les boutons de choix */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              padding: "12px",
              backgroundColor: "#334155",
              color: "white",
              border: "1px solid #475569",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#475569")}
            onMouseOut={(e) => (e.target.style.background = "#334155")}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PuzzleQuiz;
