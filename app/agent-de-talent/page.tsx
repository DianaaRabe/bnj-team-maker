import type { Metadata } from "next";
import AgentLandingPage from "@/components/landing/agents/AgentLandingPage";

const title =
  "Devenir Agent de Talent | BNJ Team Maker — Programme partenaire & réseau";
const description =
  "Rejoignez le réseau BNJ comme agent de talent ou apporteur d'affaires. Placez des talents, gérez vos leads dans un mini-CRM et touchez des commissions de 30 à 50% selon votre rang.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function AgentDeTalentPage() {
  return <AgentLandingPage />;
}
