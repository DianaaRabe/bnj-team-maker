import type { Metadata } from "next";
import { sdrData } from "@/lib/data/sdr";
import { PROFILES } from "@/lib/data/profiles";
import PageWithModal from "@/components/landing/PageWithModal";

export const metadata: Metadata = {
  title: sdrData.meta.title,
  description: sdrData.meta.description,
  openGraph: {
    title: sdrData.meta.title,
    description: sdrData.meta.description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: sdrData.meta.title,
    description: sdrData.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function SDRPage() {
  return (
    <PageWithModal
      data={sdrData}
      profiles={PROFILES.sdr}
      navCtaLabel="Voir les SDR disponibles →"
    />
  );
}
