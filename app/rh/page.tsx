import type { Metadata } from "next";
import { rhData } from "@/lib/data/rh";
import { PROFILES } from "@/lib/data/profiles";
import PageWithModal from "@/components/landing/PageWithModal";

export const metadata: Metadata = {
  title: rhData.meta.title,
  description: rhData.meta.description,
  openGraph: {
    title: rhData.meta.title,
    description: rhData.meta.description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: rhData.meta.title,
    description: rhData.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function RHPage() {
  return (
    <PageWithModal
      data={rhData}
      profiles={PROFILES.rh}
      navCtaLabel="Voir les profils RH →"
    />
  );
}
