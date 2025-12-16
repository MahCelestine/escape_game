import galleryBg from "../assets/img/Galerie.jpg";
import officeBg from "../assets/img/Bureau.jpg";
import storageBg from "../assets/img/Stockage.jpg";
import surveillanceBg from "../assets/img/Salle de surveillance casier fermé.jpg";
import basementBg from "../assets/img/Sous-sol.jpg";

export const GAME_CONFIG = {
  startingRoom: "gallery",
  maxInventorySlots: 7,
};

export const ITEMS_DB = {
  diamond: {
    id: "diamond",
    name: "Diamant Noir",
    type: "loot",
    value: 25000,
    image: "/assets/icons/diamond.png",
    description: "Un diamant d'une pureté exceptionnelle volé au directeur.",
  },
  necklace: {
    id: "necklace",
    name: "Collier de la Reine",
    type: "loot",
    value: 26000,
    image: "/assets/icons/necklace.png",
    description: "Des rubis sertis d'or. Très lourd.",
  },
  painting: {
    id: "painting",
    name: "La Toile Perdue",
    type: "loot",
    value: 20000,
    image: "/assets/icons/painting.png",
    description: "Une œuvre inestimable du 17ème siècle.",
  },
  fetish: {
    id: "fetish",
    name: "Fétiche Doré",
    type: "loot",
    value: 13000,
    image: "/assets/icons/fetish.png",
    description: "Une statuette rituelle en or massif.",
  },
  fossil: {
    id: "fossil",
    name: "Doigt Fossilisé",
    type: "loot",
    value: 10500,
    image: "/assets/icons/fossil.png",
    description: "C'est dégoûtant, mais ça vaut une fortune au marché noir.",
  },
  coin: {
    id: "coin",
    name: "Drachme Antique",
    type: "loot",
    value: 5500,
    image: "/assets/icons/coin.png",
    description: "Une petite pièce rare retrouvée sous une étagère.",
  },
  sewer_key: {
    id: "sewer_key",
    name: "Clé Rouillée",
    type: "key",
    value: 0,
    image: "/assets/icons/key.png",
    description: "Une vieille clé marquée 'MAINTENANCE / SOUS-SOL'.",
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
        style: { top: "30%", left: "2%", width: "10%", height: "50%" }, // left: 2% pour coller au bord gauche
      },
      {
        target: "storage",
        label: "Réserve",
        arrow: "right",
        style: { top: "30%", left: "88%", width: "10%", height: "50%" }, // left: 88% pour coller au bord droit
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
        arrow: "down",
        style: { top: "80%", left: "30%", width: "40%", height: "10%" },
      },
      {
        target: "surveillance",
        label: "Salle Sécu",
        arrow: "right",
        style: { top: "30%", left: "85%", width: "10%", height: "40%" },
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
        arrow: "down",

        style: { top: "80%", left: "30%", width: "40%", height: "10%" },
      },
      {
        target: "basement",
        label: "Descendre au Sous-sol",
        arrow: "right",
        style: { top: "40%", left: "80%", width: "15%", height: "40%" },
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
        arrow: "down",
        style: { top: "80%", left: "30%", width: "40%", height: "10%" },
      },
    ],
    interactables: [
      {
        id: "screens",
        type: "info",
        dialogue: "Je me vois sur les caméras... Il faut que je fasse vite !",
        style: { top: "30%", left: "20%", width: "60%", height: "20%" },
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
        arrow: "up", //
        style: { top: "5%", left: "30%", width: "40%", height: "10%" }, // En haut de l'écran
      },
    ],
    interactables: [
      {
        id: "exit_gate",
        type: "exit",
        requiredItem: "sewer_key",
        lockedMessage:
          "La grille est fermée par un gros cadenas rouillé. Il me faut la clé.",
        successMessage: "La clé tourne ! La grille s'ouvre. La liberté !",
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
