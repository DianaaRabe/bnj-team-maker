import type { LandingPageData } from "@/lib/types";

export const sdrData: LandingPageData = {
  variant: "sdr",
  meta: {
    title: "SDR & Business Developers Francophones | BNJ Team Maker — Recrutement Commercial",
    description:
      "Recrutez des SDR et business developers francophones performants en moins de 7 jours. Cold calling, prospection, CRM — des profils qui closent. Jusqu'à 60% moins cher.",
  },
  hero: {
    badge: "Des SDR qui closent dès le premier mois",
    headline: "Des commerciaux qui prospectent.",
    headlineAccent: "Et qui closent.",
    subheadline:
      "Vous avez besoin d'une équipe commerciale qui génère du pipe rapidement ? Nos SDR francophones maîtrisent le cold calling, la qualification de leads et la prospection outbound — disponibles dès maintenant.",
    ctaPrimary: "Voir les profils disponibles",
    ctaSecondary: "Appel découverte gratuit →",
  },
  stats: [
    { value: "8 000+", label: "Profils commerciaux dans notre ATS", sublabel: "SDR, BDR, Account Executives" },
    { value: "7 jours", label: "Délai moyen de recrutement", sublabel: "Du brief au candidat opérationnel" },
    { value: "-55%", label: "Sur vos coûts commerciaux", sublabel: "Vs recrutement local classique" },
    { value: "94%", label: "Taux de satisfaction client", sublabel: "Mesuré à 90 jours" },
  ],
  painPoints: {
    title: "Monter une équipe commerciale performante,",
    subtitle: "c'est plus compliqué qu'il n'y paraît.",
    items: [
      {
        icon: "📉",
        title: "Un pipeline vide qui coûte cher",
        description:
          "Sans pipe qualifié, votre cycle de vente se bloque. Chaque semaine sans SDR opérationnel, c'est du chiffre d'affaires qui ne rentre pas.",
      },
      {
        icon: "💸",
        title: "Des salaires + charges + management",
        description:
          "Un SDR à Paris, c'est 35 à 50K€ brut, plus les outils, plus le management, plus le temps de formation. La courbe de rentabilité prend 3 à 6 mois.",
      },
      {
        icon: "🔄",
        title: "Un turnover commercial catastrophique",
        description:
          "Le métier de SDR est l'un des plus volatils. En moyenne, un commercial part au bout de 14 mois. Vous recommencez à zéro.",
      },
      {
        icon: "🎯",
        title: "La prospection, ça ne s'improvise pas",
        description:
          "Un mauvais SDR brûle vos leads. Un bon SDR les convertit en opportunités qualifiées. La différence est massive sur votre MRR.",
      },
    ],
    transition:
      "Et si vous pouviez déployer une équipe SDR francophone, formée à la prospection outbound, opérationnelle en moins d'une semaine — pour une fraction du coût ?",
  },
  whyBNJ: {
    title: "Pourquoi les équipes commerciales choisissent BNJ",
    subtitle: "pour scaler leur prospection",
    items: [],
  },
  profileSection: {
    title: "Des SDR maîtrisent toutes les techniques.",
    subtitle: "Du cold call au closing.",
    skills: [
      { name: "Cold Calling", category: "Prospection" },
      { name: "Cold Emailing", category: "Prospection" },
      { name: "LinkedIn Outreach", category: "Prospection" },
      { name: "Séquences multicanal", category: "Prospection" },
      { name: "Salesforce", category: "CRM & Outils" },
      { name: "HubSpot", category: "CRM & Outils" },
      { name: "Pipedrive", category: "CRM & Outils" },
      { name: "Lemlist / Instantly", category: "CRM & Outils" },
      { name: "Qualification BANT", category: "Qualification" },
      { name: "MEDDIC", category: "Qualification" },
      { name: "Discovery call", category: "Qualification" },
      { name: "Lead scoring", category: "Qualification" },
      { name: "Closing techniques", category: "Vente" },
      { name: "Objection handling", category: "Vente" },
      { name: "Négociation", category: "Vente" },
      { name: "Reporting & KPIs", category: "Analytique" },
    ],
    description:
      "Prospection outbound, qualification de leads, gestion CRM, closing — nos SDR couvrent l'intégralité du cycle commercial. Chaque profil a été évalué sur ses performances réelles, pas uniquement sur son CV.",
  },
  aPlayers: {
    title: "Des closers francophones",
    headlineAccent: "au coût d'un junior en alternance.",
    body: "Un SDR senior de notre réseau génère autant de pipe qu'un commercial local — pour un coût 2 à 3 fois inférieur. Ils maîtrisent le français business, les codes culturels B2B européens, et les techniques de prospection modernes. Votre client ne saura jamais qu'il est basé ailleurs.",
    proof:
      "Nos SDR ont généré des millions d'euros de pipe pour des startups SaaS, des éditeurs logiciels et des agences B2B. Ils savent travailler sur des cycles de vente courts comme longs, en remote, avec des outils comme HubSpot ou Salesforce.",
  },
  faq: [],
  finalCTA: {
    title: "Votre prochain top performer commercial",
    titleAccent: "est déjà dans notre base.",
    subtitle:
      "Réservez un appel de 30 minutes. On analyse votre process de vente, on vous présente des profils SDR sous 48h. Sans engagement.",
    ctaPrimary: "Réserver un appel maintenant",
    ctaSecondary: "Voir nos SDR disponibles",
  },
};
