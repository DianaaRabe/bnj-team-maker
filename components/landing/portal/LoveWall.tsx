import type { CSSProperties } from "react";
import type { Testimonial as Temoignage, Vertical } from "@/lib/data/verticals";
import { Reveal } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   Mur des retours — reproduction de la référence : badge, titre, dôme
   diffus, puis deux rangées décalées qui défilent en sens inverse et
   s'éteignent sur les deux bords.

   ⚠⚠ CONTENU DE DÉMONSTRATION ⚠⚠
   PRODUCT.md acte que BNJ ne dispose AUJOURD'HUI d'aucun témoignage
   nommé ni d'aucune photo client, et interdit explicitement d'en
   fabriquer. Les retours passés en props (lib/data/verticals.ts) sont
   des EXEMPLES destinés à montrer la mise en page : ni les noms, ni les
   entreprises, ni les propos ne correspondent à des personnes réelles.

   Le bandeau « Exemples de mise en page » affiché dans la section existe
   pour que personne ne prenne ces cartes pour de vraies références.
   À SUPPRIMER en même temps que vous remplacez les verbatims de chaque
   verticale par de vrais témoignages — et à ce moment-là seulement.

   Avatars : monogrammes, pas de visages. Coller une photo générée ou une
   banque d'images sur un faux témoignage aggraverait le problème.
   ───────────────────────────────────────────────────────────────────── */

const TEINTES = ["#c069ee", "#8b5cf6", "#feb527", "#5eead4", "#f472b6", "#60a5fa", "#a78bfa", "#fbbf24"];

function Monogramme({ nom, i }: { nom: string; i: number }) {
  const initiale = nom.trim().charAt(0).toUpperCase();
  const teinte = TEINTES[i % TEINTES.length];
  return (
    <span
      aria-hidden
      className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full text-[0.9rem] font-semibold"
      style={{ background: `${teinte}22`, color: teinte, border: `1px solid ${teinte}44` }}
    >
      {initiale}
    </span>
  );
}

/** Met « BNJ » en évidence dans le verbatim, comme les @mentions de la référence. */
function Texte({ children }: { children: string }) {
  const parts = children.split(/(BNJ)/g);
  return (
    <p className="mt-4 text-[0.92rem] leading-[1.62] text-white/60">
      {parts.map((p, i) =>
        p === "BNJ" ? (
          <span key={i} className="font-medium text-[#c069ee]">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}

function Carte({ t, i }: { t: Temoignage; i: number }) {
  return (
    <figure className="p-quote w-[360px] flex-shrink-0 rounded-[14px] px-5 py-5">
      <figcaption className="flex items-center gap-3">
        <Monogramme nom={t.nom} i={i} />
        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] font-semibold text-white">{t.nom}</span>
          <span className="block truncate text-[0.82rem] text-white/40">{t.poste}</span>
        </span>
      </figcaption>
      <Texte>{t.texte}</Texte>
    </figure>
  );
}

function Rangee({ items, reverse, speed }: { items: Temoignage[]; reverse?: boolean; speed: number }) {
  return (
    <div className="p-marquee overflow-hidden">
      {/* La liste est rendue deux fois : c'est ce qui permet à la translation
          de -50% de reboucler sans raccord. aria-hidden sur la copie pour ne
          pas doubler la lecture des lecteurs d'écran. */}
      <div
        className={`p-track ${reverse ? "p-track--rev" : ""}`}
        style={{ "--p-speed": `${speed}s` } as CSSProperties}
      >
        {items.map((t, i) => (
          <Carte key={`a${i}`} t={t} i={i} />
        ))}
        <span aria-hidden className="contents">
          {items.map((t, i) => (
            <Carte key={`b${i}`} t={t} i={i} />
          ))}
        </span>
      </div>
    </div>
  );
}

export default function LoveWall({ love }: { love: Vertical["love"] }) {
  const moitie = Math.ceil(love.items.length / 2);
  const haut = love.items.slice(0, moitie);
  const bas = love.items.slice(moitie);

  return (
    <section id="retours" className="relative z-10 overflow-hidden py-24 md:py-28">
      <div aria-hidden className="p-dome pointer-events-none absolute inset-x-0 top-0 h-[420px]" />

      {/* Les deux rangées défilent déjà en continu (.p-track) : les animer
          en plus à l'entrée ferait deux mouvements concurrents. Seul
          l'en-tête est révélé. */}
      <Reveal className="relative mx-auto max-w-[720px] px-4 text-center">
        <span className="inline-flex items-center rounded-full border border-white/[0.11] bg-white/[0.05] px-3.5 py-1.5 text-[0.8rem] text-white/80">
          Mur des retours
        </span>
        <h2 className="mt-6 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.7rem]">
          {love.title}
        </h2>
        <p className="mt-4 text-[0.98rem] text-white/45">{love.sub}</p>

        {/* Marqueur de contenu de démonstration. À retirer avec les faux
            verbatims, pas avant. */}
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#feb527]/35 bg-[#feb527]/10 px-3.5 py-1.5 text-[0.76rem] text-[#feb527]">
          Exemples de mise en page — à remplacer par de vrais témoignages
        </p>
      </Reveal>

      <div className="relative mt-14 space-y-5">
        <Rangee items={haut} speed={78} />
        {/* Décalage de la seconde rangée : sans lui, les deux rangées
            s'alignent verticalement et la grille se voit. */}
        <div className="translate-x-[-90px]">
          <Rangee items={bas} reverse speed={92} />
        </div>
      </div>

    </section>
  );
}
