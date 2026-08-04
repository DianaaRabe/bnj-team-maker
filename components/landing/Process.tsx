"use client";

import { motion } from "framer-motion";
import { MessageSquare, SlidersHorizontal, Video, Rocket, TrendingUp } from "lucide-react";
import { BRAND } from "@/lib/constants";

const STEPS = [
  {
    step: "01",
    icon: <MessageSquare className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous nous expliquez votre besoin",
    description: "Un appel de 30 minutes. On écoute, on comprend votre contexte, vos contraintes, votre culture d'entreprise.",
  },
  {
    step: "02",
    icon: <SlidersHorizontal className="h-5 w-5 text-[#c069ee]" />,
    title: "On sélectionne les meilleurs profils",
    description: "Sous 48h, on vous propose une sélection de candidats pré-qualifiés issus de notre ATS de 8 000+ talents.",
  },
  {
    step: "03",
    icon: <Video className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous rencontrez les candidats",
    description: "Entretiens en visio directement avec vous. Vous choisissez. On ne vous impose rien.",
  },
  {
    step: "04",
    icon: <Rocket className="h-5 w-5 text-[#c069ee]" />,
    title: "On gère l'intégration",
    description: "Onboarding structuré, suivi des 30 premiers jours, point hebdomadaire. Vous n'êtes jamais seul.",
  },
  {
    step: "05",
    icon: <TrendingUp className="h-5 w-5 text-[#c069ee]" />,
    title: "Vous scalez rapidement",
    description: "Besoin d'un deuxième profil ? D'une équipe entière ? On s'adapte à votre croissance.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[#0f0a1a]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-[#feb527]/30 bg-[#feb527]/10 px-4 py-1.5 text-sm font-medium text-[#feb527] mb-4">
            Notre process
          </span>
          <h2 className="font-monument text-3xl font-black text-white md:text-5xl">
            Simple. Rapide.
            <br />
            <span className="text-gradient-gold">Sans friction.</span>
          </h2>
          <p className="mt-4 text-[#a898c0] max-w-xl mx-auto">
            De votre brief à un talent opérationnel — en moins de 7 jours.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#590293] via-[#c069ee] to-transparent hidden md:block" />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#590293] bg-[#08050f] font-monument text-lg font-black text-[#feb527]">
                    {step.step}
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-[#590293]/30 hover:bg-[#590293]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#590293]/20">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-[#a898c0]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[#a898c0] text-sm">
            Prêt à démarrer ?{" "}
            <a
              href={BRAND.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#feb527] font-semibold hover:underline"
            >
              Réservez votre appel →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
