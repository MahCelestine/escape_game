import React, { useState, useEffect } from "react";

const PuzzleSliding = ({ data, onSuccess }) => {
  const SIZE = 3; // Grille de 3x3 (C'est plus jouable sur mobile que 4x4)
  const TILE_COUNT = SIZE * SIZE;

  // tiles = tableau des positions actuelles.
  // Si tiles[0] vaut 0, la pièce n°0 est à la position 0 (correct).
  // La valeur (TILE_COUNT - 1) représente la case vide.
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  // Initialisation et Mélange
  useEffect(() => {
    // 1. On crée l'état résolu : [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let initialTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);

    // 2. On mélange (Shuffle)
    // Pour être sûr que le puzzle soit SOLUBLE, on ne mélange pas au hasard.
    // On part de l'état résolu et on fait des mouvements aléatoires valides.
    let currentTiles = [...initialTiles];
    let emptyIdx = TILE_COUNT - 1; // La dernière case est vide au début
    let previousIdx = null;

    for (let i = 0; i < 100; i++) {
      // 100 mouvements aléatoires
      const neighbors = getNeighbors(emptyIdx);
      // On évite de revenir en arrière immédiatement pour bien mélanger
      const candidates = neighbors.filter((n) => n !== previousIdx);
      const randomNeighbor =
        candidates[Math.floor(Math.random() * candidates.length)];

      // On échange
      [currentTiles[emptyIdx], currentTiles[randomNeighbor]] = [
        currentTiles[randomNeighbor],
        currentTiles[emptyIdx],
      ];
      previousIdx = emptyIdx;
      emptyIdx = randomNeighbor;
    }

    setTiles(currentTiles);
  }, []);

  // Obtenir les indices voisins valides (Haut, Bas, Gauche, Droite)
  const getNeighbors = (index) => {
    const neighbors = [];
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;

    if (row > 0) neighbors.push(index - SIZE); // Haut
    if (row < SIZE - 1) neighbors.push(index + SIZE); // Bas
    if (col > 0) neighbors.push(index - 1); // Gauche
    if (col < SIZE - 1) neighbors.push(index + 1); // Droite

    return neighbors;
  };

  const handleTileClick = (index) => {
    if (isSolved) return;

    // Trouver où est la case vide
    const emptyIndex = tiles.indexOf(TILE_COUNT - 1);

    // Vérifier si on a cliqué sur un voisin de la case vide
    const neighbors = getNeighbors(emptyIndex);
    if (neighbors.includes(index)) {
      // SWAP : On échange les positions dans le tableau
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);

      // Vérifier la victoire
      checkWin(newTiles);
    }
  };

  const checkWin = (currentTiles) => {
    // Est-ce que chaque tuile est à sa place (0 à 0, 1 à 1, etc.) ?
    const isWin = currentTiles.every((val, index) => val === index);
    if (isWin) {
      setIsSolved(true);
      setTimeout(() => {
        onSuccess();
      }, 500); // Petite pause pour voir l'image complète
    }
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gap: "2px",
          width: "300px", // Taille fixe du puzzle
          height: "300px",
          backgroundColor: "#334155",
          border: "4px solid #fbbf24",
          padding: "2px",
          borderRadius: "8px",
        }}
      >
        {tiles.map((tileValue, index) => {
          // Coordonnées de la "bonne" position de ce morceau d'image
          // tileValue 0 => x=0, y=0
          // tileValue 1 => x=1, y=0 ...
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
                cursor: isEmpty ? "default" : "pointer",
                // L'ASTUCE IMAGE :
                backgroundImage: isEmpty ? "none" : `url(${data.image})`,
                backgroundSize: `${SIZE * 100}%`, // L'image doit couvrir toute la grille virtuelle
                backgroundPosition: `${correctCol * (100 / (SIZE - 1))}% ${
                  correctRow * (100 / (SIZE - 1))
                }%`,

                opacity: isEmpty ? 0 : 1, // La case vide est invisible
                transition: "transform 0.2s",
                borderRadius: "4px",
              }}
            />
          );
        })}
      </div>

      {/* Aide visuelle : L'image modèle en tout petit */}
      <div
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "12px",
          color: "#888",
        }}
      >
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
