"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star, Wrench, Clock, GraduationCap, Calendar, Users } from "lucide-react";
import type { TalentProfile } from "@/lib/data/profiles";
import { BRAND } from "@/lib/constants";

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: TalentProfile[];
  variant: "dev" | "sdr" | "rh";
}

const variantLabel: Record<string, string> = {
  dev: "développeurs",
  sdr: "commerciaux SDR",
  rh: "profils RH",
};

const availabilityStyle = {
  "Disponible": "bg-green-500/15 text-green-400 border-green-500/30",
  "Bientôt disponible": "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function TalentModal({ isOpen, onClose, profiles, variant }: TalentModalProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [prevOpen, setPrevOpen] = useState(isOpen);

  // Réinitialise sur le premier slide à l'ouverture (ajustement en rendu plutôt
  // qu'un effet — évite un re-render en cascade).
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) setCurrent(0);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = () => { if (current > 0) goTo(current - 1); };
  const next = () => { if (current <= profiles.length) goTo(current + 1); };

  const isCalendlySlide = current === profiles.length;
  const profile = !isCalendlySlide ? profiles[current] : null;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 340 : -340, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -340 : 340, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f0a1a] shadow-2xl overflow-hidden"
              style={{ maxHeight: "calc(100vh - 2rem)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-[#c069ee]">
                    Talents du moment
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Nos {variantLabel[variant]} disponibles
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Carousel */}
              <div className="overflow-hidden relative" style={{ minHeight: 420 }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 overflow-y-auto"
                  >
                    {!isCalendlySlide && profile ? (
                      <div className="p-6 space-y-5">
                        {/* Profile header */}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 h-16 w-16 rounded-2xl overflow-hidden border border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={profile.photo}
                              alt={profile.name}
                              className="w-full h-full object-cover"
                              style={{ filter: "blur(5px)", transform: "scale(1.2)" }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-white font-monument">
                                {profile.flag} {profile.name}
                              </h3>
                              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${availabilityStyle[profile.availability]}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {profile.availability}
                              </span>
                            </div>
                            <p className="text-sm text-[#c069ee] font-medium mt-0.5">{profile.role}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center gap-1 text-xs text-[#a898c0] bg-white/5 rounded-full px-2.5 py-1">
                                <Clock className="h-3 w-3" /> {profile.experience}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-[#a898c0] bg-white/5 rounded-full px-2.5 py-1">
                                <GraduationCap className="h-3 w-3" /> {profile.diploma}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#feb527] bg-[#feb527]/10 border border-[#feb527]/20 rounded-full px-2.5 py-1">
                                {profile.tjm}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a898c0] mb-3">
                            <Star className="h-3 w-3 text-[#feb527]" /> Points forts
                          </p>
                          <ul className="space-y-2">
                            {profile.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-6">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#590293]" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#a898c0] mb-3">
                            <Wrench className="h-3 w-3 text-[#feb527]" /> Compétences
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-[#feb527]/15 border border-[#feb527]/20 px-3 py-1 text-xs font-semibold text-[#feb527]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Calendly slide */
                      <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: 420 }}>
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#feb527]/15">
                          <Users className="h-9 w-9 text-[#feb527]" />
                        </div>
                        <h3 className="font-monument text-2xl font-black text-white mb-3">
                          Vous voulez voir
                          <br />
                          <span className="text-gradient-gold">plus de profils ?</span>
                        </h3>
                        <p className="text-sm leading-7 text-[#a898c0] max-w-xs mb-8">
                          Nous avons plus de 8 000 candidats qualifiés dans notre ATS. En 30 minutes, on vous sélectionne
                          les profils qui correspondent exactement à votre besoin.
                        </p>
                        <a
                          href={BRAND.calendly}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="inline-flex items-center gap-2 rounded-full bg-[#feb527] px-8 py-4 text-base font-bold text-[#08050f] transition-all hover:scale-105 hover:bg-[#ffc94d] active:scale-95 glow-gold"
                        >
                          <Calendar className="h-4 w-4" />
                          Réserver un appel gratuit
                        </a>
                        <p className="mt-4 text-xs text-[#a898c0]">Sans engagement · Premiers profils sous 48h</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-white/8">
                {/* Sticky CTA — visible immediately for profile slides */}
                {!isCalendlySlide && (
                  <div className="px-6 pt-4 pb-2">
                    <a
                      href={BRAND.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#590293] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#6d03b3] hover:scale-[1.02] active:scale-95"
                    >
                      Discuter de ce profil →
                    </a>
                  </div>
                )}

                {/* Navigation dots + arrows */}
                <div className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[...profiles, { id: "cta" }].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all ${
                          i === current
                            ? "w-6 h-2 bg-[#590293]"
                            : i === profiles.length
                            ? "h-2 w-2 bg-[#feb527]/50 hover:bg-[#feb527]"
                            : "h-2 w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      disabled={current === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/30 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={next}
                      disabled={current === profiles.length}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#590293] text-white transition-all hover:bg-[#6d03b3] disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
