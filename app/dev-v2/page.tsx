import type { Metadata } from "next";
import { devData } from "@/lib/data/dev";
import { PROFILES } from "@/lib/data/profiles";
import PortalHero from "@/components/landing/dev-v2/PortalHero";

export const metadata: Metadata = {
  title: devData.meta.title,
  description: devData.meta.description,
  robots: { index: false, follow: false },
};

export default function DevV2Page() {
  return <PortalHero profiles={PROFILES.dev} />;
}
