"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { TalentProfile } from "@/lib/data/profiles";
import { BRAND } from "@/lib/constants";
import { FieldRow, Arrow, CloseMark } from "./atoms";

/* ─────────────────────────────────────────────────────────────────────
   La consultation des fiches : une chemise qu'on ouvre par-dessus le
   dossier. Même matière — carton, réglure, encre — pas un panneau en
   verre flouté.
   ───────────────────────────────────────────────────────────────────── */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profiles: TalentProfile[];
}

export default function DossierModal({ isOpen, onClose, profiles }: Props) {
  const [current, setCurrent] = useState(0);
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const last = profiles.length; // dernier index = fiche de prise de rendez-vous
  const isCta = current === last;
  const profile = isCta ? null : profiles[current];

  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) setCurrent(0);
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, last));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, last]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="d-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#2b0748]/55"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Fiches talents disponibles"
            tabIndex={-1}
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              // Ombre douce : une chemise soulevée du bureau, pas un décalage
              // net de 6px — la règle Flat Stock refuse l'ombre portée dure.
              className="flex w-full max-w-[560px] flex-col border-[1.5px] border-[color:var(--d-ink,#590293)] bg-[#eceaf1] shadow-[0_18px_44px_rgba(43,7,72,0.3)]"
              style={{ maxHeight: "calc(100vh - 2rem)" }}
            >
              {/* En-tête de chemise */}
              <div className="flex items-center justify-between gap-4 border-b-[1.5px] border-[color:var(--d-ink,#590293)] px-5 py-3">
                <div>
                  <p className="d-typed text-[0.58rem] uppercase tracking-[0.11em] text-[#4a3d5c]">
                    Dossier DEV-2026 · Consultation
                  </p>
                  <p className="d-struck mt-0.5 text-[0.95rem] text-[#1c0b2e]">
                    {isCta ? "Suite du vivier" : `Fiche ${current + 1} sur ${profiles.length}`}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fermer la consultation"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[1.5px] border-[#1c0b2e] text-[#1c0b2e] transition-colors hover:bg-[#1c0b2e] hover:text-[#eceaf1]"
                >
                  <CloseMark />
                </button>
              </div>

              {/* Corps */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                {profile ? (
                  <div key={profile.id}>
                    <div className="flex items-start gap-4 border-b border-[#d5cee2] p-5">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-[#d5cee2] grayscale">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={profile.photo}
                          alt=""
                          aria-hidden
                          className="h-full w-full object-cover"
                          style={{ filter: "blur(5px)", transform: "scale(1.2)" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="d-struck text-[1.2rem] tracking-[-0.03em] text-[#1c0b2e]">
                          {profile.name}
                        </h2>
                        <p className="d-typed mt-1 text-[0.7rem] uppercase tracking-[0.055em] text-[#4a3d5c]">
                          {profile.role}
                        </p>
                        <span
                          className="d-typed mt-2 inline-block border px-1.5 py-0.5 text-[0.58rem] uppercase tracking-[0.07em]"
                          style={
                            profile.availability === "Disponible"
                              ? { borderColor: "#590293", color: "#590293" }
                              : { borderColor: "#7f6f99", color: "#4a3d5c" }
                          }
                        >
                          {profile.availability}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 border-b border-[#d5cee2] p-5">
                      <FieldRow label="Réf." value={profile.id.toUpperCase()} />
                      <FieldRow label="Expérience" value={profile.experience} />
                      <FieldRow label="Diplôme" value={profile.diploma} />
                      <FieldRow label="TJM" value={profile.tjm} strong />
                    </div>

                    <div className="border-b border-[#d5cee2] p-5">
                      <p className="d-typed text-[0.58rem] uppercase tracking-[0.095em] text-[#4a3d5c]">
                        Points forts
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {profile.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 text-[0.84rem] leading-6 text-[#4a3d5c]">
                            <span aria-hidden className="mt-[11px] h-px w-2 flex-shrink-0 bg-[#590293]" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5">
                      <p className="d-typed text-[0.58rem] uppercase tracking-[0.095em] text-[#4a3d5c]">
                        Compétences
                      </p>
                      <p className="d-typed mt-2 text-[0.8rem] leading-[1.75] text-[#1c0b2e]">
                        {profile.skills.join(" · ")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="d-typed text-[0.6rem] uppercase tracking-[0.11em] text-[#4a3d5c]">
                      Reste du vivier
                    </p>
                    <h2 className="d-struck mx-auto mt-3 max-w-[16ch] text-[1.7rem] leading-[0.98] text-[#1c0b2e]">
                      8 000 fiches ne tiennent pas dans une chemise.
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-[0.9rem] leading-[1.8] text-[#4a3d5c]">
                      En 30 minutes, on instruit votre besoin et on vous sort les profils qui
                      correspondent exactement — présentés sous 48h.
                    </p>
                    <a
                      href={BRAND.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="d-action mt-8 inline-block px-7 py-4 text-[0.76rem]"
                    >
                      Réserver l&apos;appel de 30 min
                    </a>
                    <p className="d-typed mt-4 text-[0.64rem] uppercase tracking-[0.07em] text-[#4a3d5c]">
                      Sans engagement · Premiers profils sous 48h
                    </p>
                  </div>
                )}
              </div>

              {/* Pied : action + pagination */}
              <div className="border-t-[1.5px] border-[color:var(--d-ink,#590293)]">
                {profile && (
                  <div className="border-b border-[#d5cee2] px-5 py-3.5">
                    <a
                      href={BRAND.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="d-action block px-5 py-3 text-center text-[0.72rem]"
                    >
                      Discuter de ce profil
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: profiles.length + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={i === last ? "Prendre rendez-vous" : `Fiche ${i + 1}`}
                        aria-current={i === current}
                        className={`d-typed h-6 border text-[0.6rem] font-bold uppercase tracking-[0.055em] transition-colors ${
                          i === last ? "px-2" : "w-6"
                        }`}
                        style={
                          i === current
                            ? { borderColor: "#590293", background: "#590293", color: "#eceaf1" }
                            : { borderColor: "#7f6f99", color: "#4a3d5c" }
                        }
                      >
                        {i === last ? "Suite" : i + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
                      disabled={current === 0}
                      aria-label="Fiche précédente"
                      className="flex h-8 w-8 items-center justify-center border-[1.5px] border-[#1c0b2e] text-[#1c0b2e] transition-colors hover:bg-[#1c0b2e] hover:text-[#eceaf1] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#1c0b2e]"
                    >
                      <Arrow className="rotate-180" />
                    </button>
                    <button
                      onClick={() => setCurrent((c) => Math.min(c + 1, last))}
                      disabled={current === last}
                      aria-label="Fiche suivante"
                      className="flex h-8 w-8 items-center justify-center border-[1.5px] border-[#1c0b2e] bg-[#590293] text-[#eceaf1] transition-opacity disabled:opacity-25"
                    >
                      <Arrow />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
