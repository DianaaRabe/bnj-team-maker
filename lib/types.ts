export type PageVariant = "dev" | "sdr" | "rh";

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface PainPoint {
  icon: string;
  title: string;
  description: string;
}

export interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  category?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LandingPageData {
  variant: PageVariant;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: Stat[];
  painPoints: {
    title: string;
    subtitle: string;
    items: PainPoint[];
    transition: string;
  };
  whyBNJ: {
    title: string;
    subtitle: string;
    items: WhyItem[];
  };
  profileSection: {
    title: string;
    subtitle: string;
    skills: Skill[];
    description: string;
  };
  aPlayers: {
    title: string;
    headlineAccent: string;
    body: string;
    proof: string;
  };
  faq: FAQItem[];
  finalCTA: {
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}
