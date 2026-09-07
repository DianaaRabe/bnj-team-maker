"use client";

import { useState } from "react";
import type { CompareCell as Cell, Vertical } from "@/lib/data/verticals";
import { Reveal } from "./Reveal";
import { useBooking } from "./BookingContext";

/* ─────────────────────────────────────────────────────────────────────
   Tableau comparatif — reproduction de la référence, en thème CLAIR.

   Cette section est volontairement une bande claire au milieu d'une page
   sombre : c'est la demande. Elle porte donc ses couleurs en dur plutôt
   que les tokens du portail, qui sont tous calibrés pour le fond noir.

   Trois choses font ce tableau :
   — la colonne mise en avant est un cadre arrondi posé PAR-DESSUS, qui
     déborde au-dessus de l'en-tête et sous la dernière ligne ;
   — les lignes sont séparées par des filets pleine largeur ;
   — la dernière ligne visible s'efface en dégradé. Le masque est appliqué
     au tableau seul, pas à son cadre : le blanc et la bordure restent
     intacts, seul le contenu s'estompe — c'est ce que fait la référence.
   ───────────────────────────────────────────────────────────────────── */

const CANAUX = ["BNJ", "Cabinet", "Freelance", "En interne"];

const VISIBLES = 6;

function Check({ on, tone }: { on: boolean; tone: string }) {
  return on ? (
    <svg viewBox="0 0 20 20" className={`mx-auto h-[18px] w-[18px] ${tone}`} fill="none" aria-hidden>
      <path d="M3.5 10.5 8 15 16.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="mx-auto h-[13px] w-[13px] text-[#c9c9d0]" fill="none" aria-hidden>
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Value({ v, bnj }: { v: Cell; bnj: boolean }) {
  if (typeof v === "boolean") {
    return (
      <>
        <Check on={v} tone={bnj ? "text-[#590293]" : "text-[#2f2f36]"} />
        <span className="sr-only">{v ? "oui" : "non"}</span>
      </>
    );
  }
  return <span className={bnj ? "font-semibold text-[#590293]" : "text-[#5a5a63]"}>{v}</span>;
}

export default function CompareTable({ compare }: { compare: Vertical["compare"] }) {
  const { requestBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const rows = open ? compare.rows : compare.rows.slice(0, VISIBLES);

  return (
    <section id="comparatif" className="relative z-10 bg-[#f7f7f8] px-4 py-20 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="text-center">
          <h2 className="text-[1.9rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#16161a] sm:text-[2.15rem]">
            {compare.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[1.05rem] leading-[1.55] text-[#6b6b73]">
            {compare.sub}
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-x-auto md:mt-14" delay={0.1}>
          {/* py-[9px] : c'est cette gouttière qui laisse le cadre de la colonne
              mise en avant déborder au-dessus et en dessous du tableau. */}
          <div className="relative min-w-[900px] py-[9px]">
            {/* Cadre blanc du tableau. Il n'est PAS masqué : seul le contenu
                s'estompe, le fond et la bordure restent nets. */}
            <div className="overflow-hidden rounded-[10px] border border-[#e6e6ea] bg-white">
              <table
                className="w-full table-fixed border-collapse"
                style={
                  open
                    ? undefined
                    : {
                        WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)",
                        maskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)",
                      }
                }
              >
                <colgroup>
                  <col style={{ width: "28%" }} />
                  {CANAUX.map((c) => (
                    <col key={c} style={{ width: "18%" }} />
                  ))}
                </colgroup>

                <thead>
                  <tr className="border-b border-[#e6e6ea]">
                    <th scope="col" className="px-6 py-[18px] text-left text-[0.95rem] font-normal text-[#4a4a52]">
                      Critère
                    </th>
                    {CANAUX.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`px-3 py-[18px] text-center text-[0.95rem] ${
                          i === 0 ? "font-semibold text-[#590293]" : "font-medium text-[#3f3f47]"
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, ri) => (
                    <tr key={r.critere} className={ri < rows.length - 1 ? "border-b border-[#ededf0]" : ""}>
                      <th
                        scope="row"
                        className="px-6 py-[17px] text-left text-[0.95rem] font-normal text-[#3f3f47]"
                      >
                        {r.critere}
                      </th>
                      {r.cells.map((v, ci) => (
                        <td key={ci} className="px-3 py-[17px] text-center text-[0.92rem]">
                          <Value v={v} bnj={ci === 0} />
                          {ci === 0 && r.tag ? (
                            <span className="mt-1 block whitespace-nowrap text-[0.68rem] font-medium text-[#590293]">
                              {r.tag}
                            </span>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cadre de la colonne BNJ : bordure seule, posée au-dessus, sans
                fond — le texte du tableau doit rester lisible au travers. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[28%] w-[18%] rounded-[10px] border border-[#590293]/40"
            />
          </div>
        </Reveal>

        {/* Chevron : dans la référence, il annonce la suite du tableau. */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex h-9 items-center gap-2 rounded-full px-4 text-[0.85rem] text-[#6b6b73] transition-colors hover:bg-black/[0.04] hover:text-[#16161a]"
          >
            {open ? "Réduire" : `Voir les ${compare.rows.length - VISIBLES} autres critères`}
            <svg
              viewBox="0 0 14 9"
              className={`h-2.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              aria-hidden
            >
              <path d="M1 1.5 7 7.5 13 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="mt-6 text-center text-[0.72rem] text-[#9a9aa2]">
          Valeurs BNJ issues du vivier réel. Ordres de grandeur constatés pour les autres canaux, à
          confirmer selon le profil et le contexte.
        </p>

        <div className="mt-8 flex justify-center">
          {/* Bande claire : ce bouton porte ses propres couleurs, pas
              la classe .p-cta calibrée pour le fond sombre. */}
          <button
            type="button"
            onClick={() => requestBooking()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#590293] px-6 py-3.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-[#6d0eb0]"
          >
            Réserver un appel
          </button>
        </div>
      </div>
    </section>
  );
}
