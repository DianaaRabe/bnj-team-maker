import type { PageVariant } from "@/lib/types";

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  diploma: string;
  tjm: string;
  highlights: string[];
  skills: string[];
  availability: "Disponible" | "Bientôt disponible";
  flag: string;
  initials: string;
  photo: string;
}

export const PROFILES: Record<PageVariant, TalentProfile[]> = {
  dev: [
    {
      id: "dev-1",
      name: "Anthonio A.",
      role: "Développeur Front-End",
      experience: "10 ans d'expérience",
      diploma: "Licence en Informatique",
      tjm: "132€/j",
      availability: "Disponible",
      flag: "🇲🇬",
      initials: "AA",
      photo: "https://cdn.prod.website-files.com/63f68048171c386de3e8541b/68f0c37491250bb464b5ea87_Ellipse%209%20(19).png",
      highlights: [
        "Expert Frontend avec 10+ ans d'expérience, dont 5 ans dédiés au développement JavaScript",
        "Maîtrise avancée de Vue.js, React.js, Nuxt.js avec TypeScript",
        "Expérience sur des projets SaaS à fort trafic en environnement Agile/Scrum",
      ],
      skills: ["Vue.js", "React.js", "Nuxt.js", "TypeScript", "GraphQL", "ExpressJS", "AWS", "Prisma", "Symfony", "Agile"],
    },
    {
      id: "dev-2",
      name: "Tahiana R.",
      role: "Développeur Full-Stack",
      experience: "+3 ans d'expérience",
      diploma: "Licence en Électronique & Télécommunication",
      tjm: "123€/j",
      availability: "Disponible",
      flag: "🇲🇬",
      initials: "TR",
      photo: "https://cdn.prod.website-files.com/63f68048171c386de3e8541b/68f249c6c75eac7262e950aa_Ellipse%209%20(11).png",
      highlights: [
        "Développeur Fullstack passionné avec expertise complète front-end/back-end",
        "Maîtrise des technologies modernes : NuxtJS, ReactJS, NodeJS/NestJS, MongoDB",
        "Capable de livrer des MVP complets de A à Z, de l'API à l'interface utilisateur",
      ],
      skills: ["React.js", "Vue.js", "Nuxt.js", "Node.js", "NestJS", "TypeScript", "MongoDB", "FastAPI", "Python", "Docker"],
    },
    {
      id: "dev-3",
      name: "Kofi M.",
      role: "Développeur Backend & DevOps",
      experience: "+5 ans d'expérience",
      diploma: "Master en Génie Logiciel",
      tjm: "140€/j",
      availability: "Bientôt disponible",
      flag: "🇸🇳",
      initials: "KM",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68ef891b44b040c82ab7049c_Ellipse%209%20(10).png",
      highlights: [
        "Expert backend avec spécialisation en architecture microservices et APIs scalables",
        "Maîtrise complète des pipelines CI/CD, Docker, Kubernetes et infrastructure cloud",
        "Expérience en migration de systèmes legacy vers des architectures modernes",
      ],
      skills: ["Node.js", "Python", "PostgreSQL", "Docker", "Kubernetes", "AWS", "CI/CD", "Redis", "Terraform", "GraphQL"],
    },
  ],

  sdr: [
    {
      id: "sdr-1",
      name: "Pawell Z.",
      role: "SDR — Sales Development B2C",
      experience: "3+ ans d'expérience",
      diploma: "Licence en Commerce & Gestion",
      tjm: "100€/j",
      availability: "Disponible",
      flag: "🇧🇯",
      initials: "PZ",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68f08957feaa59025396565a_Ellipse%209%20(16).png",
      highlights: [
        "Professionnel expérimenté en relation client et vente B2C avec 4+ ans d'expérience",
        "Compétences multiples : télévendeur, téléprospecteur, setter et closer",
        "Excellent taux de conversion sur les campagnes outbound téléphoniques",
      ],
      skills: ["Téléprospection", "Aircall", "CRM", "Cold Calling", "Google Workspace", "Mailchimp", "Slack", "Service Client"],
    },
    {
      id: "sdr-2",
      name: "Fanirisoa R.",
      role: "SDR — Sales Development B2B",
      experience: "3+ ans d'expérience",
      diploma: "Licence Professionnelle",
      tjm: "100€/j",
      availability: "Disponible",
      flag: "🇲🇬",
      initials: "FR",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68f082821a70a9fb5cea2b0f_Ellipse%209%20(15).png",
      highlights: [
        "Commercial dynamique avec expertise en prospection et négociation B2B",
        "Expérience confirmée en cold calling et closing avec gestion de portefeuille clients",
        "Maîtrise de LinkedIn Sales Navigator pour la prospection entrante et sortante",
      ],
      skills: ["Cold Calling", "CRM", "LinkedIn Sales Navigator", "Prospection B2B", "Closing", "Canva", "Trello", "Google Workspace"],
    },
    {
      id: "sdr-3",
      name: "Aminata D.",
      role: "Business Developer — Account Executive",
      experience: "+4 ans d'expérience",
      diploma: "Master en Marketing & Commerce",
      tjm: "115€/j",
      availability: "Bientôt disponible",
      flag: "🇸🇳",
      initials: "AD",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68f08d4a4e2e140978e5f2df_Ellipse%209%20(17).png",
      highlights: [
        "Account Executive spécialisée dans les cycles de vente complexes SaaS B2B",
        "Pipeline management avancé avec taux de transformation démontré sur des deals 20K€+",
        "Expérience internationale : clients France, Belgique, Suisse",
      ],
      skills: ["HubSpot", "Salesforce", "MEDDIC", "Cold Emailing", "Négociation", "Lemlist", "Closing", "Forecasting"],
    },
  ],

  rh: [
    {
      id: "rh-1",
      name: "Henintsoa R.",
      role: "Chargé(e) de Recrutement",
      experience: "3+ ans d'expérience",
      diploma: "Licence en Psychologie Sociale & Interculturelle",
      tjm: "75€/j",
      availability: "Disponible",
      flag: "🇲🇬",
      initials: "HR",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68f0790b927c52611435d07a_Ellipse%209%20(13).png",
      highlights: [
        "Spécialiste en talent acquisition avec sourcing multi-jobboard et pré-qualification téléphonique",
        "Excellente aisance relationnelle et capacité à collaborer au sein d'équipes internationales",
        "Maîtrise des outils de sourcing et ATS pour gérer des volumes de recrutement importants",
      ],
      skills: ["Talent Acquisition", "Sourcing", "LinkedIn Recruiter", "Excel", "PowerPoint", "Réseaux Sociaux", "Gestion RH"],
    },
    {
      id: "rh-2",
      name: "Prisca N.",
      role: "RH Généraliste & Talent Partner",
      experience: "+5 ans d'expérience",
      diploma: "Master en Ressources Humaines",
      tjm: "90€/j",
      availability: "Disponible",
      flag: "🇨🇮",
      initials: "PN",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68efb57dd0d43729f46dd1ee_Ellipse%209%20(11).png",
      highlights: [
        "RH généraliste avec expertise en recrutement, onboarding et gestion de la performance",
        "Capable de structurer une fonction RH de A à Z pour des équipes de 10 à 100 personnes",
        "Expérience en HRBP : accompagnement des managers, plan de formation et rétention des talents",
      ],
      skills: ["Recrutement", "Onboarding", "GPEC", "ATS", "Workable", "Droit du travail", "Reporting RH", "Employer Branding"],
    },
    {
      id: "rh-3",
      name: "Jean-Luc R.",
      role: "Talent Acquisition Manager",
      experience: "+6 ans d'expérience",
      diploma: "Master en Management",
      tjm: "105€/j",
      availability: "Bientôt disponible",
      flag: "🇨🇲",
      initials: "JR",
      photo: "https://cdn.prod.website-files.com/63f68048171c383c1ee85423/68f07a702aa56b8fa6e3967f_Ellipse%209%20(14).png",
      highlights: [
        "Talent Acquisition Manager habitué à gérer 10 à 15 recrutements simultanément",
        "Expertise en marque employeur et stratégie d'attraction des talents tech et business",
        "Track record : réduction du time-to-hire de 45 jours à 12 jours sur ses derniers postes",
      ],
      skills: ["Talent Acquisition", "Employer Branding", "LinkedIn Recruiter", "Greenhouse", "Lever", "Inbound Recruiting", "Analytics RH"],
    },
  ],
};
