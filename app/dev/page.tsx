import type { Metadata } from "next";
import PortalLanding from "@/components/landing/portal/PortalLanding";
import { VERTICALS } from "@/lib/data/verticals";

const v = VERTICALS.dev;

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/dev" },
  openGraph: {
    title: v.meta.title,
    description: v.meta.description,
    url: "/dev",
    siteName: "BNJ Team Maker",
    locale: "fr_FR",
    type: "website",
  },
};

/** Landing développeurs — servie sur bnjteammaker.fr/dev. */
export default function Page() {
  return <PortalLanding v={v} />;
}
