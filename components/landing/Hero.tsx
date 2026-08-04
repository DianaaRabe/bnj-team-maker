"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Flame, Target, CheckCircle, Clock, Shield, Users, Calendar } from "lucide-react";
import type { LandingPageData } from "@/lib/types";
import { BRAND } from "@/lib/constants";

interface HeroProps {
  data: LandingPageData["hero"];
  stats: LandingPageData["stats"];
  variant: LandingPageData["variant"];
  onOpenModal: () => void;
}

const variantIcon = {
  dev: <Zap className="h-3.5 w-3.5" />,
  sdr: <Flame className="h-3.5 w-3.5" />,
  rh: <Target className="h-3.5 w-3.5" />,
};

const trustBadges = [
  { icon: <CheckCircle className="h-3.5 w-3.5 text-green-400" />, label: "Talents 100% francophones" },
  { icon: <Clock className="h-3.5 w-3.5 text-[#feb527]" />, label: "Disponibles sous 7 jours" },
  { icon: <Shield className="h-3.5 w-3.5 text-[#c069ee]" />, label: "Garantie remplacement 30 jours" },
];

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ data, stats, variant, onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid noise-overlay px-6 pt-28 pb-16 md:px-12 xl:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-[#590293] opacity-20 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-[#c069ee] opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 h-[300px] w-[300px] rounded-full bg-[#590293] opacity-15 blur-[80px]" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#feb527] opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <div className="flex flex-col items-start">
            <FadeUp delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#590293]/40 bg-[#590293]/10 px-4 py-2 text-sm font-medium text-[#c069ee] backdrop-blur-sm mb-7">
                {variantIcon[variant]}
                {data.badge}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-monument text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl xl:text-6xl mb-5">
                {data.headline}
                <br />
                <span className="text-gradient-gold">{data.headlineAccent}</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-lg text-base leading-8 text-[#a898c0] md:text-lg mb-9">
                {data.subheadline}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={onOpenModal}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#590293] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-900/40 active:scale-95 glow-purple"
                >
                  {data.ctaPrimary}
                </button>
                <a
                  href={BRAND.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 whitespace-nowrap backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  {data.ctaSecondary}
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="mt-8 flex flex-col gap-2.5 text-sm text-[#a898c0] sm:flex-row sm:flex-wrap sm:gap-5">
                {trustBadges.map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5">
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[420px] w-[420px] rounded-full bg-[#590293] opacity-15 blur-[80px]" />
            </div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="absolute -inset-6 rounded-full border border-[#feb527]/10" />
              <div className="absolute -inset-12 rounded-full border border-[#590293]/10" />

              <Image
                src="/images/avatar.png"
                alt="BNJ Team Maker — Votre partenaire RH"
                width={460}
                height={540}
                className="relative z-10 w-[300px] drop-shadow-2xl md:w-[380px] lg:w-[440px]"
                priority
              />

              {/* Floating badge 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute -left-8 top-16 rounded-2xl border border-white/10 bg-glass px-4 py-3 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Users className="h-3.5 w-3.5 text-[#feb527]" />
                  <div className="font-monument text-xl font-black text-[#feb527]">8 000+</div>
                </div>
                <div className="text-xs text-[#a898c0]">Talents qualifiés</div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute -right-6 bottom-24 rounded-2xl border border-white/10 bg-glass px-4 py-3 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Clock className="h-3.5 w-3.5 text-[#feb527]" />
                  <div className="font-monument text-xl font-black text-[#feb527]">7 jours</div>
                </div>
                <div className="text-xs text-[#a898c0]">Pour recruter</div>
              </motion.div>

              {/* Floating badge 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="absolute -right-4 top-8 rounded-2xl border border-[#590293]/30 bg-[#590293]/15 px-3 py-2 backdrop-blur-md hidden sm:block"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Disponibles maintenant
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS */}
        <FadeUp delay={0.55}>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-glass p-5 text-center transition-all hover:bg-glass-purple"
              >
                <div className="font-monument text-2xl font-black text-[#feb527] md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{stat.label}</div>
                {stat.sublabel && (
                  <div className="mt-0.5 text-xs text-[#a898c0]">{stat.sublabel}</div>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#a898c0]"
      >
        <span>Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Calendar className="h-4 w-4 opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
