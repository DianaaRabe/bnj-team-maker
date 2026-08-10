import type { LandingPageData } from "@/lib/types";

export const devData: LandingPageData = {
  variant: "dev",
  meta: {
    title: "Développeurs Francophones | BNJ Team Maker — Recrutement Tech International",
    description:
      "Recrutez des développeurs React, Next.js, Node.js, Python qualifiés et francophones en moins de 7 jours. Jusqu'à 60% moins cher qu'un recrutement local. BNJ Team Maker.",
  },
  hero: {
    badge: "+8 000 développeurs qualifiés dans notre ATS",
    headline: "Des développeurs qui livrent.",
    headlineAccent: "Sans exploser votre budget.",
    subheadline:
      "Vous cherchez un dev qui comprend votre stack, qui code propre et qui livre dans les délais ? On a les profils. Testés techniquement. Disponibles maintenant.",
    ctaPrimary: "Voir les profils disponibles",
    ctaSecondary: "Appel découverte gratuit →",
  },
  stats: [
    { value: "8 000+", label: "Développeurs dans notre ATS", sublabel: "Profils pré-qualifiés" },
    { value: "7 jours", label: "Délai moyen de recrutement", sublabel: "Du brief au candidat retenu" },
    { value: "-60%", label: "Sur vos coûts RH", sublabel: "Vs recrutement local classique" },
    { value: "94%", label: "Taux de satisfaction client", sublabel: "Mesuré à 90 jours" },
  ],
  painPoints: {
    title: "Recruter un bon dev en France,",
    subtitle: "c'est devenu un sport extrême.",
    items: [
      {
        icon: "⏳",
        title: "3 à 6 mois de recrutement",
        description:
          "Entre la publication de l'annonce, les entretiens, le préavis et l'onboarding — vous attendez. Pendant ce temps, votre roadmap prend du retard.",
      },
      {
        icon: "💸",
        title: "Des salaires qui s'envolent",
        description:
          "Un dev senior React à Paris coûte 60 à 80K€ brut. Sans compter les charges. Sans compter le cabinet de recrutement qui prend 15 à 20%.",
      },
      {
        icon: "🎯",
        title: "Trop peu de bons profils",
        description:
          "Les meilleurs sont déjà en poste, sollicités 10 fois par semaine. Vous recrutez les disponibles, pas les meilleurs.",
      },
      {
        icon: "🔄",
        title: "Un turnover qui coûte cher",
        description:
          "Un dev qui part au bout d'un an, c'est 6 à 9 mois de salaire perdus en coûts de recrutement et de montée en compétence.",
      },
    ],
    transition:
      "Et si vous pouviez accéder à des développeurs performants, testés techniquement, francophones — prêts à rejoindre votre équipe en moins d'une semaine ?",
  },
  whyBNJ: {
    title: "Pourquoi les scale-ups choisissent BNJ",
    subtitle: "pour leur équipe tech",
    items: [],
  },
  profileSection: {
    title: "Des développeurs maîtrisent votre stack.",
    subtitle: "Exactement.",
    skills: [
      { name: "React / Next.js", category: "Frontend" },
      { name: "Vue.js / Nuxt", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Python / Django", category: "Backend" },
      { name: "PHP / Laravel", category: "Backend" },
      { name: "NestJS", category: "Backend" },
      { name: "PostgreSQL / MySQL", category: "Base de données" },
      { name: "MongoDB", category: "Base de données" },
      { name: "Supabase", category: "Base de données" },
      { name: "Redis", category: "Base de données" },
      { name: "AWS / GCP", category: "DevOps" },
      { name: "Docker / Kubernetes", category: "DevOps" },
      { name: "CI/CD", category: "DevOps" },
      { name: "OpenAI / LangChain", category: "IA & Data" },
      { name: "React Native", category: "Mobile" },
      { name: "Flutter", category: "Mobile" },
    ],
    description:
      "Fullstack, frontend, backend, mobile, data, DevOps, IA — nos développeurs couvrent l'ensemble de votre besoin technique. Chaque profil a été validé sur les technologies qu'il revendique.",
  },
  aPlayers: {
    title: "Des A-Players tech",
    headlineAccent: "pour le prix d'un junior local.",
    body: "Un développeur senior de notre réseau coûte en moyenne 2 à 3 fois moins cher qu'un profil équivalent recruté localement — sans compromis sur la qualité. Ils ont les mêmes formations, les mêmes certifications, les mêmes GitHub bien remplis. Ils ont juste choisi de vivre ailleurs.",
    proof:
      "Nos développeurs ont contribué à des projets pour des entreprises européennes, des startups financées, des scale-ups en hypercroissance. Ils savent travailler en remote, en agile, en équipe distribuée.",
    metrics: [
      { value: "-60%", label: "Sur vos coûts RH" },
      { value: "8 000+", label: "Candidats dans notre ATS" },
      { value: "12%", label: "Des candidats sont acceptés" },
      { value: "94%", label: "Satisfaction à 90 jours" },
    ],
  },
  faq: [],
  finalCTA: {
    title: "Votre prochain développeur",
    titleAccent: "est déjà dans notre base.",
    subtitle:
      "Réservez un appel de 30 minutes. On analyse votre besoin, on vous présente des profils sous 48h. Sans engagement.",
    ctaPrimary: "Réserver un appel maintenant",
    ctaSecondary: "Voir nos développeurs disponibles",
  },
};
