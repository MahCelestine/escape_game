import React from "react";
import "../assets/css/Inventaire.css";

const ItemInventaire = ({ item }) => {
  // Fonction locale pour le prix
  const formatPrice = (val) => "$" + val.toLocaleString("en-US");

  return (
    <div className="inventory-item" title={item.name}>
      {/* Affichage de l'image si elle existe, sinon icône par défaut */}
      {item.image ? (
        <img src={item.image} alt={item.name} className="item-icon" />
      ) : (
        <span style={{ fontSize: "30px", marginBottom: "5px" }}>
          {item.type === "key" ? "🔑" : "💎"}
        </span>
      )}

      {/* Affichage de la valeur */}
      <span className="item-value">{formatPrice(item.value)}</span>
    </div>
  );
};

export default ItemInventaire;
