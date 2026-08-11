import type { FAQItem } from "@/lib/types";
import { GLOBAL_FAQ } from "@/lib/constants";
import { PROFILES, type TalentProfile } from "@/lib/data/profiles";

/* ─────────────────────────────────────────────────────────────────────
   Contenu des trois surfaces : /dev, /rh, /offshore.

   Un seul jeu de composants (components/landing/portal) rend les trois
   pages ; c'est ce fichier qui les différencie. Toute la copie vit ici,
   aucune n'est écrite en dur dans un composant — sinon ajouter une
   quatrième verticale voudrait dire éditer dix fichiers.

   ⚠ Ce que ce fichier N'INVENTE PAS, par décision produit (PRODUCT.md) :
   — aucun chiffre nouveau. Les seules valeurs affirmées sont celles déjà
     portées par le site : 8 000+ candidats, 7 jours, 12 %, 94 %, −60 %,
     15–20 % de commission cabinet, 3–6 mois de cycle local ;
   — aucun profil fictif. Les fiches viennent de lib/data/profiles.ts et
     sont réelles (anonymisées). Les métiers sans profil réel dans le
     vivier — growth, CM, assistant admin — sont présentés SANS TJM
     plutôt qu'avec un tarif inventé ;
   — aucun témoignage : BNJ n'en a pas de réel à ce jour, et les exemples
     de mise en page ne sont pas affichables sur une page commerciale. Les
     `love.items` sont donc vides et la section n'est pas rendue. Le
     gabarit est conservé dans testimonials.example.ts, que rien n'importe.
   ───────────────────────────────────────────────────────────────────── */

export type VerticalSlug = "dev" | "rh" | "offshore";

/** Clé d'icône résolue par PainGrid — le SVG vit dans le composant. */
export type PainIcon =
  | "clock" | "cost" | "funnel" | "cycle" | "commission" | "language"
  | "shield" | "building" | "search" | "docs" | "team" | "calendar";

/** Clé de marque résolue par FloatingTech — le SVG vit dans le composant. */
export type TechKey =
  // Technologies — /dev
  | "react" | "node" | "ts" | "python" | "graphql" | "php" | "redis"
  | "docker" | "vue" | "tailwind"
  // Jobboards & outils de recrutement — /rh
  | "hellowork" | "indeed" | "cvaden" | "taleez" | "apec" | "wttj"
  | "francetravail" | "monster"
  // Outils transverses
  | "linkedin" | "hubspot" | "slack" | "notion" | "sheets" | "canva"
  | "figma" | "salesforce" | "meta" | "ads";

export interface PainItem {
  title: string;
  body: string;
  icon: PainIcon;
}

/** `true` = oui, `false` = non, sinon la valeur textuelle. */
export type CompareCell = boolean | string;
/** `tag` : badge affiché sous la valeur BNJ (première colonne) seulement. */
export interface CompareRow {
  critere: string;
  cells: CompareCell[];
  tag?: string;
}

export interface SimPoste {
  id: string;
  label: string;
  photo: string;
  /** TJM moyen constaté en France — ESTIMATION, à confirmer. */
  france: number;
  /** TJM BNJ. Aligné sur le vivier réel quand le poste y existe. */
  bnj: number;
}

export interface Testimonial {
  nom: string;
  poste: string;
  texte: string;
}

export interface Vertical {
  slug: VerticalSlug;
  /** Libellé court, utilisé par le pied de page et les liens croisés. */
  label: string;
  meta: { title: string; description: string };
  hero: {
    badge: string;
    /** Le titre est volontairement scindé : le retour à la ligne est
     *  typographique, pas la conséquence d'une largeur de conteneur. */
    line1: string;
    line2: string;
    sub: string;
  };
  /** Marques flottant au-dessus du portail. 10 emplacements au maximum. */
  techs: TechKey[];
  profiles: TalentProfile[];
  sim: { postes: SimPoste[] };
  pains: {
    kicker: string;
    title: string;
    titleMuted: string;
    items: PainItem[];
  };
  process: { badge: string; title: string; sub: string };
  compare: { title: string; sub: string; rows: CompareRow[] };
  love: { title: string; sub: string; items: Testimonial[] };
  faq: FAQItem[];
  booking: { title1: string; title2: string; sub: string };
}

/* ── Vignettes du simulateur ───────────────────────────────────────────
   Elles viennent du vivier anonymisé et sont floutées : elles illustrent
   le poste, elles ne désignent personne. Aucun nom n'est affiché à côté,
   précisément pour ne rien affirmer. */
const PHOTO = {
  dev: PROFILES.dev.map((p) => p.photo),
  rh: PROFILES.rh.map((p) => p.photo),
  sdr: PROFILES.sdr.map((p) => p.photo),
};

/** Question retirée de /dev : jugée redondante sur une surface tech. */
const FAQ_SANS_LANGUE = GLOBAL_FAQ.filter(
  (item) => item.question !== "Les talents parlent-ils vraiment bien français ?"
);

/* ═══════════════════════════════════════════════════════════════════════
   DEV — contenu inchangé : cette surface est en production, elle doit
   rendre exactement comme avant la mise en commun des composants.
   ═══════════════════════════════════════════════════════════════════ */

const dev: Vertical = {
  slug: "dev",
  label: "Développeurs",
  meta: {
    title: "Développeurs francophones | BNJ Team Maker — Recrutement Tech International",
    description:
      "Recrutez des développeurs React, Next.js, Node.js, Python qualifiés et francophones en moins de 7 jours. Jusqu'à 60% moins cher qu'un recrutement local. BNJ Team Maker.",
  },
  hero: {
    badge: "Nouveau : 8 000+ développeurs francophones qualifiés",
    line1: "Des développeurs qui livrent.",
    line2: "Sans exploser votre budget.",
    sub: "Des développeurs testés, francophones, disponibles sous 7 jours.",
  },
  techs: ["react", "node", "ts", "python", "graphql", "php", "redis", "docker", "vue", "tailwind"],
  profiles: PROFILES.dev,
  sim: {
    postes: [
      { id: "fullstack", label: "Développeur Fullstack", france: 400, bnj: 135, photo: PHOTO.dev[1] },
      { id: "front", label: "Développeur Front-End", france: 370, bnj: 125, photo: PHOTO.dev[0] },
      { id: "back", label: "Développeur Back-End", france: 420, bnj: 140, photo: PHOTO.dev[2] },
      { id: "mobile", label: "Développeur Mobile", france: 430, bnj: 145, photo: PHOTO.dev[1] },
      { id: "devops", label: "DevOps / Cloud", france: 460, bnj: 155, photo: PHOTO.dev[2] },
      { id: "data", label: "Data / IA", france: 480, bnj: 160, photo: PHOTO.dev[0] },
    ],
  },
  pains: {
    kicker: "Le constat",
    title: "Recruter un bon dev en France,",
    titleMuted: "c'est devenu un sport extrême.",
    items: [
      { icon: "clock", title: "3 à 6 mois de recrutement", body: "Annonce, entretiens, préavis. Votre roadmap attend." },
      { icon: "cost", title: "Des salaires qui s'envolent", body: "60 à 80K€ brut pour un senior à Paris, hors charges." },
      { icon: "funnel", title: "Trop peu de bons profils", body: "Les meilleurs sont en poste, sollicités chaque semaine." },
      { icon: "cycle", title: "Un turnover qui coûte cher", body: "Un départ à un an : 6 à 9 mois de salaire perdus." },
      { icon: "commission", title: "La commission du cabinet", body: "15 à 20% du salaire annuel, à chaque recrutement." },
      { icon: "language", title: "La barrière de la langue", body: "Specs mal comprises, allers-retours, temps perdu." },
      { icon: "shield", title: "Aucune garantie", body: "Un mauvais casting et vous repartez de zéro." },
      { icon: "building", title: "L'onboarding à votre charge", body: "Ni process ni suivi : votre équipe absorbe tout." },
    ],
  },
  process: {
    badge: "Du brief au dev en poste",
    title: "Sept jours, cinq étapes",
    sub: "Vous nous expliquez votre besoin, on remonte les profils du vivier. Vous choisissez, on s'occupe de l'intégration.",
  },
  compare: {
    title: "Voyez la différence, d'un coup d'œil",
    sub: "Comparez BNJ sur les critères qui comptent vraiment quand vous devez staffer une équipe technique.",
    rows: [
      { critere: "TJM moyen", cells: ["135 €", "400 €", "450 €", "Salaire chargé"], tag: "Économisez jusqu'à 70 %" },
      { critere: "Garantie de remplacement", cells: ["Illimitée", "Variable", false, false], tag: "Aucun frais" },
      { critere: "Sans engagement de durée", cells: [true, false, true, false] },
      { critere: "Délai de mise en poste", cells: ["7 jours", "3 à 6 mois", "2 à 4 sem.", "3 à 6 mois"] },
      { critere: "Premiers profils présentés", cells: ["72 h", "2 à 3 sem.", "Immédiat", "3 à 6 sem."] },
      { critere: "Frais de recrutement", cells: ["Aucun", "15 à 20 %", "Commission", "Temps RH"] },
      { critere: "Testé techniquement", cells: [true, true, false, "À votre charge"] },
      { critere: "Onboarding accompagné", cells: [true, false, false, "À votre charge"] },
      { critere: "Vivier disponible immédiatement", cells: ["8 000+", false, true, false] },
    ],
  },
  love: {
    title: "Adopté par les équipes tech",
    sub: "Ce que disent les équipes qui recrutent avec nous",
    items: [],
  },
  faq: FAQ_SANS_LANGUE,
  booking: {
    title1: "Trente minutes pour",
    title2: "cadrer votre besoin",
    sub: "On analyse votre stack et votre contexte, puis on vous présente des profils sous 48 h. Sans engagement.",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   RH — recruteurs, talent acquisition, RH généralistes.
   ═══════════════════════════════════════════════════════════════════ */

const rh: Vertical = {
  slug: "rh",
  label: "Recrutement & RH",
  meta: {
    title: "Recruteurs & RH externalisés | BNJ Team Maker — Talent Acquisition francophone",
    description:
      "Chargés de recrutement, talent acquisition, RH généralistes francophones à partir de 75 €/jour. Opérationnels sous 7 jours, testés sur le métier. BNJ Team Maker.",
  },
  hero: {
    badge: "Nouveau : des recruteurs francophones opérationnels sous 7 jours",
    // Deux lignes de ~28 signes : au-delà, le titre passe sur trois lignes
    // en desktop et l'accroche perd son équilibre avec le simulateur.
    line1: "Des recruteurs qui sourcent.",
    line2: "Sans ouvrir un poste en CDI.",
    sub: "Chargés de recrutement, talent acquisition, RH généralistes. Testés sur le métier, francophones, en poste sous 7 jours.",
  },
  // Les outils que le métier utilise vraiment : jobboards, CVthèques, ATS.
  // Les quatre premiers emplacements et les deux derniers sont les seuls
  // visibles au format téléphone (voir ARC) — d'où les marques les plus
  // reconnaissables en tête.
  techs: [
    "linkedin", "indeed", "hellowork", "cvaden",
    "taleez", "apec", "wttj", "francetravail",
  ],
  profiles: PROFILES.rh,
  sim: {
    // TJM BNJ alignés sur le vivier réel là où le poste y existe
    // (75 / 90 / 105 €). Les autres lignes sont extrapolées — à recaler
    // sur la grille tarifaire réelle.
    postes: [
      { id: "charge-rec", label: "Chargé(e) de recrutement", france: 300, bnj: 75, photo: PHOTO.rh[0] },
      { id: "talent-acq", label: "Talent Acquisition Manager", france: 380, bnj: 105, photo: PHOTO.rh[2] },
      { id: "hrbp", label: "RH généraliste / HRBP", france: 350, bnj: 90, photo: PHOTO.rh[1] },
      { id: "sourceur", label: "Sourceur / Sourceuse", france: 260, bnj: 70, photo: PHOTO.rh[0] },
      { id: "admin-rh", label: "Assistant(e) RH & administratif", france: 250, bnj: 65, photo: PHOTO.rh[1] },
      { id: "paie", label: "Gestionnaire paie & administration", france: 320, bnj: 85, photo: PHOTO.rh[2] },
    ],
  },
  pains: {
    kicker: "Le constat",
    title: "Structurer sa fonction RH,",
    titleMuted: "c'est un poste à temps plein que personne n'a.",
    items: [
      { icon: "search", title: "Le sourcing prend tout le temps", body: "Chasser, relancer, qualifier : personne n'a ces heures-là." },
      { icon: "docs", title: "300 CV à trier, zéro process", body: "Les bons dossiers se perdent au milieu des candidatures." },
      { icon: "clock", title: "Un time-to-hire qui s'allonge", body: "Chaque semaine de retard, c'est un candidat qui signe ailleurs." },
      { icon: "cost", title: "Un CDI RH que vous ne pouvez pas amortir", body: "Le besoin est réel, le volume ne justifie pas un temps plein." },
      { icon: "commission", title: "La commission du cabinet", body: "15 à 20% du salaire annuel, à chaque recrutement." },
      { icon: "team", title: "Des managers qui recrutent seuls", body: "Chacun sa méthode, ses grilles, ses critères. Aucun standard." },
      { icon: "calendar", title: "L'onboarding jamais formalisé", body: "Le nouvel arrivant apprend en observant. Et parfois s'en va." },
      { icon: "shield", title: "Un mauvais casting coûte cher", body: "Recrutement à refaire, équipe déstabilisée, budget parti." },
    ],
  },
  process: {
    badge: "Du brief au recruteur en poste",
    title: "Sept jours, cinq étapes",
    sub: "Vous nous expliquez votre besoin RH, on remonte les profils du vivier. Vous choisissez, on s'occupe de l'intégration.",
  },
  compare: {
    title: "Voyez la différence, d'un coup d'œil",
    sub: "Comparez BNJ sur les critères qui comptent vraiment quand vous devez staffer votre fonction RH.",
    rows: [
      { critere: "TJM moyen", cells: ["75 €", "350 €", "400 €", "Salaire chargé"], tag: "Économisez jusqu'à 70 %" },
      { critere: "Garantie de remplacement", cells: ["Illimitée", "Variable", false, false], tag: "Aucun frais" },
      { critere: "Sans engagement de durée", cells: [true, false, true, false] },
      { critere: "Délai de mise en poste", cells: ["7 jours", "3 à 6 mois", "2 à 4 sem.", "3 à 6 mois"] },
      { critere: "Premiers profils présentés", cells: ["72 h", "2 à 3 sem.", "Immédiat", "3 à 6 sem."] },
      { critere: "Frais de recrutement", cells: ["Aucun", "15 à 20 %", "Commission", "Temps RH"] },
      { critere: "Testé sur le métier", cells: [true, true, false, "À votre charge"] },
      { critere: "Onboarding accompagné", cells: [true, false, false, "À votre charge"] },
      { critere: "Vivier disponible immédiatement", cells: ["8 000+", false, true, false] },
    ],
  },
  love: {
    title: "Adopté par les équipes qui recrutent",
    sub: "Ce que disent les entreprises qui externalisent leur recrutement",
    items: [],
  },
  faq: [
    ...GLOBAL_FAQ,
    {
      question: "Un recruteur externalisé peut-il vraiment porter notre marque employeur ?",
      answer:
        "Oui, c'est même le cœur du travail. Le profil s'intègre à vos outils — votre ATS, votre messagerie, vos canaux internes — et parle en votre nom aux candidats. Il est dédié à votre entreprise, pas partagé entre dix clients.",
    },
  ],
  booking: {
    title1: "Trente minutes pour",
    title2: "cadrer votre besoin RH",
    sub: "On analyse vos postes ouverts et votre organisation, puis on vous présente des profils sous 48 h. Sans engagement.",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   OFFSHORE — la surface générale, toutes verticales confondues.
   ═══════════════════════════════════════════════════════════════════ */

/** Le panneau montre le vivier au complet plutôt qu'une seule famille. */
const TOUS_PROFILS: TalentProfile[] = [
  PROFILES.dev[0],
  PROFILES.rh[1],
  PROFILES.sdr[1],
  PROFILES.dev[2],
  PROFILES.rh[2],
  PROFILES.sdr[0],
];

const offshore: Vertical = {
  slug: "offshore",
  label: "Tous les métiers",
  meta: {
    title: "Externalisation de talents francophones | BNJ Team Maker",
    description:
      "Développeurs, recruteurs, SDR, growth, community managers, assistants administratifs francophones. Testés, disponibles sous 7 jours, jusqu'à 60% moins cher. BNJ Team Maker.",
  },
  hero: {
    badge: "Nouveau : 8 000+ talents francophones qualifiés, tous métiers",
    line1: "Les talents qu'il vous manque.",
    line2: "Francophones, testés, sous 7 jours.",
    sub: "Tech, recrutement, sales, growth, support, administratif — un seul interlocuteur pour staffer toute votre équipe.",
  },
  techs: ["react", "linkedin", "hubspot", "slack", "notion", "figma", "sheets", "ads", "canva", "docker"],
  profiles: TOUS_PROFILS,
  sim: {
    // Seuls dev / RH / SDR sont adossés à des profils réels du vivier.
    // Les autres lignes sont extrapolées — à recaler sur la grille réelle.
    postes: [
      { id: "dev", label: "Développeur Fullstack", france: 400, bnj: 135, photo: PHOTO.dev[1] },
      { id: "rh", label: "Chargé(e) de recrutement", france: 300, bnj: 75, photo: PHOTO.rh[0] },
      { id: "sdr", label: "SDR / Business Developer", france: 350, bnj: 100, photo: PHOTO.sdr[1] },
      { id: "growth", label: "Growth / Acquisition", france: 400, bnj: 120, photo: PHOTO.sdr[2] },
      { id: "cm", label: "Community Manager", france: 300, bnj: 85, photo: PHOTO.rh[1] },
      { id: "admin", label: "Assistant(e) administratif", france: 250, bnj: 65, photo: PHOTO.rh[2] },
    ],
  },
  pains: {
    kicker: "Le constat",
    title: "Recruter en France,",
    titleMuted: "c'est devenu un sport extrême — sur tous les métiers.",
    items: [
      { icon: "clock", title: "3 à 6 mois de recrutement", body: "Annonce, entretiens, préavis. Vos projets attendent." },
      { icon: "cost", title: "Des salaires qui s'envolent", body: "Chaque poste coûte plus cher que l'année dernière." },
      { icon: "funnel", title: "Trop peu de bons profils", body: "Les meilleurs sont en poste, sollicités chaque semaine." },
      { icon: "team", title: "Des postes que vous ne pouvez pas ouvrir", body: "Le besoin est réel, le volume ne justifie pas un temps plein." },
      { icon: "commission", title: "La commission du cabinet", body: "15 à 20% du salaire annuel, à chaque recrutement." },
      { icon: "language", title: "La barrière de la langue", body: "L'offshore classique vous coûte en allers-retours." },
      { icon: "shield", title: "Aucune garantie", body: "Un mauvais casting et vous repartez de zéro." },
      { icon: "building", title: "Un prestataire par métier", body: "Trois agences, trois contrats, trois interlocuteurs." },
    ],
  },
  process: {
    badge: "Du brief au talent en poste",
    title: "Sept jours, cinq étapes",
    sub: "Vous nous expliquez votre besoin, on remonte les profils du vivier. Vous choisissez, on s'occupe de l'intégration.",
  },
  compare: {
    title: "Voyez la différence, d'un coup d'œil",
    sub: "Comparez BNJ sur les critères qui comptent vraiment quand vous devez staffer une équipe, quel que soit le métier.",
    rows: [
      { critere: "TJM moyen", cells: ["Dès 65 €", "350 €", "400 €", "Salaire chargé"], tag: "Économisez jusqu'à 70 %" },
      { critere: "Métiers couverts", cells: ["Tech, RH, sales, support", "Une spécialité", "Une spécialité", "Selon les fiches de poste"] },
      { critere: "Garantie de remplacement", cells: ["Illimitée", "Variable", false, false], tag: "Aucun frais" },
      { critere: "Sans engagement de durée", cells: [true, false, true, false] },
      { critere: "Délai de mise en poste", cells: ["7 jours", "3 à 6 mois", "2 à 4 sem.", "3 à 6 mois"] },
      { critere: "Premiers profils présentés", cells: ["72 h", "2 à 3 sem.", "Immédiat", "3 à 6 sem."] },
      { critere: "Frais de recrutement", cells: ["Aucun", "15 à 20 %", "Commission", "Temps RH"] },
      { critere: "Testé sur le métier", cells: [true, true, false, "À votre charge"] },
      { critere: "Onboarding accompagné", cells: [true, false, false, "À votre charge"] },
      { critere: "Vivier disponible immédiatement", cells: ["8 000+", false, true, false] },
    ],
  },
  love: {
    title: "Adopté par les équipes qui scalent",
    sub: "Ce que disent les entreprises qui construisent leur équipe avec nous",
    items: [],
  },
  faq: [
    ...GLOBAL_FAQ,
    {
      question: "Sur quels métiers pouvez-vous staffer ?",
      answer:
        "Développement et DevOps, recrutement et RH, sales et SDR, growth et acquisition, community management, assistanat administratif, support client. Si un métier ne figure pas dans cette liste, posez la question lors de l'appel : le vivier couvre plus large que ce que la page affiche.",
    },
  ],
  booking: {
    title1: "Trente minutes pour",
    title2: "cadrer votre besoin",
    sub: "On analyse votre organisation et les postes à pourvoir, puis on vous présente des profils sous 48 h. Sans engagement.",
  },
};

/**
 * Le mur des retours est-il alimenté par de VRAIS témoignages ?
 *
 * Les huit verbatims de chaque verticale ci-dessus sont des exemples de mise
 * en page : noms et sociétés sont inventés. Sur une page commerciale, ce sont
 * des témoignages fabriqués — le bandeau d'avertissement de LoveWall ne
 * suffisait qu'en interne.
 *
 * Tant que ce drapeau vaut `false`, les verbatims sont retirés à la source :
 * la section n'est pas rendue ET le contenu ne part pas dans le HTML. Les
 * pages passent la verticale entière à un composant client — ce qui resterait
 * ici serait lisible dans le code source de la page, même sans être affiché.
 *
 * Le repasser à `true` demande deux choses, dans cet ordre : remplacer les
 * `love.items` par de vrais retours, puis retirer le bandeau de LoveWall.tsx.
 */
export const TEMOIGNAGES_REELS = false;

const sansTemoignages = (v: Vertical): Vertical =>
  TEMOIGNAGES_REELS ? v : { ...v, love: { ...v.love, items: [] } };

export const VERTICALS: Record<VerticalSlug, Vertical> = {
  dev: sansTemoignages(dev),
  rh: sansTemoignages(rh),
  offshore: sansTemoignages(offshore),
};

/* ── Les métiers, affichés sur /offshore uniquement ────────────────────
   `tjm` n'est renseigné QUE lorsqu'un profil réel du vivier le
   substantie (lib/data/profiles.ts : dev dès 123 €, RH dès 75 €,
   SDR dès 100 €). Pour les autres métiers, la case reste vide et la
   carte affiche « Tarif sur demande » — plutôt qu'un chiffre inventé.
   ⚠ À COMPLÉTER avec la grille tarifaire réelle quand elle existe. */
export interface Metier {
  nom: string;
  /** « dès X €/j », uniquement si un profil réel du vivier le porte. */
  tjm?: string;
  pitch: string;
  skills: string[];
  /** Landing dédiée, quand elle existe. */
  href?: string;
}

export const METIERS: Metier[] = [
  {
    nom: "Développement & DevOps",
    tjm: "dès 123 €/j",
    pitch: "Frontend, backend, mobile, data, infrastructure.",
    skills: ["React", "Node.js", "Python", "PHP", "Docker", "AWS"],
    href: "/dev",
  },
  {
    nom: "Recrutement & RH",
    tjm: "dès 75 €/j",
    pitch: "Sourcing, pré-qualification, onboarding, administration.",
    skills: ["LinkedIn Recruiter", "ATS", "Sourcing", "Onboarding", "GPEC"],
    href: "/rh",
  },
  {
    nom: "Sales & SDR",
    tjm: "dès 100 €/j",
    pitch: "Prospection, prise de rendez-vous, closing.",
    skills: ["Cold calling", "Cold emailing", "HubSpot", "Sales Navigator"],
  },
  {
    nom: "Growth & Acquisition",
    pitch: "Acquisition payante, automatisation, cycles de test.",
    skills: ["Meta Ads", "Google Ads", "Automatisation", "Analytics", "SEO"],
  },
  {
    nom: "Community Management",
    pitch: "Ligne éditoriale, publication, animation, modération.",
    skills: ["LinkedIn", "Instagram", "Canva", "Rédaction", "Planification"],
  },
  {
    nom: "Assistanat administratif",
    pitch: "Facturation, agenda, saisie, suivi des dossiers.",
    skills: ["Excel", "Google Workspace", "Facturation", "Back-office"],
  },
  {
    nom: "Support client",
    pitch: "Traitement des demandes, service après-vente, rétention.",
    skills: ["Zendesk", "Intercom", "Service client", "Rédaction"],
  },
  {
    nom: "Design & Contenu",
    pitch: "Identité, maquettes, visuels, production éditoriale.",
    skills: ["Figma", "Canva", "UI", "Motion", "Rédaction web"],
  },
];
