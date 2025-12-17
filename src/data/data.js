import galleryBg from "../assets/img/Galerie.jpg";
import officeBg from "../assets/img/Bureau.jpg";
import storageBg from "../assets/img/Stockage.jpg";
import surveillanceBg from "../assets/img/Salle de surveillance casier fermé.jpg";

// Vidéo
import basementBg from "../assets/video/Sous-sol.mp4";

// Inventaire Items
import BadgeIcon from "../assets/img/inventory/badge.png";
import DiamondIcon from "../assets/img/inventory/diamant-item.png";
import DoigtIcon from "../assets/img/inventory/doigt-item.png";
import FetishIcon from "../assets/img/inventory/fetiche-item.png";
import JewelryIcon from "../assets/img/inventory/collier.png";
import PaintingIcon from "../assets/img/inventory/Tableau-item.png";
import CoinIcon from "../assets/img/inventory/Pièces ancienne.png";

// Énigme
import FindNumberIMG from "../assets/img/enigma/aquarelle-paper-texture.jpg";
import Sudoku from "../assets/img/enigma/postit.png";
import CodeBaton from "../assets/img/enigma/code5.jpg";
import Taquin from "../assets/img/enigma/enigme2.png";

// Trigger
import TrapdoorOpenIMG from "../assets/img/icons/Trappe Doit Fossilisé.png";
import DeskOpenIMG from "../assets/img/icons/Bureau.png";

// Indices
import NoteIMG from "../assets/img/indices/indice5.png";
import ClueNoteIMG from "../assets/img/indices/camera-indice.jpg";

export const GAME_CONFIG = {
  startingRoom: "gallery",
  maxInventorySlots: 7,
};

export const ITEMS_DB = {
  diamond: {
    id: "diamond",
    name: "Diamant",
    type: "loot",
    value: 45000,
    image: DiamondIcon,
    description: "Un Diamant ??? Ah oui ! Ça valait le coup !",
  },
  jewels: {
    id: "jewels",
    name: "Bijoux",
    type: "loot",
    value: 40000,
    image: JewelryIcon,
    description: "La petite led passe au vert, plus qu’à prendre les bijoux!",
  },
  painting: {
    id: "painting",
    name: "Toile",
    type: "loot",
    value: 18000,
    image: PaintingIcon,
    description: "Bon, j’espère que cette toile en vaut le coup.",
  },
  fetish: {
    id: "fetish",
    name: "Fétiche",
    type: "loot",
    value: 3500,
    image: FetishIcon,
    description:
      "euh… super sa c’est ouvert mais j’ai juste rien fait là- ooooh j’ai compris ! fallait juste pas bouger.",
  },
  fossil: {
    id: "fossil",
    name: "Doigt Fossilisé",
    type: "loot",
    value: 9300,
    image: DoigtIcon,
    description:
      "Fallait juste pousser un peu le placo, mais ce truc vaut vraiment du fric ? J’ai un doute…",
  },
  coin: {
    id: "coin",
    name: "Pièce de monnaie ancienne",
    type: "loot",
    value: 4200,
    image: CoinIcon,
    description:
      "Je connais pas vraiment sa valeur, mais c’est une bonne prise !",
  },
  badge: {
    id: "badge",
    name: "Badge de Sécurité",
    type: "key",
    value: 0,
    image: BadgeIcon,
    description:
      "Un petit badge avec la tête d’un monsieur au visage disgracieux est à l'intérieur. C’est un badge de sécurité ! Très certainement que ça sera utile pour sortir d’ici.",
  },

  // Trigger
  trapdoor_trigger: {
    id: "trapdoor_trigger",
    name: "Trappe Déverrouillée",
    type: "trigger",
    value: 0,
    image: TrapdoorOpenIMG,
    description: "Une trappe caché dans le mur.",
  },
};

export const ROOMS_DATA = {
  // 1. LA GALERIE
  gallery: {
    id: "gallery",
    name: "Grande Galerie",
    background: galleryBg,
    exits: [
      {
        target: "office",
        label: "Bureau",
        arrow: "left",
        style: { top: "40%", left: "2%", width: "10%", height: "20%" }, // left: 2% pour coller au bord gauche
      },
      {
        target: "storage",
        label: "Réserve",
        arrow: "right",
        style: { top: "40%", left: "88%", width: "10%", height: "20%" }, // left: 88% pour coller au bord droit
      },
    ],
    interactables: [
      {
        id: "loot_jewels",
        itemId: "jewels",
        type: "puzzle",
        puzzleType: "SLIDING",
        image: Taquin,
        description:
          "Reconstituez le chef-d'œuvre pour désactiver l'alarme du cadre.",
        style: {
          top: "50%",
          left: "45%",
          width: "10%",
          height: "25%",
        },
      },
    ],
  },

  // 2. LE BUREAU
  office: {
    id: "office",
    name: "Bureau du Directeur",
    background: officeBg,
    exits: [
      {
        target: "gallery",
        label: "Retour Galerie",
        arrow: "right",
        style: { top: "40%", left: "88%", width: "10%", height: "20%" },
      },
      {
        target: "surveillance",
        label: "Salle Sécu",
        arrow: "left",
        style: { top: "40%", left: "2%", width: "10%", height: "20%" },
      },
    ],
    interactables: [
      {
        id: "clue_note",
        type: "clue",
        image: NoteIMG,
        description: "Une image placée sur un livre",
        style: {
          top: "45%",
          left: "75%",
          width: "10%",
          height: "7.5%",
        },
      },
      {
        id: "loot_diamond",
        itemId: "diamond",
        type: "puzzle",
        puzzleType: "DIGICODE",
        solution: "876",
        image: FindNumberIMG,
        description:
          "Ce caisson blindé protège le Diamant. Il faut un code de sécurité.",

        style: {
          top: "32.5%",
          left: "45%",
          width: "10%",
          height: "15%",
        },
      },
      {
        id: "loot_coin",
        itemId: "coin",
        type: "puzzle",
        puzzleType: "DIGICODE",
        solution: "2334",
        image: Sudoku,
        style: {
          top: "55%",
          left: "7.5%",
          width: "45%",
          height: "45%",
        },
      },
    ],
  },

  // 3. LA RÉSERVE
  storage: {
    id: "storage",
    name: "Réserve",
    background: storageBg,
    exits: [
      {
        target: "gallery",
        label: "Retour Galerie",
        arrow: "left",
        style: { top: "40%", left: "2%", width: "10%", height: "20%" },
      },
      {
        target: "basement",
        label: "Descendre au Sous-sol",
        arrow: "down",
        style: { top: "88%", left: "40%", width: "20%", height: "10%" },
      },
      {
        target: "surveillance",
        label: "Salle Sécu",
        arrow: "right",
        style: { top: "40%", left: "88%", width: "10%", height: "20%" },
      },
    ],
    interactables: [
      {
        id: "loot_fetish",
        itemId: "fetish",
        type: "puzzle",
        puzzleType: "PATIENCE",
        description: "Ne bougez surtout pas...",
        dialogue: "Une idole en or...",
        style: {
          top: "40%",
          left: "52%",
          width: "5%",
          height: "15%",
        },
      },

      {
        id: "loot_painting",
        itemId: "painting",
        type: "puzzle",
        puzzleType: "CODE_INPUT",
        solution: "SECRET",
        image: CodeBaton,
        description: "Déchiffrez le message caché.",
        style: {
          top: "65%",
          left: "55%",
          width: "7.5%",
          height: "35%",
        },
      },
    ],
  },

  // 4. SALLE DE SURVEILLANCE
  surveillance: {
    id: "surveillance",
    name: "Salle de Sécurité",
    background: surveillanceBg,
    exits: [
      {
        target: "office",
        label: "Retour Bureau",
        arrow: "right",
        style: { top: "40%", left: "88%", width: "10%", height: "20%" },
      },
      {
        target: "storage",
        label: "Réserve",
        arrow: "left",
        style: { top: "40%", left: "2%", width: "10%", height: "20%" },
      },
    ],
    interactables: [
      {
        id: "clue_code",
        type: "clue",
        image: NoteIMG,
        description: "Une feuille placée sur le bureau",
        style: {
          top: "80%",
          left: "67.5%",
          width: "10%",
          height: "5%",
        },
      },
      {
        id: "locker_puzzle",
        itemId: "badge",
        type: "puzzle",
        puzzleType: "DIGICODE",
        solution: "",

        description: `PROTECTION VITRINE
        Le code est composé de 4 chiffres.
        - Aucun chiffre n’est répété
        - Le 1er chiffre est pair
        - Le 2e est le triple du 4e
        - Le 3e est la somme du 1er et du 4e
        - La somme totale des chiffres vaut 18
        Quel est le code ?`,

        clue: "Indice : Toutes les énigmes ne se résolvent pas par un code (Laissez vide et validez).",
        lockedMessage: "C'est verrouillé électroniquement.",

        successMessage:
          "Bip ! Le casier s'ouvre. Il y a un badge d'accès à l'intérieur.",

        style: {
          top: "30%",
          left: "10%",
          width: "15%",
          height: "60%",
        },
      },
    ],
  },

  // 5. SOUS-SOL
  basement: {
    id: "basement",
    name: "Tunnel de Maintenance",
    background: basementBg,
    backgroundType: "video",
    exits: [
      {
        target: "storage",
        label: "Remonter",
        arrow: "up",
        style: { top: "12.5%", left: "40%", width: "20%", height: "10%" },
      },
    ],
    interactables: [
      {
        id: "exit_gate",
        type: "exit",
        requiredItem: "badge",
        lockedMessage:
          "La porte blindée est verrouillée. Il y a un lecteur de badge rouge.",
        successMessage: "BIP VALIDÉ ! La porte s'ouvre.",
        style: {
          top: "35%",
          left: "40%",
          width: "20%",
          height: "40%",
        },
      },

      {
        id: "wall_puzzle",
        itemId: "trapdoor_trigger",
        type: "puzzle",
        puzzleType: "HIDDEN_WORD",
        description: "Tu ne trouveras [rien] ici.",
        style: {
          top: "62.5%",
          left: "15%",
          width: "15%",
          height: "25%",
          zIndex: 30,
        },
      },

      {
        id: "trapdoor_visual",
        type: "decoration",
        visibleIf: "trapdoor_trigger",
        hideIf: "fossil",
        style: {
          top: "35%",
          left: "13%",
          width: "50%",
          height: "80%",
          backgroundImage: `url(${TrapdoorOpenIMG})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          zIndex: 15,
          pointerEvents: "none",
        },
      },

      {
        id: "loot_fossil_real",
        itemId: "fossil",
        type: "loot",
        visibleIf: "trapdoor_trigger",
        dialogue: "Berk... J'ai récupéré le doigt.",
        style: {
          top: "77.5%",
          left: "18.5%",
          width: "6%",
          height: "8%",
          zIndex: 25,
        },
      },
    ],
  },
};
