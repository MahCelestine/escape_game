import React from "react";
import ItemInventaire from "./ItemInventaire";
import "../assets/css/Inventaire.css";
const Inventaire = ({ items = [] }) => {
  return (
    <div className="inventory-container">
      {/* Bouton Paramètres (Décoratif pour l'instant) */}
      <button className="settings-btn" title="Options">
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
    </div>
  );
};

export default Inventaire;
