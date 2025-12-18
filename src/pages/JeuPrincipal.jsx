import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VueSalle from "../components/VueSalle";
import { ROOMS_DATA, GAME_CONFIG, ITEMS_DB } from "../data/data";
import Inventaire from "../components/Inventaire";
import HUD from "../components/HUD";
import PuzzleModal from "../components/PuzzleModal";
import BoiteDialogue from "../components/BoiteDialogue";
import IndiceModal from "../components/IndiceModal";

import AmbianceSound from "../assets/audio/musique fond.mp3";

const GAME_DURATION = 20 * 60 * 1000;

function JeuPrincipal() {
  // --- 1. LES ÉTATS (STATE) ---
  const [currentRoomId, setCurrentRoomId] = useState(GAME_CONFIG.startingRoom);
  const [inventory, setInventory] = useState([]);
  const [activePuzzle, setActivePuzzle] = useState(null);

  const [dialogueMessage, setDialogueMessage] = useState(null);
  const [dialogueTitle, setDialogueTitle] = useState(null);

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [activeClue, setActiveClue] = useState(null);
  // const pour le timer

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasTimerStarted = useRef(false);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateTimeLeft = (startTime, duration) => {
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = duration - elapsed;
    return Math.max(0, remaining);
  };

  const startTimer = () => {
    if (isTimerRunning || isTimerFinished) return;

    startTimeRef.current = Date.now();
    setIsTimerRunning(true);
    setGameStarted(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;

      const remaining = calculateTimeLeft(startTimeRef.current, GAME_DURATION);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleTimeUp();
      }
    }, 100);
  };

  const pauseTimer = () => {
    if (!isTimerRunning || isTimerFinished) return;

    clearInterval(intervalRef.current);
    setIsTimerRunning(false);

    if (startTimeRef.current) {
      const remaining = calculateTimeLeft(startTimeRef.current, GAME_DURATION);
      setTimeLeft(remaining);
    }
  };

  const resumeTimer = () => {
    if (isTimerRunning || isTimerFinished) return;

    if (!startTimeRef.current) {
      startTimer();
      return;
    }

    const now = Date.now();
    const elapsed = GAME_DURATION - timeLeft;
    startTimeRef.current = now - elapsed;

    setIsTimerRunning(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const remaining = calculateTimeLeft(startTimeRef.current, GAME_DURATION);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleTimeUp();
      }
    }, 100);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    setIsTimerFinished(false);
    setGameStarted(false);
    setTimeLeft(GAME_DURATION);
    startTimeRef.current = null;
  };

  const handleTimeUp = () => {
    clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    setIsTimerFinished(true);
    setTimeLeft(0);
    startTimeRef.current = null;

    navigate("/Fin", {
      state: {
        win: false,
        reason: "Le temps est écoulé. La police est arrivée.",
        inventory: inventory,
      },
    });
  };

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resumeAudio = () => {
            audio.play();
            document.removeEventListener("click", resumeAudio);
          };
          document.addEventListener("click", resumeAudio);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (inventory.length == 1 && !hasTimerStarted.current) {
      startTimer();
    }
  }, [inventory]);

  // --- Nettoyage du timer ---
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // --- 2. LA FONCTION D'INTERACTION ---
  const handleInteraction = (item) => {
    if (gameStarted && !isTimerRunning) return;
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
          if (fullItem.type !== "trigger") {
            setDialogueTitle("Objet volé !");
            setDialogueMessage(`${fullItem.name} (Valeur: $${fullItem.value})`);
          }
        }
        break;

      case "puzzle":
        setActivePuzzle(item);
        break;

      case "info":
      case "clue":
        if (item.image && item.type === "clue") {
          setActiveClue(item);
        } else {
          setDialogueMessage(item.description || item.dialogue);
          setDialogueTitle(item.type === "clue" ? "Indice" : "Information");
        }
        break;

      case "exit":
        // Logique de fin simple pour tester
        const hasKey = inventory.some((i) => i.id === item.requiredItem);
        if (hasKey) {
          clearInterval(intervalRef.current);
          setIsTimerRunning(false);
          navigate("/Fin", {
            state: {
              win: true,
              reason:
                item.successMessage ||
                "Mission accomplie ! Vous vous êtes échappé.",
              inventory: inventory,
              timeLeft: timeLeft,
            },
          });
        } else {
          setDialogueMessage(item.lockedMessage);
          setDialogueTitle(null);
        }
        break;

      default:
        console.log("Interaction inconnue", item);
    }
  };

  // --- 3. LE RENDU ---
  const currentRoom = ROOMS_DATA[currentRoomId];

  // Puzzle

  const handlePuzzleSuccess = () => {
    if (!activePuzzle) return;

    // On ferme le modal tout de suite
    setActivePuzzle(null);

    // On cherche l'objet
    const rewardItem = ITEMS_DB[activePuzzle.itemId];

    // SÉCURITÉ : Si l'objet n'existe pas dans la DB, on ne fait rien (évite l'écran blanc)
    if (!rewardItem) {
      console.error(
        `ERREUR: L'objet "${activePuzzle.itemId}" est introuvable dans ITEMS_DB.`
      );
      return;
    }

    setInventory((prev) => {
      // On évite les doublons par sécurité
      const exists = prev.find((i) => i.id === rewardItem.id);
      if (exists) return prev;
      return [...prev, rewardItem];
    });

    // 3. Feedback
    if (rewardItem.type !== "trigger") {
      setDialogueTitle("Système piraté !");
      setDialogueMessage(`Vous avez obtenu : ${rewardItem.name}`);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <audio
        ref={audioRef}
        src={AmbianceSound}
        loop
        style={{ display: "none" }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 100,
          color: "white",
          padding: "1%",
          borderRadius: "8px",
          width: "98%",
        }}
      >
        <HUD
          timeLeft={timeLeft}
          isRunning={isTimerRunning}
          isFinished={isTimerFinished}
          items={inventory.filter((item) => item.type !== "trigger")}
          onStart={startTimer}
          formatTime={formatTime}
        />
        {/* <div>
          Sac : {inventory.length} / {GAME_CONFIG.maxInventorySlots} objets
        </div>
        <div>
          Valeur : ${inventory.reduce((total, item) => total + item.value, 0)}
        </div> */}
      </div>

      <Inventaire
        items={inventory.filter((item) => item.type !== "trigger")}
        timeLeft={timeLeft}
        isRunning={isTimerRunning}
        isFinished={isTimerFinished}
        onPause={pauseTimer}
        onResume={resumeTimer}
        onReset={resetTimer}
        onStart={startTimer}
        formatTime={formatTime}
      />

      {/* LA VUE DE LA SALLE */}
      <VueSalle
        room={currentRoom}
        onInteract={handleInteraction}
        // On passe la liste des IDs pour que VueSalle sache quoi cacher
        collectedItems={inventory.map((item) => item.id)}
        disabled={isOptionOpen && gameStarted && !isTimerRunning}
      />

      {gameStarted && !isTimerRunning && !isTimerFinished && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Filtre noir semi-transparent
            zIndex: 49, // Au-dessus de la scène mais en-dessous du HUD et inventaire
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none", // Permet de cliquer à travers si nécessaire
          }}
        ></div>
      )}

      <IndiceModal clue={activeClue} onClose={() => setActiveClue(null)} />

      <PuzzleModal
        puzzle={activePuzzle}
        onClose={() => setActivePuzzle(null)}
        onSuccess={handlePuzzleSuccess}
      />

      <BoiteDialogue
        message={dialogueMessage}
        title={dialogueTitle}
        onClose={() => {
          setDialogueMessage(null);
          setDialogueTitle(null);
        }}
        duration={3000} // 3 secondes, mettre 0 pour fermeture manuelle uniquement
      />
    </div>
  );
}

export default JeuPrincipal;
