"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { LandingPageData } from "@/lib/types";

interface APlayersProps {
  data: LandingPageData["aPlayers"];
  onOpenModal: () => void;
}

const metrics = [
  { label: "Économisés sur vos coûts RH", value: "jusqu'à 65%" },
  { label: "Candidats dans notre ATS", value: "8 000+" },
  { label: "Seulement 12% des candidats acceptés", value: "12%" },
  { label: "Taux de satisfaction à 90 jours", value: "94%" },
];

export default function APlayers({ data, onOpenModal }: APlayersProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#feb527] opacity-5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-3xl border border-[#590293]/25 bg-gradient-to-br from-[#590293]/10 via-[#0f0a1a] to-[#c069ee]/5 p-10 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#feb527]/30 bg-[#feb527]/10 px-4 py-1.5 text-sm font-medium text-[#feb527] mb-6">
              <Trophy className="h-3.5 w-3.5" />
              La vraie valeur
            </span>
            <h2 className="font-monument text-3xl font-black text-white md:text-5xl leading-tight mb-6">
              {data.title}
              <br />
              <span className="text-gradient-gold">{data.headlineAccent}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-lg leading-8 text-[#a898c0]">{data.body}</p>
            <p className="text-base leading-7 text-[#a898c0]/80 italic border-l-2 border-[#590293] pl-4">{data.proof}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
                <div className="font-monument text-2xl font-black text-[#feb527]">{m.value}</div>
                <div className="mt-1 text-xs leading-5 text-[#a898c0]">{m.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10"
          >
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#feb527] px-8 py-4 text-base font-bold text-[#08050f] transition-all hover:scale-105 hover:bg-[#ffc94d] active:scale-95 glow-gold"
            >
              Je veux ces profils →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
