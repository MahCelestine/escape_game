import React, { useState } from "react";

const PuzzleCodeInput = ({ data, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // On compare en majuscules et sans espaces inutiles
    if (inputValue.toUpperCase().trim() === data.solution.toUpperCase()) {
      onSuccess();
    } else {
      setError(true);
      setInputValue(""); // On efface pour recommencer
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
      }}
    >
      {/* Description */}
      <p style={{ color: "#ccc", textAlign: "center" }}>
        {data.description || "Déchiffrez le code secret."}
      </p>

      {/* L'image du code à déchiffrer */}
      {data.image && (
        <img
          src={data.image}
          alt="Code à déchiffrer"
          style={{
            maxWidth: "100%",
            maxHeight: "200px",
            borderRadius: "8px",
            border: "2px solid #475569",
          }}
        />
      )}

      {/* Formulaire de réponse */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
          placeholder="Entrez votre réponse..."
          style={{
            padding: "15px",
            fontSize: "18px",
            borderRadius: "8px",
            border: error ? "2px solid red" : "2px solid #fbbf24",
            backgroundColor: "#0f172a",
            color: "white",
            textAlign: "center",
            width: "80%",
            outline: "none",
            textTransform: "uppercase",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#fbbf24",
            color: "black",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            opacity: inputValue ? 1 : 0.5, // Grisé si vide
            transition: "opacity 0.2s",
          }}
          disabled={!inputValue}
        >
          VALIDER
        </button>
      </form>
    </div>
  );
};

export default PuzzleCodeInput;
