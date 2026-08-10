import type { ReactNode } from "react";
import { BRAND } from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────────────
   Grille des points de douleur — 4 × 2, reprise de la référence fournie.

   Le maillage est fait de filets posés à la main plutôt que de bordures :
   chaque cellule porte un trait vertical continu très faible, doublé d'un
   segment plus clair au niveau du titre. C'est ce second segment qui donne
   son relief à la grille ; une simple border-left rend la chose plate.

   Les quatre premiers points reprennent mot pour mot la copie existante de
   lib/data/dev.ts. Les quatre suivants sont dérivés d'affirmations déjà
   présentes sur le site — aucun chiffre nouveau n'est introduit.
   ───────────────────────────────────────────────────────────────────── */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

type Pain = { title: string; body: string; icon: ReactNode };

const PAINS: Pain[] = [
  {
    title: "3 à 6 mois de recrutement",
    body: "Annonce, entretiens, préavis. Votre roadmap attend.",
    icon: (
      <g {...S}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.6 1.7M9 2h6" />
      </g>
    ),
  },
  {
    title: "Des salaires qui s'envolent",
    body: "60 à 80K€ brut pour un senior à Paris, hors charges.",
    icon: (
      <g {...S}>
        <path d="M3 18l5-5 3.5 3L21 7" />
        <path d="M15.5 7H21v5.5" />
      </g>
    ),
  },
  {
    title: "Trop peu de bons profils",
    body: "Les meilleurs sont en poste, sollicités chaque semaine.",
    icon: (
      <g {...S}>
        <path d="M3 4h18l-7 8v7l-4 2v-9z" />
      </g>
    ),
  },
  {
    title: "Un turnover qui coûte cher",
    body: "Un départ à un an : 6 à 9 mois de salaire perdus.",
    icon: (
      <g {...S}>
        <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
        <path d="M18.5 2v3.8h-3.8M5.5 22v-3.8h3.8" />
      </g>
    ),
  },
  {
    title: "La commission du cabinet",
    body: "15 à 20% du salaire annuel, à chaque recrutement.",
    icon: (
      <g {...S}>
        <path d="M5 19 19 5" />
        <circle cx="7.5" cy="7.5" r="2.6" />
        <circle cx="16.5" cy="16.5" r="2.6" />
      </g>
    ),
  },
  {
    title: "La barrière de la langue",
    body: "Specs mal comprises, allers-retours, temps perdu.",
    icon: (
      <g {...S}>
        <path d="M3 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-5 4z" />
        <path d="M19 9h0a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3" />
      </g>
    ),
  },
  {
    title: "Aucune garantie",
    body: "Un mauvais casting et vous repartez de zéro.",
    icon: (
      <g {...S}>
        <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z" />
        <path d="M9.5 11.5l5 5M14.5 11.5l-5 5" />
      </g>
    ),
  },
  {
    title: "L'onboarding à votre charge",
    body: "Ni process ni suivi : votre équipe absorbe tout.",
    icon: (
      <g {...S}>
        <path d="M3 20h18" />
        <path d="M4 20V9l7-5 7 5v11" />
        <path d="M9.5 20v-5h5v5" />
      </g>
    ),
  },
];

export default function PainGrid() {
  return (
    <section id="constat" className="relative z-10 px-4 pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-[1210px]">
        <div className="mb-12 md:mb-16">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#c069ee]">
            Le constat
          </p>
          <h2 className="mt-3 text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.4rem]">
            Recruter un bon dev en France,
            <br />
            <span className="text-white/45">c&apos;est devenu un sport extrême.</span>
          </h2>
        </div>

        {/* Filet supérieur : il ferme la grille par le haut, comme la référence. */}
        <div className="border-t border-white/[0.08]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PAINS.map((p, i) => (
              <li
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
                    {p.icon}
                  </svg>
                </span>

                <h3 className="mt-9 text-[0.98rem] font-semibold tracking-[-0.015em] text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 max-w-[26ch] text-[0.92rem] leading-[1.6] text-white/45">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-start md:mt-16">
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
