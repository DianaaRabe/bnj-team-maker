import Link from "next/link";
import { METIERS } from "@/lib/data/verticals";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   Les métiers couverts — surface /offshore uniquement.

   C'est la section qui justifie l'existence de cette page : les trois
   verticales outillées (dev, RH, sales) y voisinent avec les métiers que
   BNJ staffe sans landing dédiée.

   ⚠ Le TJM n'est affiché que lorsqu'un profil réel du vivier le
   substantie. Les autres cartes affichent « Tarif sur demande » plutôt
   qu'un chiffre inventé — voir le commentaire de METIERS.
   ───────────────────────────────────────────────────────────────────── */

export default function RolesGrid() {
  return (
    <section id="metiers" className="relative z-10 px-4 pb-4 pt-24 md:pt-32">
      <div className="mx-auto max-w-[1210px]">
        <Reveal className="mb-12 md:mb-14">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#c069ee]">
            Les métiers
          </p>
          <h2 className="mt-3 text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.4rem]">
            Un seul interlocuteur,
            <br />
            <span className="text-white/45">tous les postes de votre équipe.</span>
          </h2>
        </Reveal>

        {/* stagger court : huit cartes en 0.07 s d'écart tiennent en une
            demi-seconde, la cascade se lit sans se faire attendre. */}
        <RevealGroup as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {METIERS.map((m) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1rem] font-semibold tracking-[-0.015em] text-white">
                    {m.nom}
                  </h3>
                  {m.href ? (
                    <svg
                      viewBox="0 0 14 14"
                      className="mt-1 h-3 w-3 flex-shrink-0 text-white/30 transition-colors group-hover:text-[#c069ee]"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3.5 10.5 10.5 3.5M4.8 3.5h5.7v5.7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>

                <p className="mt-2 text-[0.88rem] leading-[1.55] text-white/45">{m.pitch}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.skills.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[0.7rem] text-white/55"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* mt-auto : le tarif se cale sur le bas de la carte, sinon
                    il flotte à des hauteurs différentes selon que la liste
                    de compétences tient sur une ou deux lignes. */}
                <p className="mt-auto pt-4 text-[0.8rem]">
                  {m.tjm ? (
                    <span className="font-semibold text-[#feb527]">{m.tjm}</span>
                  ) : (
                    <span className="text-white/35">Tarif sur demande</span>
                  )}
                </p>
              </>
            );

            return (
              <RevealItem as="li" key={m.nom}>
                {m.href ? (
                  <Link
                    href={m.href}
                    className="group flex h-full flex-col rounded-[14px] border border-white/[0.09] bg-white/[0.025] p-5 transition-colors hover:border-[#c069ee]/40 hover:bg-white/[0.05]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-[14px] border border-white/[0.07] bg-white/[0.02] p-5">
                    {inner}
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
