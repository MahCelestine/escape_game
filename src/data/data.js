import galleryBg from "../assets/img/Galerie.jpg";
import officeBg from "../assets/img/Bureau.jpg";
import storageBg from "../assets/img/Stockage.jpg";
import surveillanceBg from "../assets/img/Salle de surveillance casier fermé.jpg";
import basementBg from "../assets/img/Sous-sol.jpg";

import BadgeIcon from "../assets/img/icons/Badge.png";

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
    image: "/assets/icons/diamond.png",
    description: "Un Diamant ??? Ah oui ! Ça valait le coup !",
  },
  necklace: {
    id: "jewels",
    name: "Bijoux",
    type: "loot",
    value: 40000,
    image: "/assets/icons/necklace.png",
    description: "La petite led passe au vert, plus qu’à prendre les bijoux!",
  },
  painting: {
    id: "painting",
    name: "Toile",
    type: "loot",
    value: 18000,
    image: "/assets/icons/painting.png",
    description: "Bon, j’espère que cette toile en vaut le coup.",
  },
  fetish: {
    id: "fetish",
    name: "Fétiche",
    type: "loot",
    value: 3500,
    image: "/assets/icons/fetish.png",
    description:
      "euh… super sa c’est ouvert mais j’ai juste rien fait là- ooooh j’ai compris ! fallait juste pas bouger.",
  },
  fossil: {
    id: "fossil",
    name: "Doigt Fossilisé",
    type: "loot",
    value: 9300,
    image: "/assets/icons/fossil.png",
    description:
      "Fallait juste pousser un peu le placo, mais ce truc vaut vraiment du fric ? J’ai un doute…",
  },
  coin: {
    id: "coin",
    name: "Pièce de monnaie ancienne",
    type: "loot",
    value: 4200,
    image: "/assets/icons/coin.png",
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
        id: "loot_necklace",
        itemId: "necklace",
        type: "puzzle",
        puzzleType: "DIGICODE",
        solution: "",
        description: `PROTECTION VITRINE... (le texte)...`,
        clue: "Indice : Toutes les énigmes ne se résolvent pas par un code (Laissez vide et validez).",
        style: { top: "45%", left: "25%", width: "8%", height: "8%" },
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
        id: "loot_diamond",
        itemId: "diamond",
        type: "loot",
        collected: false,
        dialogue: "BINGO ! Le fameux diamant noir !",
        style: { top: "35%", left: "45%", width: "10%", height: "10%" },
      },
      {
        id: "flavor_pc",
        type: "info",
        dialogue:
          "L'ordinateur est verrouillé. Il y a une photo de chat en fond d'écran.",
        style: { top: "55%", left: "30%", width: "15%", height: "10%" },
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
        type: "loot",
        collected: false,
        dialogue: "Une idole en or...",
        style: { top: "60%", left: "20%", width: "8%", height: "10%" },
      },
      {
        id: "loot_coin",
        itemId: "coin",
        type: "loot",
        collected: false,
        dialogue: "Une pièce romaine !",
        style: { top: "30%", left: "10%", width: "5%", height: "5%" },
      },
      {
        id: "loot_painting",
        itemId: "painting",
        type: "loot",
        collected: false,
        dialogue: "Attention à ne pas déchirer la toile...",
        style: { top: "30%", left: "60%", width: "12%", height: "15%" },
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
        id: "screens",
        type: "info",
        dialogue: "Je me vois sur les caméras... Il faut que je fasse vite !",
        style: { top: "30%", left: "20%", width: "60%", height: "20%" },
      },
      {
        id: "locker_puzzle",
        itemId: "badge", // C'est bien le badge qu'on gagne
        type: "puzzle",

        // --- MISE À JOUR POUR LE SYSTEME DE PUZZLE MODERNE ---
        puzzleType: "DIGICODE", // Important pour ouvrir le bon composant
        solution: "1923", // La réponse attendue

        description:
          "Ce casier est protégé par un code numérique. Une date peut-être ?",
        lockedMessage: "C'est verrouillé électroniquement.",

        // Texte mis à jour : On parle d'un badge maintenant
        successMessage:
          "Bip ! Le casier s'ouvre. Il y a un badge d'accès à l'intérieur.",

        style: { top: "50%", left: "50%", width: "10%", height: "30%" },
      },
    ],
  },

  // 5. SOUS-SOL
  basement: {
    id: "basement",
    name: "Tunnel de Maintenance",
    background: basementBg,
    exits: [
      {
        target: "storage",
        label: "Remonter",
        arrow: "up",
        style: { top: "10%", left: "40%", width: "20%", height: "10%" },
      },
    ],
    interactables: [
      {
        id: "exit_gate",
        type: "exit",
        requiredItem: "badge", // L'ID de l'item requis

        // Textes mis à jour pour coller au contexte "Badge"
        lockedMessage:
          "La porte blindée est verrouillée. Il y a un lecteur de badge rouge.",
        successMessage:
          "BIP VALIDÉ ! Le voyant passe au vert et la porte s'ouvre. La liberté !",

        style: { top: "60%", left: "35%", width: "30%", height: "20%" },
      },
      {
        id: "loot_fossil",
        itemId: "fossil",
        type: "loot",
        collected: false,
        dialogue: "Un doigt ? Sérieusement ?",
        style: { top: "75%", left: "50%", width: "5%", height: "5%" },
      },
    ],
  },
};
