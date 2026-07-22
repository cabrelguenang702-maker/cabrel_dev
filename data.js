// ==========================================================================
// DONNÉES DU SITE — cabrel.dev
// Modifiez ce fichier pour ajouter vos réalisations, changer les tarifs, etc.
// ==========================================================================

const SOCIALS = {
    instagram: "https://www.instagram.com/cabrel_dev?igsh=ZHZvd2xkeGZ5aG1z",
    telegram: "https://t.me/Cabreldev",
    facebook: "https://www.facebook.com/profile.php?id=61592451110647",
    whatsapp: "https://wa.me/237697186564",
    whatsappNumber: "697186564",
    linkedin: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Flnkd.in%2FeT6d__wx&urlhash=8CV7&mt=SjYXyVsDKRwqzmwbEPJXoqi_GY3jaKVFNa0dsdc8U5iBBvs3V9mwuyRtW1Fh0cGRXjZpxQqdtq8AcGAAFSUglBeQgvD6&isSdui=true",
    email: "cabrelguenang702@gmail.com",
};

const SERVICES = [{
        id: "site-vitrine",
        icon: "bx-laptop",
        title: "Sites web vitrine",
        desc: "Sites modernes, rapides et 100% responsives en HTML, CSS et JavaScript pur, optimisés pour le référencement (SEO).",
    },
    {
        id: "flyers",
        icon: "bxs-file-image",
        title: "Flyers",
        desc: "Des flyers percutants et professionnels pour vos événements, promotions ou activités commerciales.",
    },
    {
        id: "cartes-visite",
        icon: "bxs-id-card",
        title: "Cartes de visite",
        desc: "Une carte de visite soignée pour représenter votre image professionnelle en toute circonstance.",
    },
    {
        id: "cartes-mariage",
        icon: "bxs-heart",
        title: "Cartes de mariage",
        desc: "Des cartes d'invitation élégantes et personnalisées pour le plus beau jour de votre vie.",
    },
    {
        id: "cartes-obseques",
        icon: "bxs-flower",
        title: "Cartes d'obsèques",
        desc: "Des cartes sobres et respectueuses pour honorer la mémoire d'un être cher.",
    },
];

// Tarifs des devis
const DEVIS_PLANS = {
    "site-vitrine": {
        label: "Site web vitrine",
        unit: "FCFA",
        plans: [
            { id: "basic", label: "Basique", desc: "1 à 3 pages, design simple, formulaire de contact." },
            { id: "standard", label: "Standard", desc: "4 à 6 pages, animations, galerie, responsive avancé." },
            { id: "business", label: "Business", desc: "7+ pages, fonctionnalités avancées, SEO poussé, design premium." },
        ],
    },
    flyers: {
        label: "Flyer",
        unit: "FCFA",
        plans: [{ id: "flyer-complet", label: "Conception complète", desc: "Conception complète d'un flyer professionnel, prêt à imprimer ou publier." }],
    },
    "cartes-mariage": {
        label: "Carte de mariage",
        unit: "FCFA",
        plans: [{ id: "mariage-complet", label: "Conception complète", desc: "Conception complète d'une carte de mariage personnalisée en fonction du design du client." }],
    },
    "cartes-obseques": {
        label: "Carte d'obsèques",
        unit: "FCFA",
        plans: [{ id: "obseques-complet", label: "Conception complète", desc: "Conception complète d'une carte d'obsèques sobre et respectueuse." }],
    },
};

// Réalisations — À REMPLIR : ajoutez vos projets réels ici
const REALISATIONS = {
    sitesWeb: [
        // { titre: "L'Éclat Traiteur", client: "L'Éclat Traiteur — 6XX XXX XXX", lien: "https://exemple.com" },
    ],
    flyers: [
          { titre: "carine rose traiteur", client: "Chez carine traiteur — +237 687452844", image: "carine.jpg" },
    ],
    cartes: [
        // { titre: "Carte de mariage Aïcha & Paul", client: "6XX XXX XXX", image: "assets/carte-1.jpg" },
    ],
};

const FAQS = [{
        q: "Combien de temps faut-il pour réaliser mon site vitrine ?",
        r: "En général, un site vitrine est livré entre 7 et 14 jours après validation du cahier de charge et réception des contenus (textes, images, logo).",
    },
    {
        q: "Quels moyens de paiement acceptez-vous ?",
        r: "Le paiement s'effectue via Mobile Money (Orange Money, MTN MoMo) ou en espèces, en deux tranches : un acompte au démarrage et le solde à la livraison.",
    },
    {
        q: "Puis-je demander des modifications après la livraison ?",
        r: "Oui, chaque projet inclut une période de support après livraison pour les petites modifications. Des mises à jour plus importantes peuvent faire l'objet d'un devis complémentaire.",
    },
    {
        q: "Le site sera-t-il visible sur Google ?",
        r: "Tous les sites sont conçus avec les bonnes pratiques SEO (balises, structure, vitesse de chargement) pour favoriser leur référencement sur les moteurs de recherche.",
    },
    {
        q: "Est-ce que je dois fournir un nom de domaine et un hébergement ?",
        r: "Je peux vous accompagner dans l'achat du nom de domaine et de l'hébergement, ou travailler avec ceux que vous possédez déjà.",
    },
    {
        q: "Travaillez-vous aussi avec les particuliers ?",
        r: "Oui, en plus des entreprises, j'accompagne les particuliers pour leurs cartes de mariage, cartes d'obsèques et autres supports de communication personnels.",
    },
];
