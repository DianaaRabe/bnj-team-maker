import type { Metadata } from "next";
import { devData } from "@/lib/data/dev";
import { PROFILES } from "@/lib/data/profiles";
import DossierPage from "@/components/landing/dev/DossierPage";

export const metadata: Metadata = {
  title: devData.meta.title,
  description: devData.meta.description,
  openGraph: {
    title: devData.meta.title,
    description: devData.meta.description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: devData.meta.title,
    description: devData.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function DevPage() {
  return <DossierPage data={devData} profiles={PROFILES.dev} />;
}
