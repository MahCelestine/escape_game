import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WinVidéo from "../assets/video/Fin Escape Game.mp4";
import "../assets/css/Homepage.css";

function EcranFin() {
  const navigate = useNavigate();
  const location = useLocation();

  // On récupère les données
  const { win, reason, inventory } = location.state || {
    win: false,
    reason: "Accès non autorisé",
    inventory: [],
    timeLeft: 0,
  };

  // --- NOUVEAU : GESTION DE LA VIDÉO ---
  // On affiche la vidéo SEULEMENT SI on a gagné (win === true)
  const [showVideo, setShowVideo] = useState(win);

  // Fonction pour arrêter la vidéo et montrer le score
  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  // Calcul du Score
  const totalValue = inventory
    .filter((item) => item.type !== "trigger")
    .reduce((total, item) => total + (item.value || 0), 0);

  const themeColor = win ? "#4ade80" : "#ef4444";

  // --- 1. AFFICHAGE DE LA VIDÉO (SI ACTIVE) ---
  if (showVideo) {
    return (
      // CORRECTION ICI : utilisation de className au lieu de style
      <div className="video-fullscreen-container">
        <video
          src={WinVidéo}
          autoPlay
          // controls // Décommente si besoin
          className="fullscreen-video"
          onEnded={handleVideoEnd}
        />

        {/* Bouton "PASSER" */}
        <button onClick={handleVideoEnd} className="skip-button">
          PASSER ▶
        </button>
      </div>
    );
  }

  // --- 2. AFFICHAGE DE L'INTERFACE DE FIN (SI VIDÉO FINIE OU PERDU) ---
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        // Assure-toi que ce chemin d'image est correct ou utilise un import comme pour la vidéo
        backgroundImage: "url('/assets/img/background_flou.jpg')",
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
            onClick={() => navigate("/")}
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
        </div>
      </div>
    </div>
  );
}

export default EcranFin;
