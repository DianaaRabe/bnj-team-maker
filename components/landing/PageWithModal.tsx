"use client";

import { useState } from "react";
import type { LandingPageData } from "@/lib/types";
import type { TalentProfile } from "@/lib/data/profiles";
import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import PainPoints from "@/components/landing/PainPoints";
import WhyBNJ from "@/components/landing/WhyBNJ";
import ProfileSection from "@/components/landing/ProfileSection";
import Process from "@/components/landing/Process";
import APlayers from "@/components/landing/APlayers";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import TalentModal from "@/components/landing/TalentModal";
import CalendlyModal from "@/components/landing/CalendlyModal";

interface PageWithModalProps {
  data: LandingPageData;
  profiles: TalentProfile[];
  navCtaLabel: string;
}

export default function PageWithModal({ data, profiles, navCtaLabel }: PageWithModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const openCalendly = () => setCalendlyOpen(true);

  return (
    <main className="flex flex-col min-h-screen bg-[#08050f]">
      <LandingNav ctaLabel={navCtaLabel} onOpenModal={openModal} />
      <Hero
        data={data.hero}
        stats={data.stats}
        variant={data.variant}
        onOpenModal={openModal}
        onOpenCalendly={openCalendly}
      />
      <PainPoints data={data.painPoints} variant={data.variant} />
      <WhyBNJ data={data.whyBNJ} />
      <ProfileSection data={data.profileSection} variant={data.variant} onOpenModal={openModal} />
      <Process />
      <APlayers data={data.aPlayers} onOpenModal={openModal} />
      <FAQ />
      <FinalCTA
        data={data.finalCTA}
        onOpenModal={openModal}
        onOpenCalendly={openCalendly}
      />

      <TalentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        profiles={profiles}
        variant={data.variant}
        onOpenCalendly={openCalendly}
      />

      <CalendlyModal
        isOpen={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />
    </main>
  );
}
