"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { SimPoste as Poste } from "@/lib/data/verticals";

/* ─────────────────────────────────────────────────────────────────────
   Simulateur de coût — TJM France vs TJM BNJ (Afrique francophone).

   La liste des postes vient de la verticale (lib/data/verticals.ts) :
   des développeurs sur /dev, des profils RH sur /rh, un panachage sur
   /offshore.

   ⚠ Les TJM France sont des ESTIMATIONS, pas des chiffres sourcés. Ils sont
   calés sur la seule affirmation que porte déjà le site (« 2 à 3 fois moins
   cher ») ; les TJM BNJ sont alignés sur les profils réels du vivier quand
   le poste y existe. À remplacer par la grille tarifaire réelle.

   ⚠ Les vignettes viennent du vivier anonymisé et sont floutées. Elles
   illustrent le poste, elles ne désignent pas une personne précise — aucun
   nom n'est affiché à côté, précisément pour ne rien affirmer.
   ───────────────────────────────────────────────────────────────────── */

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

function Avatar({ src, size = 30 }: { src: string; size?: number }) {
  return (
    <span
      style={{ height: size, width: size }}
      className="flex-shrink-0 overflow-hidden rounded-full border border-white/15"
    >
      {/* Flou léger seulement : à 26–30 px aucun visage n'est identifiable,
          et un flou fort transformait la vignette en bille grise. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
        style={{ filter: "blur(1.4px)", transform: "scale(1.1)" }}
      />
    </span>
  );
}

/** Select personnalisé : un <select> natif ne peut pas afficher d'image,
 *  d'où ce listbox — avec le clavier et le clic extérieur gérés. */
function PosteSelect({
  postes,
  value,
  onChange,
  labelId,
}: {
  postes: Poste[];
  value: Poste;
  onChange: (p: Poste) => void;
  labelId: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => postes.findIndex((p) => p.id === value.id));
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);

  const commit = (i: number) => {
    onChange(postes[i]);
    setCursor(i);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      return setOpen(true);
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % postes.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + postes.length) % postes.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(cursor);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="p-sim-field flex w-full items-center gap-3 rounded-xl py-2.5 pl-2.5 pr-4 text-left"
      >
        <Avatar src={value.photo} />
        <span className="min-w-0 flex-1 truncate text-[0.95rem] font-semibold text-white">
          {value.label}
        </span>
        <svg
          viewBox="0 0 14 9"
          className={`h-2.5 w-3.5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden
        >
          <path
            d="M1 1.5 7 7.5 13 1.5"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="p-sim-menu absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[264px] overflow-y-auto rounded-xl p-1.5"
        >
          {postes.map((p, i) => {
            const isSel = p.id === value.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => commit(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                    i === cursor ? "bg-white/[0.08]" : ""
                  }`}
                >
                  <Avatar src={p.photo} size={26} />
                  <span
                    className={`min-w-0 flex-1 truncate text-[0.88rem] ${
                      isSel ? "font-semibold text-white" : "text-white/70"
                    }`}
                  >
                    {p.label}
                  </span>
                  {isSel && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 flex-shrink-0" fill="none" aria-hidden>
                      <path
                        d="M1.6 6.3 4.4 9.2 10.4 2.6"
                        stroke="#d8b4fe"
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function CostSimulator({ postes }: { postes: Poste[] }) {
  const [poste, setPoste] = useState(postes[0]);
  const [jours, setJours] = useState(20);

  const economieAn = (poste.france - poste.bnj) * jours * 12;
  const ecartPct = Math.round(((poste.france - poste.bnj) / poste.france) * 100);

  const MIN = 5;
  const MAX = 22;
  const pct = ((jours - MIN) / (MAX - MIN)) * 100;

  const posteLabelId = useId();
  const rangeId = useId();

  return (
    <div className="relative mx-auto w-full max-w-[430px] text-left">
      <div
        aria-hidden
        className="p-sim-glow pointer-events-none absolute -right-4 top-1/2 h-[300px] w-[120px] -translate-y-1/2"
      />

      <div className="p-sim relative rounded-[20px] p-6 sm:p-7">
        {/* ── Poste ── */}
        <span id={posteLabelId} className="block text-[0.8rem] font-semibold text-white/70">
          Poste recherché
        </span>
        <div className="mt-2.5">
          <PosteSelect postes={postes} value={poste} onChange={setPoste} labelId={posteLabelId} />
        </div>

        {/* ── Jours facturés ── */}
        <div className="mt-6 flex items-baseline justify-between gap-4">
          <label htmlFor={rangeId} className="text-[0.8rem] font-semibold text-white/70">
            Jours facturés par mois
          </label>
          <span className="text-[0.95rem] font-semibold text-white">{jours} j</span>
        </div>

        <input
          id={rangeId}
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          value={jours}
          onChange={(e) => setJours(Number(e.target.value))}
          style={{ "--p-fill-pct": `${pct}%` } as CSSProperties}
          className="p-range mt-3.5"
          aria-valuetext={`${jours} jours facturés par mois`}
        />

        {/* ── La comparaison : c'est elle qui porte l'argument ── */}
        <div className="p-sim-result relative mt-6 overflow-hidden rounded-[14px]">
          <div aria-hidden className="p-sim-result-glow pointer-events-none absolute inset-0" />
          <div className="relative grid grid-cols-2">
            <div className="border-r border-white/10 px-5 py-5">
              <p className="text-[0.7rem] uppercase tracking-[0.08em] text-white/45">France</p>
              <p className="mt-1.5 text-[1.75rem] font-bold tracking-[-0.03em] text-white/80 sm:text-[2rem]">
                {eur(poste.france)}
              </p>
              <p className="mt-0.5 text-[0.7rem] text-white/35">par jour</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-[0.7rem] uppercase tracking-[0.08em] text-[#d8b4fe]">BNJ</p>
              <p
                className="mt-1.5 text-[1.75rem] font-bold tracking-[-0.03em] text-white sm:text-[2rem]"
                aria-live="polite"
              >
                {eur(poste.bnj)}
              </p>
              <p className="mt-0.5 text-[0.7rem] text-white/35">
                par jour · <span className="font-semibold text-[#feb527]">−{ecartPct} %</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── L'économie, en conséquence ── */}
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="text-[0.82rem] text-white/55">Vous économisez</span>
          <span className="whitespace-nowrap">
            <span className="text-[1.05rem] font-bold text-white">{eur(economieAn)}</span>
            <span className="ml-1 text-[0.78rem] text-white/45">/ an</span>
          </span>
        </div>

        <p className="mt-3 text-[0.68rem] leading-relaxed text-white/30">
          Estimation indicative. TJM France moyens constatés, à confirmer selon le profil et
          l&apos;ancienneté.
        </p>
      </div>
    </div>
  );
}
