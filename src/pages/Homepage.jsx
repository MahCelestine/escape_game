import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Homepage.css";
import galleryImage from "../assets/img/Musée De Nuit.jpg";

function Homepage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/escape");
  };

  return (
    <div className="home-container">
      {/* Image de fond */}
      <div
        className="home-bg-image"
        style={{
          backgroundImage: `url(${galleryImage})`,
        }}
      />

      <div className="home-overlay" />

      <div className="home-content fade-in">
        <h1 className="home-title">LE CASSE</h1>
        <h2 className="home-subtitle glow-gold">DU SIÈCLE</h2>

        <p className="home-description">
          Infiltrez le musée, dérobez les trésors et trouvez une sortie avant
          que le temps ne soit écoulé.
        </p>

        {/* Bouton */}
        <button onClick={handleStart} className="start-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="btn-icon"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          COMMENCER LE CASSE
        </button>

        {/* Statistiques */}
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">objets à voler</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">salles à explorer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
