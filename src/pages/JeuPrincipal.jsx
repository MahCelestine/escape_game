import React, { useState } from "react"; // J'ai retiré useEffect car on ne s'en sert plus
import VueSalle from "../components/VueSalle";
import { ROOMS_DATA, GAME_CONFIG, ITEMS_DB } from "../data/data";
import Inventaire from "../components/Inventaire";
import HUD from "../components/HUD"

function JeuPrincipal() {
  // --- 1. LES ÉTATS (STATE) ---
  const [currentRoomId, setCurrentRoomId] = useState(GAME_CONFIG.startingRoom);
  const [inventory, setInventory] = useState([]);

  // J'ai enlevé les états du timer (timeLeft, timerActive) pour nettoyer

  // --- 2. LA FONCTION D'INTERACTION ---
  const handleInteraction = (item) => {
    // [SUPPRIMÉ] Le bloc qui déclenchait le timer est parti.

    // Gérer les types d'actions
    switch (item.type) {
      case "navigation":
        setCurrentRoomId(item.target);
        break;

      case "loot":
        // On vérifie si l'objet existe dans la DB
        const fullItem = ITEMS_DB[item.itemId];
        if (fullItem) {
          setInventory([...inventory, fullItem]);
          // Petit feedback visuel simple (alert pour l'instant)
          alert(`Volé : ${fullItem.name} ! (Valeur: $${fullItem.value})`);
        }
        break;

      case "puzzle":
        const code = prompt(item.lockedMessage);
        if (code === item.codeRequired) {
          const keyItem = ITEMS_DB[item.itemId];
          // On ajoute la clé à l'inventaire
          setInventory([...inventory, keyItem]);
          alert("Succès ! Casier ouvert et clé récupérée.");
        } else {
          alert("Code faux !");
        }
        break;

      case "info":
      case "clue":
        // Affiche juste le message d'info
        alert(item.dialogue);
        break;

      case "exit":
        // Logique de fin simple pour tester
        const hasKey = inventory.some((i) => i.id === item.requiredItem);
        if (hasKey) {
          alert("VICTOIRE ! Tu es sorti par les égouts !");
        } else {
          alert(item.lockedMessage);
        }
        break;

      default:
        console.log("Interaction inconnue", item);
    }
  };

  // --- 3. LE RENDU ---
  const currentRoom = ROOMS_DATA[currentRoomId];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {/* HUD SIMPLIFIÉ (Sans Chrono) */}

      {/* Ici on mettra le composant HUD avec le timer et le conteur des points */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 100,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
              <HUD items={inventory} />
        {/* <div>
          Sac : {inventory.length} / {GAME_CONFIG.maxInventorySlots} objets
        </div>
        <div>
          Valeur : ${inventory.reduce((total, item) => total + item.value, 0)}
        </div> */}
      </div>


      <Inventaire items={inventory} />

      {/* LA VUE DE LA SALLE */}
      <VueSalle
        room={currentRoom}
        onInteract={handleInteraction}
        // On passe la liste des IDs pour que VueSalle sache quoi cacher
        collectedItems={inventory.map((item) => item.id)}
      />
    </div>
  );
}

export default JeuPrincipal;
