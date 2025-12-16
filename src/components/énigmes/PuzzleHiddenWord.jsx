import React from "react";

const PuzzleHiddenWord = ({ data, onSuccess }) => {
  // Fonction pour transformer le texte marqué (ex: "Tu trouveras [rien]") en éléments React
  const parseText = (text) => {
    // On coupe le texte à chaque fois qu'on voit [...]
    const parts = text.split(/(\[.*?\])/);

    return parts.map((part, index) => {
      // Si la partie est entre crochets, c'est le mot magique !
      if (part.startsWith("[") && part.endsWith("]")) {
        const word = part.slice(1, -1); // On enlève les crochets
        return (
          <span
            key={index}
            onClick={onSuccess} // Clic = Victoire immédiate
            style={{
              cursor: "pointer", // Montre la main au survol (ou 'text' pour être plus sadique)
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#fbbf24")} // Petit indice au survol (devient jaune)
            onMouseOut={(e) => (e.target.style.color = "inherit")}
            title="???" // Bulle info mystère
          >
            {word}
          </span>
        );
      }
      // Sinon c'est du texte normal
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        padding: "40px 0",
      }}
    >
      {/* On affiche le texte parsé */}
      <div
        style={{
          color: "#e2e8f0",
          fontSize: "24px",
          fontFamily: "serif", // Police un peu littéraire
          textAlign: "center",
        }}
      >
        {parseText(data.description)}
      </div>
    </div>
  );
};

export default PuzzleHiddenWord;
