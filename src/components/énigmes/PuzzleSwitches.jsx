import React, { useState } from "react";

const PuzzleSwitches = ({ data, onSuccess }) => {
  // On initialise 6 interrupteurs à "false" (Off/Bas) par défaut
  const [switches, setSwitches] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [error, setError] = useState(false);

  const toggleSwitch = (index) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index]; // On inverse l'état
    setSwitches(newSwitches);
    setError(false); // On reset l'erreur dès qu'on touche
  };

  const handleValidate = () => {
    // data.solution doit être un tableau de booléens : [true, false, true, true, false, false]
    // On compare chaque interrupteur avec la solution
    const isCorrect = switches.every(
      (state, index) => state === data.solution[index]
    );

    if (isCorrect) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        width: "100%",
      }}
    >
      <p style={{ color: "#ccc" }}>
        {data.description || "Configurez les interrupteurs."}
      </p>

      {/* Les Interrupteurs */}
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        {switches.map((isOn, index) => (
          <div
            key={index}
            onClick={() => toggleSwitch(index)}
            style={{
              width: "40px",
              height: "80px",
              backgroundColor: "#334155",
              borderRadius: "20px",
              position: "relative",
              cursor: "pointer",
              border: "2px solid #475569",
              boxShadow: isOn ? "0 0 10px #fbbf24" : "none", // Lueur si activé
              transition: "all 0.3s",
            }}
          >
            {/* Le bouton qui bouge */}
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: isOn ? "#fbbf24" : "#94a3b8", // Jaune si On, Gris si Off
                borderRadius: "50%",
                position: "absolute",
                left: "3px",
                top: isOn ? "5px" : "43px", // Position Haut ou Bas
                transition: "top 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Bouton Valider */}
      <button
        onClick={handleValidate}
        style={{
          padding: "12px 30px",
          backgroundColor: error ? "#ef4444" : "#0f172a",
          color: "white",
          border: `1px solid ${error ? "#ef4444" : "#fbbf24"}`,
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s",
        }}
      >
        {error ? "ERREUR" : "DÉVERROUILLER"}
      </button>
    </div>
  );
};

export default PuzzleSwitches;
