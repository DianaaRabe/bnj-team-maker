import type { ReactNode } from "react";
import type { PainIcon, Vertical } from "@/lib/data/verticals";
import BookingButton from "./BookingButton";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   Grille des points de douleur — 4 × 2, reprise de la référence fournie.

   Le maillage est fait de filets posés à la main plutôt que de bordures :
   chaque cellule porte un trait vertical continu très faible, doublé d'un
   segment plus clair au niveau du titre. C'est ce second segment qui donne
   son relief à la grille ; une simple border-left rend la chose plate.

   La copie vient de lib/data/verticals.ts ; seuls les tracés vivent ici,
   parce qu'un fichier de données ne doit pas contenir de JSX.
   ───────────────────────────────────────────────────────────────────── */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ICONS: Record<PainIcon, ReactNode> = {
  clock: (
    <g {...S}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.6 1.7M9 2h6" />
    </g>
  ),
  cost: (
    <g {...S}>
      <path d="M3 18l5-5 3.5 3L21 7" />
      <path d="M15.5 7H21v5.5" />
    </g>
  ),
  funnel: (
    <g {...S}>
      <path d="M3 4h18l-7 8v7l-4 2v-9z" />
    </g>
  ),
  cycle: (
    <g {...S}>
      <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M18.5 2v3.8h-3.8M5.5 22v-3.8h3.8" />
    </g>
  ),
  commission: (
    <g {...S}>
      <path d="M5 19 19 5" />
      <circle cx="7.5" cy="7.5" r="2.6" />
      <circle cx="16.5" cy="16.5" r="2.6" />
    </g>
  ),
  language: (
    <g {...S}>
      <path d="M3 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-5 4z" />
      <path d="M19 9h0a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3" />
    </g>
  ),
  shield: (
    <g {...S}>
      <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z" />
      <path d="M9.5 11.5l5 5M14.5 11.5l-5 5" />
    </g>
  ),
  building: (
    <g {...S}>
      <path d="M3 20h18" />
      <path d="M4 20V9l7-5 7 5v11" />
      <path d="M9.5 20v-5h5v5" />
    </g>
  ),
  search: (
    <g {...S}>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M15.6 15.6 21 21" />
    </g>
  ),
  docs: (
    <g {...S}>
      <path d="M7 3h7l4.5 4.5V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M13.5 3v5H19" />
      <path d="M8.5 12.5h6M8.5 15.5h4" />
    </g>
  ),
  team: (
    <g {...S}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.6 20a6.4 6.4 0 0 1 12.8 0" />
      <path d="M16 5.4a3.4 3.4 0 0 1 0 6.4M18 14.4a6.4 6.4 0 0 1 3.4 5.6" />
    </g>
  ),
  calendar: (
    <g {...S}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8.6 14.4l2.2 2.2 4.4-4.4" />
    </g>
  ),
};

export default function PainGrid({ pains }: { pains: Vertical["pains"] }) {
  return (
    <section id="constat" className="relative z-10 px-4 pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-[1210px]">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#c069ee]">
            {pains.kicker}
          </p>
          <h2 className="mt-3 text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.4rem]">
            {pains.title}
            <br />
            <span className="text-white/45">{pains.titleMuted}</span>
          </h2>
        </Reveal>

        {/* Filet supérieur : il ferme la grille par le haut, comme la référence. */}
        <div className="border-t border-white/[0.08]">
          <RevealGroup as="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pains.items.map((p, i) => (
              <RevealItem
                as="li"
                key={p.title}
                className={`relative px-7 pb-10 pt-8 md:pb-12 ${
                  // Filet horizontal seulement quand la grille se replie. En 4
                  // colonnes la référence n'en a pas : les traits verticaux,
                  // continus d'une rangée à l'autre, suffisent à structurer.
                  i > 0 ? "border-t border-white/[0.06] sm:border-t-0" : ""
                } ${i >= 2 ? "sm:border-t sm:border-white/[0.06] lg:border-t-0" : ""}`}
              >
                {/* Trait continu très faible */}
                <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-white/[0.07]" />
                {/* Segment clair au niveau du titre */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[92px] h-[30px] w-px bg-white/30 md:top-[96px]"
                />

                <span className="block text-white/85">
                  <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" aria-hidden>
                    {ICONS[p.icon]}
                  </svg>
                </span>

                <h3 className="mt-9 text-[0.98rem] font-semibold tracking-[-0.015em] text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 max-w-[26ch] text-[0.92rem] leading-[1.6] text-white/45">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-12 flex justify-start md:mt-16">
          <BookingButton glow className="px-6 py-3.5 text-[0.9rem]" />
        </Reveal>
      </div>
    </section>
  );
}
