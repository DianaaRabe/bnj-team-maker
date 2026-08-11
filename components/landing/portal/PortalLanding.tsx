"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TalentProfile } from "@/lib/data/profiles";
import type { Vertical } from "@/lib/data/verticals";
import { BRAND } from "@/lib/constants";
import { grilleMois, libelleJour, libelleMois, ouvrirCal, useCalSlots } from "./useCalSlots";
import BookingButton from "./BookingButton";
import { RevealOnLoad } from "./Reveal";
import CostSimulator from "./CostSimulator";
import FloatingTech from "./FloatingTech";
import PainGrid from "./PainGrid";
import CompareTable from "./CompareTable";
import LoveWall from "./LoveWall";
import ProcessSpire from "./ProcessSpire";
import RolesGrid from "./RolesGrid";
import Faq from "./Faq";
import BookingArc from "./BookingArc";
import PortalFooter from "./PortalFooter";

/* ─────────────────────────────────────────────────────────────────────
   Coquille commune aux trois surfaces — /dev, /rh, /offshore.

   Toute la copie arrive par la prop `v` (lib/data/verticals.ts) : ce
   fichier ne connaît aucun métier en particulier. Ajouter une verticale
   se fait en ajoutant une entrée de données et une route, pas en
   dupliquant ce composant.

   Hero « portail ». Reproduction de la référence fournie.

   La signature tient à une seule chose : le dôme lumineux est OCCULTÉ par
   l'arête haute du panneau. La zone lumineuse est en overflow-hidden et son
   bord bas coïncide exactement avec le haut du panneau ; chaque couche est
   ancrée en bas avec un décalage négatif, donc seule sa moitié supérieure
   est visible. C'est ce que lit l'œil comme un lever de soleil.

   Empilement, du fond vers l'avant :
     halo (diffusion) → ailes (nappe horizontale) → cœur (dôme chaud)
     → filament (trait posé sur l'arête) → panneau → fuite de lumière.
   ───────────────────────────────────────────────────────────────────── */

/**
 * Chaque entrée doit viser une section qui existe RÉELLEMENT dans la page.
 * « Métiers » n'existe que sur /offshore : il est ajouté à la volée plutôt
 * que d'être listé ici et de pointer dans le vide sur les deux autres.
 */
const NAV = [
  { label: "Profils", href: "#profils" },
  { label: "Tarifs", href: "#comparatif" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/** Poussière d'étoiles — positions fixes, jamais aléatoires : le rendu
 *  serveur et le rendu client doivent coïncider. */
const STARS = [
  [12, 46, 1.6, 0.5], [19, 28, 1.1, 0.35], [26, 58, 1.3, 0.45], [31, 22, 1, 0.3],
  [35, 66, 1.5, 0.55], [39, 38, 1.1, 0.4], [43, 71, 1.2, 0.5], [46, 18, 1.4, 0.45],
  [49, 61, 1, 0.35], [52, 33, 1.6, 0.6], [55, 74, 1.2, 0.45], [58, 25, 1.1, 0.35],
  [62, 55, 1.4, 0.5], [66, 41, 1, 0.3], [69, 68, 1.3, 0.45], [73, 30, 1.5, 0.5],
  [77, 59, 1.1, 0.35], [81, 44, 1.2, 0.4], [85, 24, 1, 0.3], [88, 63, 1.4, 0.45],
  [8, 62, 1.2, 0.3], [15, 72, 1, 0.28], [92, 40, 1.1, 0.3], [70, 15, 1.2, 0.32],
  [28, 12, 1, 0.26], [60, 12, 1.1, 0.3], [40, 52, 0.9, 0.4], [50, 48, 0.9, 0.35],
] as const;

function Portal({ techs }: { techs: Vertical["techs"] }) {
  return (
    <div aria-hidden className="pointer-events-none relative h-[260px] sm:h-[340px] md:h-[420px]">
      {/* Diffusion ambiante — HORS de la zone rognée, donc libre de monter
          derrière l'accroche et de s'éteindre par sa propre courbe. */}
      <div className="p-ambient absolute bottom-0 left-1/2 h-[980px] w-[1600px] -translate-x-1/2" />

      {/* Zone rognée : le bord bas coïncide avec l'arête du panneau. */}
      <div className="p-portal absolute inset-0 overflow-hidden">
      {/* Anneaux concentriques — centrés sur l'arête, moitié haute visible */}
      {[640, 940, 1280].map((d) => (
        <div
          key={d}
          style={{ height: d, width: d }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/[0.055]"
        />
      ))}

      {/* Poussière d'étoiles */}
      {STARS.map(([l, t, s, o], i) => (
        <span
          key={i}
          style={{ left: `${l}%`, top: `${t}%`, height: s, width: s, opacity: o }}
          className="absolute rounded-full bg-white"
        />
      ))}

      {/* Nappe horizontale le long de l'arête */}
      <div className="p-wings absolute bottom-[-200px] left-1/2 h-[400px] w-[1900px] -translate-x-1/2" />
      {/* Dôme chaud */}
      <div className="p-core absolute bottom-[-245px] left-1/2 h-[490px] w-[490px] -translate-x-1/2 rounded-full" />
      {/* Liseré d'arc */}
      <div className="p-rim absolute bottom-[-215px] left-1/2 h-[430px] w-[430px] -translate-x-1/2 rounded-full" />
      {/* Noyau incandescent */}
      <div className="p-core-hot absolute bottom-[-110px] left-1/2 h-[220px] w-[260px] -translate-x-1/2 rounded-full" />
      {/* Filament posé sur l'arête */}
      <div className="p-filament absolute bottom-[-7px] left-1/2 h-[16px] w-[1020px] -translate-x-1/2" />
      </div>

      {/* Icônes outils — hors de la zone rognée, sinon le masque du haut
          les effacerait et le bord bas les couperait net. */}
      <FloatingTech techs={techs} />
    </div>
  );
}

/* ── Panneau applicatif : même géométrie 3 colonnes que la référence,
      la vidéo est remplacée par le vivier de profils. ──────────────── */

/**
 * Colonne « Disponibilités » — les VRAIS jours réservables.
 *
 * Elle affichait un mois figé en dur avec des jours décoratifs : une
 * promesse de disponibilité que rien ne tenait, et un mois périmé dès le
 * mois suivant. Elle lit maintenant le même agenda que le panneau de
 * réservation du bas, et un clic sur un jour ouvre la modale Cal dessus.
 */
function Disponibilites() {
  const { etat, jours } = useCalSlots();

  const dispo = useMemo(() => new Set(jours.map((j) => j.date)), [jours]);
  const ancre = jours[0]?.date.slice(0, 7) ?? null;
  const grille = ancre ? grilleMois(ancre) : null;

  return (
    <div className="hidden border-l border-white/[0.07] p-5 lg:block">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[1rem] font-semibold text-white/90">Disponibilités</p>
        <span className="text-[0.82rem] capitalize text-white/40">
          {ancre ? libelleMois(ancre) : ""}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-[0.72rem] text-white/35">
        {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* La grille garde sa place pendant le chargement : sans réserve de
          hauteur, le panneau sursaute à l'arrivée des créneaux. */}
      <div className="mt-1.5 min-h-[186px]">
        {grille ? (
          <div className="grid grid-cols-7 gap-y-1 text-center text-[0.85rem]">
            {Array.from({ length: grille.decalage }, (_, i) => (
              <span key={`v${i}`} />
            ))}
            {Array.from({ length: grille.nbJours }, (_, i) => i + 1).map((n) => {
              const date = grille.date(n);
              const libre = dispo.has(date);
              if (!libre) {
                return (
                  <span
                    key={n}
                    className="mx-auto flex h-7 w-7 items-center justify-center text-white/20"
                  >
                    {n}
                  </span>
                );
              }
              return (
                <button
                  key={n}
                  onClick={() => ouvrirCal(date)}
                  aria-label={`Réserver un appel le ${libelleJour(date)}`}
                  className="mx-auto flex h-7 w-7 items-center justify-center rounded-md font-medium text-white/85 transition-colors hover:bg-[#590293] hover:text-white"
                >
                  {n}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="pt-6 text-center text-[0.82rem] text-white/30" aria-live="polite">
            {etat === "erreur" ? "Agenda indisponible" : "Chargement de l'agenda…"}
          </p>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
        <p className="text-[0.82rem] text-white/45">Démarrage possible</p>
        <p className="mt-1 text-[1.1rem] font-semibold text-white">Sous 7 jours</p>
      </div>

      <div className="mt-3">
        <BookingButton className="w-full justify-center px-4 py-2.5 text-[0.88rem]" />
      </div>
    </div>
  );
}

function ProfilePanel({ profiles }: { profiles: TalentProfile[] }) {
  const [selected, setSelected] = useState(0);
  const active = profiles[selected];
  const suivant = () => setSelected((i) => (i + 1) % profiles.length);

  return (
    <div className="p-panel relative mx-auto min-h-[470px] max-w-[1210px] overflow-hidden rounded-t-[16px] sm:min-h-[560px]">
      {/* Fuite de lumière à travers le haut du panneau */}
      <div aria-hidden className="p-bleed pointer-events-none absolute inset-x-0 top-0 h-[260px]" />

      {/* 276px : en dessous, l'intitulé de poste des profils est tronqué. */}
      <div className="relative grid h-full grid-cols-1 md:grid-cols-[276px_minmax(0,1fr)] lg:grid-cols-[276px_minmax(0,1fr)_296px]">
        {/* Colonne 1 — le vivier, et rien d'autre.
            La barre de recherche et les onglets qui vivaient ici ne
            faisaient rien : au milieu d'eux, les seuls éléments réellement
            cliquables — les profils — ne se lisaient pas comme tels. */}
        <div className="hidden border-r border-white/[0.07] p-4 md:block">
          <p className="px-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/35">
            Profils du vivier
          </p>

          <div className="mt-3 space-y-1.5">
            {profiles.map((p, i) => {
              const actif = i === selected;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(i)}
                  aria-pressed={actif}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    actif
                      ? "border-[#c069ee]/45 bg-[#590293]/25"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-white/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photo}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                      style={{ filter: "blur(2.5px)", transform: "scale(1.15)" }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[0.92rem] font-medium ${
                        actif ? "text-white" : "text-white/75"
                      }`}
                    >
                      {p.name}
                    </span>
                    <span className="block truncate text-[0.78rem] text-white/40">{p.role}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colonne 2 — la fiche */}
        <div className="min-w-0 overflow-hidden p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[0.85rem] text-white/45">
              <span className="h-3.5 w-[2px] rounded bg-[#c069ee]" />
              Vivier BNJ · {profiles.length} profils affichés sur 8 000+
            </div>

            {/* Sur mobile la colonne de gauche est masquée : sans ce bouton,
                un seul profil serait atteignable au format téléphone. */}
            <button
              onClick={suivant}
              aria-label="Voir le profil suivant"
              className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] pl-3 pr-2.5 text-[0.84rem] font-medium text-white/75 transition-colors hover:border-[#c069ee]/50 hover:bg-[#590293]/25 hover:text-white"
            >
              Suivant
              <svg viewBox="0 0 9 14" className="h-3 w-2" fill="none" aria-hidden>
                <path
                  d="M1.5 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.photo}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                style={{ filter: "blur(4px)", transform: "scale(1.25)" }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-[1.45rem] font-semibold tracking-[-0.02em] text-white">
                {active.name}
              </h2>
              <p className="mt-1 text-[0.98rem] text-white/55">{active.role}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[0.78rem] ${
                    active.availability === "Disponible"
                      ? "border-[#c069ee]/40 bg-[#c069ee]/10 text-[#d8b4fe]"
                      : "border-white/15 bg-white/[0.04] text-white/50"
                  }`}
                >
                  {active.availability}
                </span>
                <span className="rounded-full border border-[#feb527]/35 bg-[#feb527]/10 px-2.5 py-1 text-[0.78rem] font-semibold text-[#feb527]">
                  {active.tjm}
                </span>
                <span className="text-[0.85rem] text-white/45">{active.experience}</span>
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {active.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] leading-7 text-white/65">
                <span aria-hidden className="mt-[13px] h-px w-3 flex-shrink-0 bg-[#c069ee]" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {active.skills.slice(0, 8).map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[0.82rem] text-white/65"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Colonne 3 — disponibilités réelles */}
        <Disponibilites />
      </div>
    </div>
  );
}

export default function PortalLanding({ v }: { v: Vertical }) {
  // La grille des métiers n'existe que sur la surface générale ; l'entrée
  // de navigation la suit, pour ne jamais proposer une ancre morte.
  const showMetiers = v.slug === "offshore";
  const nav = showMetiers ? [NAV[0], { label: "Métiers", href: "#metiers" }, ...NAV.slice(1)] : NAV;

  return (
    <div data-surface="portal" className="relative min-h-screen overflow-hidden">
      {/* ── Navigation ── */}
      <header className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo.white} alt="BNJ Team Maker" style={{ height: "1.9rem", width: "auto" }} />
        </Link>

        <nav className="p-navpill hidden items-center gap-0.5 rounded-full p-1.5 lg:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="p-navlink rounded-full px-4 py-2 text-[0.9rem]">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton className="px-4 py-2.5 text-[0.88rem]" />
        </div>
      </header>

      {/* ── Accroche + simulateur, côte à côte ──
          Deux colonnes à partir de xl seulement : en dessous, la colonne
          gauche devient trop étroite pour un titre de cette taille. */}
      <div className="relative z-10 mx-auto grid max-w-[1300px] items-center gap-10 px-5 pt-12 text-center md:pt-16 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-14 xl:text-left">
        {/* Le hero est déjà à l'écran au chargement : il s'anime à
            l'ouverture, pas au défilement. Les retards échelonnent
            badge → titre → sous-titre → bouton, 80 ms d'écart. */}
        <div className="min-w-0">
          <RevealOnLoad>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.11] bg-white/[0.05] px-4 py-2 text-[0.86rem] text-white/85">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-shrink-0" fill="none" aria-hidden>
              <path
                d="M8 1.5 9.3 5.9 13.7 7.2 9.3 8.5 8 12.9 6.7 8.5 2.3 7.2 6.7 5.9Z"
                fill="#c069ee"
              />
              <path
                d="M12.8 11.4 13.4 13.2 15.2 13.8 13.4 14.4 12.8 16.2 12.2 14.4 10.4 13.8 12.2 13.2Z"
                fill="#c069ee"
                opacity="0.65"
              />
            </svg>
            {v.hero.badge}
          </span>
          </RevealOnLoad>

          {/* Pas de nowrap : en deux colonnes le titre a moins de largeur et
              doit pouvoir passer sur deux lignes. */}
          <RevealOnLoad delay={0.08}>
            <h1 className="mt-7 text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-[3.4rem] md:text-[4.2rem] xl:text-[3.9rem]">
              {v.hero.line1}
              <br />
              {v.hero.line2}
            </h1>
          </RevealOnLoad>

          <RevealOnLoad delay={0.16}>
            <p className="mx-auto mt-5 max-w-[46ch] text-[1rem] text-white/55 md:text-[1.12rem] xl:mx-0">
              {v.hero.sub}
            </p>
          </RevealOnLoad>

          <RevealOnLoad delay={0.24} className="mt-8 flex justify-center xl:justify-start">
            <BookingButton glow className="px-6 py-3.5 text-[0.9rem]" />
          </RevealOnLoad>
        </div>

        {/* Simulateur — à droite du titre à partir de xl. Il entre en
            dernier : c'est l'argument, il doit arriver une fois
            l'accroche lue. */}
        <RevealOnLoad delay={0.3} className="mt-2 xl:mt-0">
          <CostSimulator postes={v.sim.postes} />
        </RevealOnLoad>
      </div>

      {/* ── Portail + panneau ──
          Le portail est pleine largeur : enfermé dans le padding, il se lisait
          comme un rectangle violet à bords francs au format téléphone. Seul le
          panneau garde sa gouttière. */}
      <div id="profils" className="relative z-10 mt-2 md:mt-6">
        <Portal techs={v.techs} />
        {/* Le panneau monte depuis le bord bas du portail, en dernier :
            c'est lui qui « allume » la scène. */}
        <RevealOnLoad delay={0.38} className="px-4">
          <ProfilePanel profiles={v.profiles} />
        </RevealOnLoad>
      </div>

      {showMetiers && <RolesGrid />}
      <PainGrid pains={v.pains} />
      <ProcessSpire process={v.process} />
      <CompareTable compare={v.compare} />
      <LoveWall love={v.love} />
      <Faq items={v.faq} />
      <BookingArc booking={v.booking} />
      <PortalFooter current={v.slug} />
    </div>
  );
}
