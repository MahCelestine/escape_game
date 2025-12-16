import React, { useState } from "react";
import ItemInventaire from "./ItemInventaire";
import "../assets/css/Inventaire.css";
import Option from "./Option";

const Inventaire = ({ items = [],
  timeLeft = 0,
  isRunning = false,
  isFinished = false,
  onPause = () => {},
  onResume = () => {},
  onReset = () => {},
  onStart = () => {},
  formatTime = (ms) => "00:00"
 }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="inventory-container">
      {/* Bouton Paramètres (Décoratif pour l'instant) */}
      <button 
        className="settings-btn" 
        title="Options du timer"
        onClick={() => setShowOptions(true)}
      >
        ⚙️
      </button>

      {/* Petit trait de séparation */}
      <div className="divider"></div>

      {/* Boucle sur les objets */}
      {items.map((item, index) => (
        <ItemInventaire
          key={item.id || index} // Utilise l'ID unique de l'objet
          item={item}
        />
      ))}

      {/* Optionnel: Slots vides pour garder le design vertical même vide */}
      {items.length === 0 && (
        <div
          style={{
            opacity: 0.3,
            color: "white",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          Vide
        </div>
      )}

      {/* Modal Option */}
      <Option
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        timeLeft={timeLeft}
        isRunning={isRunning}
        isFinished={isFinished}
        onPause={onPause}
        onResume={onResume}
        onReset={onReset}
        onStart={onStart}
        formatTime={formatTime}
      />
    </div>
  );
};

export default Inventaire;
