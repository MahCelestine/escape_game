import React from "react";

const VueSalle = ({ room, onInteract, collectedItems = [] }) => {
  if (!room) return <div className="loading">Chargement de la salle...</div>;

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

      {/* 2. ZONES DE NAVIGATION */}
      {room.exits.map((exit, index) => (
        <div
          key={`exit-${index}`}
          onClick={() => onInteract({ type: "navigation", ...exit })}
          className="hitbox exit-zone"
          title={`Aller vers : ${exit.label}`}
          style={{
            position: "absolute",
            cursor: "pointer",
            zIndex: 10,
            ...exit.style,
          }}
        >
          <span style={debugTextStyle}>🚪 {exit.label}</span>
        </div>
      ))}

      {/* 3. ZONES D'INTERACTION */}
      {room.interactables.map((item) => {
        const isCollected = collectedItems.includes(item.itemId || item.id);
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
            <span style={debugTextStyle}>
              {item.type === "loot"
                ? "💎"
                : item.type === "puzzle"
                ? "🔒"
                : "👁️"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- C'EST CE QU'IL MANQUAIT ---
const debugTextStyle = {
  fontSize: "12px",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: "2px",
  pointerEvents: "none",
};

export default VueSalle;
