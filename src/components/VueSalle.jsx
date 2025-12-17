import React from "react";
import "../assets/css/VueSalle.css"; // Assure-toi que le chemin est bon

const VueSalle = ({ room, onInteract, collectedItems = [], disabled = false }) => {
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
        // Bloquer les interactions quand disabled est true
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1, // Optionnel : assombrir légèrement
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
          filter: disabled ? "brightness(0.5)" : "brightness(1)",
          transition: "filter 0.3s ease",
        }}
      />

      {/* 2. ZONES DE NAVIGATION (Avec les Flèches) */}
      {room.exits.map((exit, index) => (
        <div
          key={`exit-${index}`}
          onClick={() => !disabled && onInteract({ type: "navigation", ...exit })}
          className="hitbox exit-zone"
          title={disabled ? "" : exit.label}
          style={{
            position: "absolute",
            cursor: disabled ? "default" : "pointer",
            zIndex: 10,
            ...exit.style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="nav-arrow"
            style={{
              width: "40px",
              height: "40px",
              color: "white",
              filter: "drop-shadow(0px 0px 5px black)",
              transition: "transform 0.3s",
              transform: getArrowRotation(exit.arrow),
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
        
        if (
          (item.type === "loot" ||
            item.type === "key" ||
            item.type === "puzzle") &&
          isCollected
        ) {
          return null;
        }

        if (item.visibleIf && !collectedItems.includes(item.visibleIf)) {
          return null;
        }

        if (item.hideIf && collectedItems.includes(item.hideIf)) {
          return null;
        }

        return (
          <div
            key={item.id}
            onClick={(e) => {
              if (disabled || item.type === "decoration") {
                e.stopPropagation();
                return;
              }
              onInteract(item);
            }}
            className={`hitbox ${
              item.type === "decoration" ? "" : "item-zone"
            }`}
            title={item.type === "decoration" ? "" : item.label || "Examiner"}
            style={{
              position: "absolute",
              cursor: disabled || item.type === "decoration" ? "default" : "pointer",
              zIndex: item.zIndex || 20,
              ...item.style,
              opacity: disabled ? 0.5 : 1,
            }}
          ></div>
        );
      })}
      {disabled && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 30,
            pointerEvents: "all", // Bloque tous les clics
            cursor: disabled || item.type === "decoration" ? "default" : "default",
          }}
        />
      )}
    </div>
  );
};

export default VueSalle;
