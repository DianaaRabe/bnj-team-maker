"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────
   Atomes du dossier. Tout le vocabulaire de la page passe par ici :
   tampons, réglures, champs à conducteur, onglets, cotes de pièce.
   Rien ici n'utilise de carte en verre, de halo ni de dégradé.
   ───────────────────────────────────────────────────────────────────── */

/** Angles de pose fixes — un tampon n'est jamais parfaitement droit,
 *  mais l'irrégularité doit être stable entre serveur et client. */
const ROT = [-2.1, 1.4, -1.2, 2.3, -0.8, 1.9, -2.6, 0.9];
export const rotFor = (i: number) => `${ROT[i % ROT.length]}deg`;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Révélation à l'entrée dans le viewport.
 *
 * Le contenu est rendu VISIBLE par le serveur. Le JS l'arme avant la peinture,
 * puis le joue à l'intersection. Sans JS, sans IntersectionObserver, ou si
 * l'hydratation échoue, la page reste entièrement lisible — ce qui n'était pas
 * le cas d'un `initial={{opacity:0}}` sérialisé dans le HTML.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    setState("armed");

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, cls: state === "idle" ? "" : state === "armed" ? "is-armed" : "is-in" };
}

/** Pose du tampon à l'entrée dans le viewport : une fois, jamais au survol. */
export function Stamp({
  children,
  index = 0,
  variant = "outline",
  className = "",
}: {
  children: ReactNode;
  index?: number;
  variant?: "outline" | "solid" | "gold";
  className?: string;
}) {
  const { ref, cls } = useReveal<HTMLSpanElement>();
  const skin =
    variant === "solid"
      ? "d-stamp d-stamp--solid"
      : variant === "gold"
        ? "d-stamp d-stamp--gold"
        : "d-stamp";

  return (
    <span
      ref={ref}
      style={{ "--d-rot": rotFor(index) } as CSSProperties}
      className={`${skin} d-stampfx ${cls} text-[0.62rem] md:text-[0.68rem] ${className}`}
    >
      {children}
    </span>
  );
}

/** Révélation sobre : le papier se pose, il ne glisse pas de 30px. */
export function Lift({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, cls } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? ({ "--d-delay": `${delay}s` } as CSSProperties) : undefined}
      className={`d-lift ${cls} ${className}`}
    >
      {children}
    </div>
  );
}

/** Cote de pièce : « PIÈCE 02 — LE VIVIER », dans la marge perforée. */
export function PieceHead({
  piece,
  label,
  title,
  accent,
  lead,
  align = "left",
  size = "full",
}: {
  piece: string;
  label: string;
  title: string;
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  /** `compact` pour les titres posés dans une colonne étroite. */
  size?: "full" | "compact";
}) {
  const titleSize =
    size === "compact"
      ? "text-[1.75rem] leading-[0.98] sm:text-[2.1rem] md:text-[2.35rem]"
      : "text-[2rem] leading-[0.95] sm:text-[2.6rem] md:text-[3.2rem]";

  return (
    <header className={align === "center" ? "text-center" : ""}>
      <div
        className={`d-typed flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.055em] text-[color:var(--d-text-2)] ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-[color:var(--d-ink)] font-bold">Pièce {piece}</span>
        <span aria-hidden className="h-px w-6 bg-[color:var(--d-stock-3)]" />
        <span>{label}</span>
      </div>

      <h2 className={`d-struck mt-4 text-[color:var(--d-text)] ${titleSize}`}>
        {title}
        {accent && (
          <>
            <br />
            <span className="text-[color:var(--d-ink)]">{accent}</span>
          </>
        )}
      </h2>

      {lead && (
        <p
          className={`mt-5 max-w-xl text-[0.95rem] leading-[1.75] text-[color:var(--d-text-2)] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/** Ligne de champ à conducteur pointillé : intitulé … valeur. */
export function FieldRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
}) {
  // Le conducteur vit dans son propre bloc d'une seule ligne : une valeur qui
  // passe sur deux lignes ne traîne plus un pointillé orphelin sous elle.
  return (
    <div className="flex items-start gap-1 text-[0.8rem]">
      <span className="flex min-w-0 flex-1 items-baseline">
        <span className="d-typed whitespace-nowrap uppercase tracking-[0.055em] text-[color:var(--d-text-2)]">
          {label}
        </span>
        <span aria-hidden className="d-leader" />
      </span>
      <span
        className={`d-typed max-w-[62%] text-right ${
          strong ? "font-bold text-[color:var(--d-ink)]" : "text-[color:var(--d-text)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/** Coche tracée, encre pleine — jamais un « ✕ », qui se lit comme un refus
 *  à côté d'une garantie. */
function CheckMark({ solid = false }: { solid?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center border-[1.5px] border-[color:var(--d-ink)] ${
        solid ? "bg-[color:var(--d-ink)]" : ""
      }`}
    >
      <svg viewBox="0 0 12 12" className="h-[13px] w-[13px]" fill="none" aria-hidden>
        <path
          d="M1.6 6.3 4.4 9.2 10.4 2.6"
          stroke={solid ? "var(--d-stock)" : "var(--d-ink)"}
          strokeWidth="2.2"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

/**
 * Bande de garanties — un bordereau de mentions réglé, à cellules séparées.
 * Remplace les trois puces discrètes : ces trois lignes portent la levée de
 * risque (langue, délai, remplacement), donc elles pèsent autant qu'un chiffre
 * du bordereau, pas autant qu'une note de bas de page.
 */
export function GuaranteeStrip({ items }: { items: string[] }) {
  return (
    <ul className="d-guarantee grid sm:grid-cols-3">
      {items.map((label, i) => (
        <li
          key={label}
          className={`flex items-center gap-3 py-3.5 sm:py-4 ${
            i > 0 ? "border-t border-[color:var(--d-stock-3)] sm:border-t-0 sm:border-l sm:pl-5" : "sm:pr-5"
          } ${i === 1 ? "sm:pl-5 sm:pr-5" : ""}`}
        >
          <CheckMark solid />
          <span className="text-[0.86rem] font-semibold leading-snug text-[color:var(--d-text)]">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Flèche tracée, d'un seul poids de trait — remplace le glyphe « → ». */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 10"
      className={`inline-block h-[9px] w-[18px] flex-shrink-0 ${className}`}
      fill="none"
      aria-hidden
    >
      <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/** Marque de dépliage d'un champ : plus / moins, tracés. */
export function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none" aria-hidden>
      <path d="M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
      {!open && <path d="M6 1v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />}
    </svg>
  );
}

/** Croix de fermeture, tracée. */
export function CloseMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none" aria-hidden>
      <path d="M1.5 1.5 10.5 10.5M10.5 1.5 1.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

/** Marge perforée à gauche d'une pièce du dossier — bande de classement,
 *  refermée par un filet pour ne pas flotter comme une colonne de puces. */
export function PerfMargin() {
  return (
    <div
      aria-hidden
      className="d-perf hidden w-[26px] flex-shrink-0 border-r border-[color:var(--d-stock-3)] bg-[color:var(--d-stock-2)] lg:block"
    />
  );
}
