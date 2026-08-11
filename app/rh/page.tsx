import type { Metadata } from "next";
import PortalLanding from "@/components/landing/portal/PortalLanding";
import { VERTICALS } from "@/lib/data/verticals";

const v = VERTICALS.rh;

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/rh" },
  openGraph: {
    title: v.meta.title,
    description: v.meta.description,
    url: "/rh",
    siteName: "BNJ Team Maker",
    locale: "fr_FR",
    type: "website",
  },
};

/** Landing recrutement & RH — servie sur bnjteammaker.fr/rh. */
export default function Page() {
  return <PortalLanding v={v} />;
}
