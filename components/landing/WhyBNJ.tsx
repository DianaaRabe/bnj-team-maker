"use client";

import { motion } from "framer-motion";
import { Globe, BadgeCheck, Zap, MessageCircle, TrendingUp, HandshakeIcon } from "lucide-react";
import type { LandingPageData } from "@/lib/types";

const WHY_BNJ_ITEMS = [
  {
    icon: <Globe className="h-5 w-5 text-[#c069ee]" />,
    title: "Sourcing international premium",
    description: "Nous identifions les meilleurs talents francophones d'Afrique — des profils motivés, rigoureux, qui veulent prouver leur valeur.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5 text-[#c069ee]" />,
    title: "Profils testés & validés",
    description: "Tests techniques, entretiens comportementaux, vérification des références. Vous ne rencontrez que les meilleurs.",
  },
  {
    icon: <Zap className="h-5 w-5 text-[#c069ee]" />,
    title: "Recrutement en 7 jours",
    description: "Notre ATS de 8 000+ candidats pré-qualifiés nous permet de vous proposer des profils en 48h. Candidat retenu en moins d'une semaine.",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-[#c069ee]" />,
    title: "100% francophones",
    description: "Tous nos talents communiquent couramment en français. Pas de barrière de langue, pas de friction.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#c069ee]" />,
    title: "ROI immédiat",
    description: "Jusqu'à 60% d'économies sur vos coûts RH. Des talents qui performent dès le premier mois.",
  },
  {
    icon: <HandshakeIcon className="h-5 w-5 text-[#c069ee]" />,
    title: "Accompagnement humain",
    description: "Un interlocuteur dédié. Un suivi rigoureux. Pas un prestataire qui disparaît après la signature.",
  },
];

interface WhyBNJProps {
  data: LandingPageData["whyBNJ"];
}

export default function WhyBNJ({ data }: WhyBNJProps) {
  return (
    <section id="pourquoi" className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#590293] opacity-10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-1.5 text-sm font-medium text-[#c069ee] mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="font-monument text-3xl font-black text-white md:text-5xl">
            {data.title}
            <br />
            <span className="text-gradient-purple">{data.subtitle}</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_BNJ_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-[#590293]/40 hover:bg-[#590293]/8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#590293]/20 transition-all group-hover:bg-[#590293]/30">
                {item.icon}
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-[#a898c0]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
