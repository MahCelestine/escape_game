import React from "react";
import "../assets/css/VueSalle.css"; // Assure-toi que le chemin est bon

const VueSalle = ({ room, onInteract, collectedItems = [] }) => {
  if (!room) return <div className="loading">Chargement de la salle...</div>;

  const getArrowRotation = (direction) => {
    switch (direction) {
      case "up":
        return "rotate(-90deg)";
      case "down":
        return "rotate(90deg)";
      case "left":
        return "rotate(180deg)";
      case "right":
        return "rotate(0deg)";
      default:
        return "rotate(0deg)";
    }
  };

  return (
    <div
      className="scene-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* 1. IMAGE DE FOND */}
      <img
        src={room.background}
        alt={room.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* 2. ZONES DE NAVIGATION (Avec les Flèches) */}
      {room.exits.map((exit, index) => (
        <div
          key={`exit-${index}`}
          onClick={() => onInteract({ type: "navigation", ...exit })}
          className="hitbox exit-zone"
          title={exit.label}
          style={{
            position: "absolute",
            cursor: "pointer",
            zIndex: 10,
            ...exit.style,
            // Flexbox pour centrer la flèche dans la zone de clic
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="nav-arrow"
            // C'est ici que la magie opère :
            style={{
              width: "40px", // Taille de la flèche
              height: "40px",
              color: "white", // Ou 'rgba(255,255,255,0.8)'
              filter: "drop-shadow(0px 0px 5px black)", // Pour la lisibilité
              transition: "transform 0.3s",
              transform: getArrowRotation(exit.arrow), // <--- ROTATION DYNAMIQUE
            }}
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}

      {/* 3. ZONES D'INTERACTION (Objets / Puzzles) */}
      {room.interactables.map((item) => {
        const isCollected = collectedItems.includes(item.itemId || item.id);
        // On n'affiche pas les objets déjà ramassés
        if ((item.type === "loot" || item.type === "key") && isCollected)
          return null;

        return (
          <div
            key={item.id}
            onClick={() => onInteract(item)}
            className="hitbox item-zone"
            title={item.type === "loot" ? "Ramasser" : "Examiner"}
            style={{
              position: "absolute",
              cursor: "pointer",
              zIndex: 20,
              ...item.style,
            }}
          >
            {/* J'ai supprimé le <span> avec debugTextStyle ici car il causait l'erreur. 
                Les zones d'objets seront invisibles sauf si tu as gardé le CSS .item-zone avec un fond rouge/transparent */}
          </div>
        );
      })}
    </div>
  );
};

export default VueSalle;
