import React, { useState } from "react";

const PuzzleDigicode = ({ data, onSuccess, onFailure }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const handlePress = (num) => {
    if (input.length < 4) {
      // Ou data.maxLength si tu veux varier
      setInput((prev) => prev + num);
      setError(false);
    }
  };

  const handleValidate = () => {
    if (input === data.solution) {
      onSuccess();
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        width: "100%",
      }}
    >
      {/* --- NOUVEAU : Image de l'énigme (Indices) --- */}
      {data.image && (
        <img
          src={data.image}
          alt="Indices"
          style={{
            maxWidth: "100%",
            maxHeight: "200px",
            borderRadius: "8px",
            border: "1px solid #475569",
          }}
        />
      )}

      {/* Description */}
      <div
        style={{
          color: "#ccc",
          fontSize: "14px",
          whiteSpace: "pre-line",
          textAlign: "center",
          width: "100%",
        }}
      >
        {data.description}
      </div>

      {/* Écran */}
      <div
        style={{
          backgroundColor: "#000",
          color: error ? "red" : "#0f0",
          fontFamily: "monospace",
          fontSize: "32px",
          letterSpacing: "5px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #333",
          width: "60%",
          textAlign: "center",
          minHeight: "50px",
        }}
      >
        {input.length === 0 ? <span className="animate-pulse">|</span> : input}
      </div>

      {/* Clavier */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num.toString())}
            style={btnStyle}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setInput("")}
          style={{ ...btnStyle, backgroundColor: "#7f1d1d" }}
        >
          C
        </button>
        <button onClick={() => handlePress("0")} style={btnStyle}>
          0
        </button>
        <button
          onClick={handleValidate}
          style={{ ...btnStyle, backgroundColor: "#14532d" }}
        >
          OK
        </button>
      </div>

      {/* Indice textuel si besoin */}
      {error && data.clue && (
        <button
          onClick={() => setShowClue(true)}
          style={{
            color: "#fbbf24",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Besoin d'aide ?
        </button>
      )}
      {showClue && (
        <div style={{ color: "#fbbf24", fontSize: "12px" }}>💡 {data.clue}</div>
      )}
    </div>
  );
};

const btnStyle = {
  padding: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "#334155",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default PuzzleDigicode;
