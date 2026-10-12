"use client";

import { motion } from "framer-motion";
import type { LandingPageData } from "@/lib/types";
import { BRAND } from "@/lib/constants";

interface FinalCTAProps {
  data: LandingPageData["finalCTA"];
  onOpenModal: () => void;
  onOpenCalendly: () => void;
}

export default function FinalCTA({ data, onOpenModal, onOpenCalendly }: FinalCTAProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 xl:px-20">
      {/* Deep purple bg */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08050f] via-[#0d0520] to-[#08050f]" />

      {/* Glow cluster */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#590293] opacity-15 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#c069ee] opacity-10 blur-[80px]" />
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[#feb527] opacity-5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND.logo.white}
            alt="BNJ Team Maker"
            style={{ height: "2.25rem", width: "auto", opacity: 0.85 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-monument text-4xl font-black text-white md:text-6xl leading-[1.1] mb-6"
        >
          {data.title}
          <br />
          <span className="text-gradient-gold">{data.titleAccent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-xl text-lg leading-8 text-[#a898c0] mb-10"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={onOpenCalendly}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#feb527] px-10 py-5 text-base font-bold text-[#08050f] transition-all hover:scale-105 hover:bg-[#ffc94d] active:scale-95 glow-gold"
          >
            {data.ctaPrimary}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-10 py-5 text-base font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
          >
            {data.ctaSecondary}
          </button>
        </motion.div>

        {/* Micro-proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-[#a898c0]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Appel gratuit, sans engagement
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Premiers profils sous 48h
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Garantie remplacement 30 jours
          </span>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 border-t border-white/8 pt-8 flex flex-col items-center gap-2 text-xs text-[#a898c0]/60">
          <p>© {new Date().getFullYear()} BNJ Team Maker. Tous droits réservés.</p>
          <p>{BRAND.email}</p>
        </div>
      </div>
    </section>
  );
}
