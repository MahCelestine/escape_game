import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css"; // Assure-toi d'avoir tes styles de base

function EcranFin() {
  const navigate = useNavigate();
  const location = useLocation();

  // On récupère les données passées par JeuPrincipal
  // Si on accède à la page directement sans jouer, on met des valeurs par défaut
  const { win, reason, inventory, timeLeft } = location.state || {
    win: false,
    reason: "Accès non autorisé",
    inventory: [],
    timeLeft: 0,
  };

  // Calcul du Score (Valeur totale des objets volés, hors triggers)
  const totalValue = inventory
    .filter((item) => item.type !== "trigger")
    .reduce((total, item) => total + (item.value || 0), 0);

  // Style dynamique selon Victoire (Vert/Or) ou Défaite (Rouge)
  const themeColor = win ? "#4ade80" : "#ef4444";
  const bgColor = win ? "rgba(20, 83, 45, 0.9)" : "rgba(127, 29, 29, 0.9)";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        backgroundImage: "url('/assets/img/background_flou.jpg')", // Mets une image de fond floue si tu as
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: "40px",
          borderRadius: "15px",
          border: `2px solid ${themeColor}`,
          textAlign: "center",
          maxWidth: "600px",
          width: "90%",
          boxShadow: `0 0 30px ${themeColor}`,
        }}
      >
        {/* TITRE */}
        <h1
          style={{
            color: themeColor,
            fontSize: "48px",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          {win ? "MISSION ACCOMPLIE" : "MISSION ÉCHOUÉE"}
        </h1>

        <p style={{ fontSize: "18px", color: "#ccc", marginBottom: "30px" }}>
          {reason}
        </p>

        {/* SCORE */}
        <div
          style={{
            margin: "30px 0",
            borderTop: "1px solid #333",
            borderBottom: "1px solid #333",
            padding: "20px 0",
          }}
        >
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            BUTIN RÉCUPÉRÉ
          </h2>

          <div
            style={{ fontSize: "36px", color: "#fbbf24", fontWeight: "bold" }}
          >
            ${totalValue.toLocaleString()}
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {inventory.filter((i) => i.type !== "trigger").length === 0 && (
              <span style={{ color: "#666" }}>Aucun objet volé...</span>
            )}

            {inventory
              .filter((i) => i.type !== "trigger")
              .map((item, index) => (
                <div
                  key={index}
                  title={item.name}
                  style={{ position: "relative" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid #555",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* BOUTONS */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/")} // Retour au menu ou recharge le jeu
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: themeColor,
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {win ? "Nouvelle Mission" : "Réessayer"}
          </button>

          {/* Si tu as un menu principal */}
          {/* <button onClick={() => navigate("/menu")} ... >Menu</button> */}
        </div>
      </div>
    </div>
  );
}

export default EcranFin;
