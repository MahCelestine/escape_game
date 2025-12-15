import galleryBg from "../assets/img/gallery.png";
import officeBg from "../assets/img/desk.png";
import storageBg from "../assets/img/reserve.png";
import lobbyBg from "../assets/img/entrance.png";
import lockersBg from "../assets/img/vestiaires.png";
import surveillanceBg from "../assets/img/surveillance.png";
import basementBg from "../assets/img/cave.png";

export const GAME_CONFIG = {
  startingRoom: "gallery", // Le joueur commence ici
  maxInventorySlots: 7,
};

// --- BASE DE DONNÉES DES ITEMS (BUTIN & OBJETS DE QUÊTE) ---
// type: 'loot' (score) ou 'key' (utile pour avancer) ou 'clue' (indice)
export const ITEMS_DB = {
  // --- BUTIN (Score) ---
  diamond: {
    id: "diamond",
    name: "Diamant Noir",
    type: "loot",
    value: 25000,
    image: "/assets/icons/diamond.png", // Chemin vers ton icône
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

  // --- OBJETS DE QUÊTE ---
  sewer_key: {
    id: "sewer_key",
    name: "Clé Rouillée",
    type: "key",
    value: 0,
    image: "/assets/icons/key.png",
    description: "Une vieille clé marquée 'MAINTENANCE / SOUS-SOL'.",
  },
};

// --- LE MONDE (SALLES, NAVIGATION ET INTERACTIONS) ---
/* NOTE SUR LES POSITIONS : 
   Les valeurs top/left/width/height sont en % pour être responsive.
   top: '50%' = au milieu verticalement.
*/

export const ROOMS_DATA = {
  // 1. LA GALERIE (HUB CENTRAL)
  gallery: {
    id: "gallery",
    name: "Grande Galerie",
    background: galleryBg, // Image générée
    exits: [
      {
        target: "office",
        label: "Bureau",
        style: { top: "40%", left: "5%", width: "10%", height: "50%" },
      }, // Porte gauche
      {
        target: "storage",
        label: "Réserve",
        style: { top: "40%", left: "85%", width: "10%", height: "50%" },
      }, // Porte droite
      {
        target: "lobby",
        label: "Vers l'Accueil",
        style: { top: "85%", left: "40%", width: "20%", height: "10%" },
      }, // Retour arrière
    ],
    interactables: [
      {
        id: "loot_necklace",
        itemId: "necklace", // Référence à ITEMS_DB
        type: "loot",
        collected: false, // État initial
        dialogue: "J'ai pris le collier ! Ça brille !",
        style: { top: "45%", left: "25%", width: "8%", height: "8%" }, // Sur une vitrine
      },
    ],
  },

  // 2. LE BUREAU (COFFRE FORT)
  office: {
    id: "office",
    name: "Bureau du Directeur",
    background: officeBg,
    exits: [
      {
        target: "gallery",
        label: "Retour Galerie",
        style: { top: "85%", left: "30%", width: "40%", height: "10%" },
      },
      {
        target: "surveillance",
        label: "Salle Sécu",
        style: { top: "30%", left: "80%", width: "10%", height: "40%" },
      },
    ],
    interactables: [
      {
        id: "loot_diamond",
        itemId: "diamond",
        type: "loot",
        collected: false,
        dialogue: "BINGO ! Le fameux diamant noir !",
        style: { top: "35%", left: "45%", width: "10%", height: "10%" }, // Le coffre au fond
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

  // 3. LA RÉSERVE (FOUILLIS)
  storage: {
    id: "storage",
    name: "Réserve",
    background: storageBg,
    exits: [
      {
        target: "gallery",
        label: "Retour Galerie",
        style: { top: "85%", left: "40%", width: "20%", height: "10%" },
      },
      {
        target: "basement",
        label: "Descendre au Sous-sol",
        style: { top: "40%", left: "75%", width: "15%", height: "40%" },
      }, // Porte sombre fond
    ],
    interactables: [
      {
        id: "loot_fetish",
        itemId: "fetish",
        type: "loot",
        collected: false,
        dialogue: "Une idole en or... j'espère qu'elle n'est pas maudite.",
        style: { top: "60%", left: "20%", width: "8%", height: "10%" }, // Sur une caisse
      },

      {
        id: "loot_coin",
        itemId: "coin",
        type: "loot",
        collected: false,
        dialogue: "Une pièce romaine ! C'est petit mais précieux.",
        style: { top: "30%", left: "10%", width: "5%", height: "5%" }, // Sur une étagère haute
      },
      {
        id: "loot_painting",
        itemId: "painting",
        type: "loot",
        collected: false,
        dialogue: "Attention à ne pas déchirer la toile...",
        style: { top: "30%", left: "60%", width: "12%", height: "15%" }, // Cadre au mur
      },
    ],
  },

  // 4. ACCUEIL (INDICE)
  lobby: {
    id: "lobby",
    name: "Hall d'Accueil",
    background: lobbyBg,
    exits: [
      {
        target: "gallery",
        label: "Retour Galerie",
        style: { top: "30%", left: "40%", width: "20%", height: "30%" },
      },
      {
        target: "lockers",
        label: "Vestiaires",
        style: { top: "40%", left: "80%", width: "10%", height: "40%" },
      },
    ],
    interactables: [
      {
        id: "clue_note",
        type: "clue",
        dialogue:
          "Un post-it sur l'écran : 'Code vestiaire : Année de création (1923)'",
        style: { top: "55%", left: "45%", width: "10%", height: "5%" }, // Sur le comptoir
      },
      {
        id: "locked_door",
        type: "info",
        dialogue:
          "La porte principale est blindée. Impossible de sortir par là.",
        style: { top: "30%", left: "10%", width: "20%", height: "40%" },
      },
    ],
  },

  // 5. VESTIAIRES (CLÉ)
  lockers: {
    id: "lockers",
    name: "Vestiaires du Personnel",
    background: lockersBg,
    exits: [
      {
        target: "lobby",
        label: "Retour Accueil",
        style: { top: "85%", left: "30%", width: "40%", height: "10%" },
      },
    ],
    interactables: [
      {
        id: "locker_puzzle",
        itemId: "sewer_key",
        type: "puzzle", // Spécial : nécessite un code
        codeRequired: "1923",
        collected: false,
        lockedMessage: "C'est fermé par un cadenas à code à 4 chiffres.",
        successMessage:
          "Clic ! Le casier s'ouvre. Il y a une clé rouillée dedans.",
        style: { top: "40%", left: "50%", width: "10%", height: "30%" }, // Un casier spécifique
      },
    ],
  },

  // 6. SALLE DE SURVEILLANCE (AMBIANCE)
  surveillance: {
    id: "surveillance",
    name: "Salle de Sécurité",
    background: surveillanceBg,
    exits: [
      {
        target: "office",
        label: "Retour Bureau",
        style: { top: "85%", left: "40%", width: "20%", height: "10%" },
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

  // 7. SOUS-SOL (SORTIE)
  basement: {
    id: "basement",
    name: "Tunnel de Maintenance",
    background: basementBg,
    exits: [
      {
        target: "storage",
        label: "Remonter",
        style: { top: "85%", left: "40%", width: "20%", height: "10%" },
      },
    ],
    interactables: [
      {
        id: "exit_gate",
        type: "exit", // Condition de victoire
        requiredItem: "sewer_key",
        lockedMessage:
          "La grille est fermée par un gros cadenas rouillé. Il me faut la clé.",
        successMessage: "La clé tourne ! La grille s'ouvre. La liberté !",
        style: { top: "60%", left: "35%", width: "30%", height: "20%" }, // La grille au sol
      },
      {
        id: "loot_fossil",
        itemId: "fossil",
        type: "loot",
        collected: false,
        dialogue: "Un doigt ? Sérieusement ? Bon, ça se vendra.",
        style: { top: "75%", left: "50%", width: "5%", height: "5%" }, // Par terre
      },
    ],
  },
};
