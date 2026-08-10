"use client";

import { useState } from "react";
import { BRAND, GLOBAL_FAQ } from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────────────
   FAQ — accordéon simple, thème sombre cohérent avec le reste du portail.
   Contenu repris de GLOBAL_FAQ (lib/constants.ts), déjà utilisé sur /dev :
   pas de nouvelle donnée inventée ici.
   ───────────────────────────────────────────────────────────────────── */

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[0.98rem] font-medium text-white/90">{q}</span>
        <svg
          viewBox="0 0 14 9"
          className={`h-2.5 w-3.5 flex-shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden
        >
          <path d="M1 1.5 7 7.5 13 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <p className="pb-5 pr-8 text-[0.9rem] leading-[1.6] text-white/50">{a}</p>
        </div>
      </div>
    </div>
  );
}

// Retirée de cette surface : question sur le français jugée redondante ici.
// GLOBAL_FAQ reste inchangée, elle est partagée avec /dev.
const FAQ_ITEMS = GLOBAL_FAQ.filter((item) => item.question !== "Les talents parlent-ils vraiment bien français ?");

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 bg-[#0a0613] px-4 py-24 md:py-28">
      <div className="mx-auto max-w-[760px]">
        <header className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/[0.11] bg-white/[0.05] px-3.5 py-1.5 text-[0.8rem] text-white/80">
            Questions fréquentes
          </span>
          <h2 className="mt-6 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.7rem]">
            Vous avez des questions
          </h2>
          <p className="mt-4 text-[0.98rem] text-white/45">Les réponses aux questions qu&apos;on nous pose le plus souvent</p>
        </header>

        <div className="mt-12">
          {FAQ_ITEMS.map((item, i) => (
            <Item
              key={item.question}
              q={item.question}
              a={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex((v) => (v === i ? null : i))}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          {/* Glow néon animé — voir .p-formglow dans globals.css. */}
          <div className="p-formglow relative inline-block rounded-lg">
            <a
              href={BRAND.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="p-cta relative z-10 inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[0.9rem] font-medium"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
