import React, { useState, useEffect } from "react";

const PuzzleSliding = ({ data, onSuccess }) => {
  const SIZE = 3;
  const TILE_COUNT = SIZE * SIZE;
  const GRID_SIZE = 300; // Taille totale du puzzle en pixels
  const TILE_SIZE = GRID_SIZE / SIZE; // Taille d'une case (ex: 100px)

  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    // 1. État résolu
    let initialTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);

    // 2. Mélange (Shuffle valide)
    let currentTiles = [...initialTiles];
    let emptyIdx = TILE_COUNT - 1;
    let previousIdx = null;

    for (let i = 0; i < 100; i++) {
      const neighbors = getNeighbors(emptyIdx);
      const candidates = neighbors.filter((n) => n !== previousIdx);
      const randomNeighbor =
        candidates[Math.floor(Math.random() * candidates.length)];

      if (randomNeighbor !== undefined) {
        [currentTiles[emptyIdx], currentTiles[randomNeighbor]] = [
          currentTiles[randomNeighbor],
          currentTiles[emptyIdx],
        ];
        previousIdx = emptyIdx;
        emptyIdx = randomNeighbor;
      }
    }

    setTiles(currentTiles);
  }, []);

  const getNeighbors = (index) => {
    const neighbors = [];
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;

    if (row > 0) neighbors.push(index - SIZE);
    if (row < SIZE - 1) neighbors.push(index + SIZE);
    if (col > 0) neighbors.push(index - 1);
    if (col < SIZE - 1) neighbors.push(index + 1);

    return neighbors;
  };

  const handleTileClick = (index) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(TILE_COUNT - 1);
    const neighbors = getNeighbors(emptyIndex);

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      checkWin(newTiles);
    }
  };

  const checkWin = (currentTiles) => {
    const isWin = currentTiles.every((val, index) => val === index);
    if (isWin) {
      setIsSolved(true);
      setTimeout(() => onSuccess(), 500);
    }
  };

  // --- FONCTION DE TRICHE (DEBUG) ---
  const handleAutoSolve = () => {
    // On remet les tuiles dans l'ordre parfait : [0, 1, 2, ... 8]
    const solvedState = Array.from({ length: TILE_COUNT }, (_, i) => i);
    setTiles(solvedState);
    checkWin(solvedState); // On lance la vérification de victoire
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <p style={{ color: "#ccc", textAlign: "center" }}>
        {data.description || "Reconstituez l'image."}
      </p>

      {/* CONTENEUR DU PUZZLE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gap: "2px",
          width: `${GRID_SIZE}px`, // 300px
          height: `${GRID_SIZE}px`,
          backgroundColor: "#334155",
          border: isSolved ? "4px solid #4ade80" : "4px solid #fbbf24", // Vert si gagné
          padding: "2px",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        {tiles.map((tileValue, index) => {
          // Calcul de la position correcte de ce morceau d'image
          const correctRow = Math.floor(tileValue / SIZE);
          const correctCol = tileValue % SIZE;

          const isEmpty = tileValue === TILE_COUNT - 1;

          return (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              style={{
                width: "100%",
                height: "100%",
                cursor: isEmpty || isSolved ? "default" : "pointer",
                borderRadius: "4px",

                // --- CORRECTION DE L'IMAGE ---
                opacity: isEmpty && !isSolved ? 0 : 1, // La case vide apparaît quand on gagne

                backgroundImage: `url(${data.image})`,

                // 1. On force l'image à faire EXACTEMENT 300px x 300px
                // Cela écrase l'image si elle n'est pas carrée, mais assure que le puzzle est parfait.
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,

                // 2. On positionne l'image en négatif (on décale l'image vers le haut/gauche)
                // Ex: pour la case (1,0) [milieu haut], on décale de -100px en X
                backgroundPosition: `-${correctCol * TILE_SIZE}px -${
                  correctRow * TILE_SIZE
                }px`,

                transition: "all 0.2s",
              }}
            />
          );
        })}
      </div>

      {/* --- BOUTON DE TRICHE --- */}
      {!isSolved && (
        <button
          onClick={handleAutoSolve}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#ef4444", // Rouge pour dire "Attention triche"
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "10px",
            opacity: 0.7,
          }}
          title="Pour les développeurs pressés"
        >
          🛠️ RÉSOLUTION AUTO
        </button>
      )}

      {/* Aide visuelle : Modèle */}
      <div style={{ textAlign: "center", fontSize: "12px", color: "#888" }}>
        Modèle :
        <img
          src={data.image}
          alt="Target"
          style={{
            width: "50px",
            marginLeft: "10px",
            verticalAlign: "middle",
            border: "1px solid white",
          }}
        />
      </div>
    </div>
  );
};

export default PuzzleSliding;
