import type { Metadata } from "next";
import PortalLanding from "@/components/landing/portal/PortalLanding";
import { VERTICALS } from "@/lib/data/verticals";

const v = VERTICALS.offshore;

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/offshore" },
  openGraph: {
    title: v.meta.title,
    description: v.meta.description,
    url: "/offshore",
    siteName: "BNJ Team Maker",
    locale: "fr_FR",
    type: "website",
  },
};

/**
 * Landing générale — servie sur bnjteammaker.fr/offshore.
 *
 * Elle regroupe toutes les verticales : c'est la seule des trois qui
 * affiche la grille des métiers (RolesGrid) et un vivier panaché.
 */
export default function Page() {
  return <PortalLanding v={v} />;
}
