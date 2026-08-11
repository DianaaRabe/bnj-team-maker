"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/types";
import BookingButton from "./BookingButton";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   FAQ — accordéon simple, thème sombre cohérent avec le reste du portail.
   Le contenu vient de la verticale, qui part de GLOBAL_FAQ
   (lib/constants.ts) : pas de nouvelle donnée inventée ici.
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

export default function Faq({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 bg-[#0a0613] px-4 py-24 md:py-28">
      <div className="mx-auto max-w-[760px]">
        <Reveal className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/[0.11] bg-white/[0.05] px-3.5 py-1.5 text-[0.8rem] text-white/80">
            Questions fréquentes
          </span>
          <h2 className="mt-6 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.7rem]">
            Vous avez des questions
          </h2>
          <p className="mt-4 text-[0.98rem] text-white/45">Les réponses aux questions qu&apos;on nous pose le plus souvent</p>
        </Reveal>

        {/* stagger resserré : les questions se suivent de près, sinon la
            dernière arrive bien après que l'œil a atteint le bas du bloc. */}
        <RevealGroup className="mt-12" stagger={0.05}>
          {items.map((item, i) => (
            <RevealItem key={item.question}>
              <Item
                q={item.question}
                a={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex((v) => (v === i ? null : i))}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <BookingButton glow className="px-6 py-3.5 text-[0.9rem]" />
        </Reveal>
      </div>
    </section>
  );
}
