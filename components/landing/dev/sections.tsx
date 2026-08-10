"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LandingPageData } from "@/lib/types";
import type { TalentProfile } from "@/lib/data/profiles";
import { BRAND, GLOBAL_FAQ, GLOBAL_PROCESS_STEPS } from "@/lib/constants";
import {
  Stamp,
  Lift,
  PieceHead,
  FieldRow,
  GuaranteeStrip,
  PerfMargin,
  Arrow,
  PlusMinus,
  rotFor,
} from "./atoms";

const REF = "DEV-2026";

/* Hiérarchie d'action, tenue sur toute la page :
   OR   = réserver l'appel (Calendly) — l'unique conversion.
   ENCRE = consulter les fiches (modale) — la rampe d'accès.
   Aucune autre couleur ne porte d'action. */

/* ═══════════════════════════════════════════════════════════════════════
   EN-TÊTE — bandeau de dossier opaque. Pas de verre dépoli : un carton
   ne laisse pas lire le titre de la section à travers.
   ═══════════════════════════════════════════════════════════════════════ */

const TABS = [
  { label: "Constat", href: "#constat" },
  { label: "Vivier", href: "#vivier" },
  { label: "Fiches", href: "#fiches" },
  { label: "Procédure", href: "#procedure" },
  { label: "Questions", href: "#questions" },
];

export function DossierHeader({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--d-stock-3)] bg-[color:var(--d-stock)]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo.color} alt="BNJ Team Maker" style={{ height: "1.7rem", width: "auto" }} />
          <span aria-hidden className="hidden h-6 w-px bg-[color:var(--d-stock-3)] sm:block" />
          <span className="d-typed hidden text-[0.66rem] uppercase tracking-[0.11em] text-[color:var(--d-text-2)] sm:block">
            Dossier n° <span className="font-bold text-[color:var(--d-ink)]">{REF}</span>
          </span>
        </div>

        <nav aria-label="Sections du dossier" className="hidden items-end gap-1 lg:flex">
          {TABS.map((t) => (
            <a key={t.href} href={t.href} className="d-tab hover:!bg-[color:var(--d-stock-3)]">
              {t.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="d-action px-3.5 py-2 text-[0.66rem] md:px-5 md:py-2.5"
          >
            Réserver un appel
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Sommaire du dossier"
            className="d-typed border-[1.5px] border-[color:var(--d-ink-deep)] px-3 py-2 text-[0.66rem] font-bold uppercase lg:hidden"
          >
            {open ? "Fermer" : "Sommaire"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Sections du dossier"
          className="border-t border-[color:var(--d-stock-3)] bg-[color:var(--d-stock-2)] lg:hidden"
        >
          {TABS.map((t, i) => (
            <a
              key={t.href}
              href={t.href}
              onClick={() => setOpen(false)}
              className="d-typed flex items-baseline gap-3 border-b border-[color:var(--d-stock-3)] px-5 py-3.5 text-[0.78rem] uppercase tracking-[0.07em] text-[color:var(--d-text)] last:border-0"
            >
              <span className="text-[color:var(--d-ink)]">{String(i + 1).padStart(2, "0")}</span>
              {t.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpen();
            }}
            className="d-typed block w-full px-5 py-3.5 text-left text-[0.78rem] uppercase tracking-[0.07em] text-[color:var(--d-ink)]"
          >
            Consulter les fiches
          </button>
        </nav>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COUVERTURE — le premier écran est la couverture du dossier.
   L'ordre source place les fiches juste sous le titre : à 390px, un
   profil nommé avec son TJM doit tenir dans le premier écran.
   ═══════════════════════════════════════════════════════════════════════ */

export function Cover({
  data,
  profiles,
  onOpen,
}: {
  data: LandingPageData;
  profiles: TalentProfile[];
  onOpen: () => void;
}) {
  return (
    <section className="relative overflow-hidden border-b-[1.5px] border-[color:var(--d-ink)]">
      {/* Quadrillage de fond : la feuille de formulaire sous le dossier. */}
      <div aria-hidden className="d-hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_384px] lg:gap-x-14 lg:gap-y-9">
          {/* ── Titre ── */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Lift>
              <h1 className="d-struck text-[2.25rem] leading-[0.92] text-[color:var(--d-text)] sm:text-[3.4rem] md:text-[4.2rem] xl:text-[4.9rem]">
                {data.hero.headline}
              </h1>

              <div className="mt-5">
                <Stamp
                  index={2}
                  variant="solid"
                  className="!text-[1rem] !tracking-[0.04em] sm:!text-[1.3rem] md:!text-[1.55rem]"
                >
                  {data.hero.headlineAccent}
                </Stamp>
              </div>
            </Lift>
          </div>

          {/* ── Fiches : la preuve, avant tout argumentaire ── */}
          <Lift className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="flex items-baseline justify-between border-b-[1.5px] border-[color:var(--d-ink)] pb-2">
              <p className="d-typed text-[0.62rem] uppercase tracking-[0.11em] text-[color:var(--d-ink)]">
                Extrait du vivier
              </p>
              <p className="d-typed text-[0.62rem] uppercase tracking-[0.095em] text-[color:var(--d-text-2)]">
                3 / 8 000+
              </p>
            </div>

            <ul className="mt-4 space-y-3">
              {profiles.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={onOpen}
                    className="d-fiche flex w-full items-start gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-[color:var(--d-stock-2)]"
                  >
                    {/* Photo d'identité agrafée à la fiche — floutée : l'identité
                        n'est levée qu'après signature. */}
                    <span className="mt-0.5 h-[52px] w-[52px] flex-shrink-0 overflow-hidden border border-[color:var(--d-stock-3)] grayscale">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.photo}
                        alt=""
                        aria-hidden
                        className="h-full w-full object-cover"
                        style={{ filter: "blur(4px)", transform: "scale(1.25)" }}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="d-struck text-[0.98rem] tracking-[-0.025em] text-[color:var(--d-text)]">
                        {p.name}
                      </span>
                      <span className="d-typed text-[0.86rem] font-bold text-[color:var(--d-ink)]">
                        {p.tjm}
                      </span>
                    </div>
                    <p className="d-typed mt-1 text-[0.72rem] uppercase tracking-[0.055em] text-[color:var(--d-text-2)]">
                      {p.role}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span
                        className="d-typed border px-1.5 py-0.5 text-[0.58rem] uppercase tracking-[0.07em]"
                        style={
                          p.availability === "Disponible"
                            ? { borderColor: "var(--d-ink)", color: "var(--d-ink)" }
                            : { borderColor: "#7f6f99", color: "var(--d-text-2)" }
                        }
                      >
                        {p.availability}
                      </span>
                      <span className="d-typed text-[0.66rem] text-[color:var(--d-text-2)]">
                        {p.experience}
                      </span>
                    </div>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={onOpen}
              className="d-typed mt-3 flex w-full items-center justify-center gap-2 border-[1.5px] border-dashed border-[color:var(--d-ink)]/45 py-3 text-[0.68rem] font-bold uppercase tracking-[0.055em] text-[color:var(--d-ink)] transition-colors hover:bg-[color:var(--d-ink)] hover:text-[color:var(--d-stock)]"
            >
              Ouvrir les fiches complètes
              <Arrow />
            </button>
          </Lift>

          {/* ── Exposé et actions ── */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <Lift>
              <div className="max-w-xl border-l border-[color:var(--d-stock-3)] pl-4">
                <p className="d-typed text-[0.6rem] uppercase tracking-[0.11em] text-[color:var(--d-text-2)]">
                  Exposé
                </p>
                <p className="mt-2 text-[0.98rem] leading-[1.8] text-[color:var(--d-text-2)]">
                  {data.hero.subheadline}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BRAND.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-action inline-flex items-center justify-center gap-2 px-7 py-4 text-center text-[0.76rem]"
                >
                  Réserver un appel de 30 min
                  <Arrow />
                </a>
                <button
                  onClick={onOpen}
                  className="d-action d-action--ink inline-flex items-center justify-center px-7 py-4 text-[0.76rem]"
                >
                  {data.hero.ctaPrimary}
                </button>
              </div>

              <div className="mt-9">
                <GuaranteeStrip
                  items={[
                    "Talents 100% francophones",
                    "Premiers profils sous 48h",
                    "Remplacement offert sous 30 jours",
                  ]}
                />
              </div>
            </Lift>
          </div>
        </div>
      </div>

      {/* ── Bordereau : les chiffres en tableau réglé, pas en cartes ── */}
      <div className="border-t-[1.5px] border-[color:var(--d-ink)] bg-[color:var(--d-stock-2)]">
        <dl className="mx-auto grid max-w-[1180px] grid-cols-2 md:grid-cols-4">
          {data.stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "border-[color:var(--d-stock-3)] px-5 py-6 md:px-8 md:py-7",
                i % 2 === 0 ? "border-r" : "",
                i < 2 ? "border-b md:border-b-0" : "",
                i < 3 ? "md:border-r" : "md:border-r-0",
                i === 1 ? "border-r-0 md:border-r" : "",
              ].join(" ")}
            >
              <dd className="d-struck text-[1.8rem] leading-none text-[color:var(--d-ink)] md:text-[2.4rem]">
                {s.value}
              </dd>
              <dt className="mt-2.5 text-[0.78rem] font-semibold leading-snug text-[color:var(--d-text)]">
                {s.label}
              </dt>
              {s.sublabel && (
                <p className="d-typed mt-1 text-[0.64rem] uppercase tracking-[0.055em] text-[color:var(--d-text-2)]">
                  {s.sublabel}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 01 — LE CONSTAT. Un formulaire réglé. Les griefs ne sont pas
   numérotés : leur ordre ne porte aucune information.
   ═══════════════════════════════════════════════════════════════════════ */

export function Constat({ data }: { data: LandingPageData["painPoints"] }) {
  return (
    <section id="constat" className="scroll-mt-16 border-b border-[color:var(--d-stock-3)]">
      <div className="mx-auto flex max-w-[1180px] gap-6 px-5 py-16 md:px-8 md:py-24">
        <PerfMargin />
        <div className="min-w-0 flex-1">
          <PieceHead piece="01" label="Constat" title={data.title} accent={data.subtitle} />

          <ul className="mt-12 border-t-[1.5px] border-[color:var(--d-ink)]">
            {data.items.map((item) => (
              <li key={item.title} className="border-b border-[color:var(--d-stock-3)] py-6 md:py-7">
                <h3 className="d-struck text-[1.05rem] tracking-[-0.03em] text-[color:var(--d-text)] md:text-[1.25rem]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.9rem] leading-[1.8] text-[color:var(--d-text-2)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Annotation portée au bas du constat */}
          <Lift>
            <div className="mt-12 border-[1.5px] border-[color:var(--d-ink)] bg-[color:var(--d-stock-2)] px-6 py-8 md:px-10 md:py-10">
              <p className="max-w-3xl text-[1.02rem] font-medium leading-[1.75] text-[color:var(--d-text)] md:text-[1.15rem]">
                {data.transition}
              </p>
              <div className="mt-6">
                <Stamp index={2} variant="solid">
                  C&apos;est exactement ce que fait BNJ
                </Stamp>
              </div>
            </div>
          </Lift>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 02 — LE VIVIER. Un inventaire dense.
   ═══════════════════════════════════════════════════════════════════════ */

export function Vivier({
  data,
  onOpen,
}: {
  data: LandingPageData["profileSection"];
  onOpen: () => void;
}) {
  const categories = Array.from(new Set(data.skills.map((s) => s.category).filter(Boolean))) as string[];

  return (
    <section
      id="vivier"
      className="scroll-mt-16 border-b border-[color:var(--d-stock-3)] bg-[color:var(--d-stock-2)]"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <PieceHead
              piece="02"
              label="Inventaire"
              title={data.title}
              accent={data.subtitle}
              lead={data.description}
              size="compact"
            />
            <div className="mt-8">
              <button onClick={onOpen} className="d-action d-action--ink px-6 py-3.5 text-[0.72rem]">
                Voir les profils disponibles
              </button>
            </div>
          </div>

          <div className="d-grid-paper min-w-0 self-start border-[1.5px] border-[color:var(--d-ink)] bg-[color:var(--d-stock)]">
            {categories.map((cat, ci) => (
              <div key={cat} className={ci > 0 ? "border-t border-[color:var(--d-stock-3)]" : ""}>
                <div className="grid gap-2 px-5 py-4 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-5 sm:px-6">
                  <p className="d-typed pt-0.5 text-[0.62rem] uppercase tracking-[0.095em] text-[color:var(--d-ink)]">
                    {cat}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {data.skills
                      .filter((s) => s.category === cat)
                      .map((s) => (
                        <li key={s.name} className="d-typed text-[0.78rem] text-[color:var(--d-text)]">
                          {s.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
            <p className="d-typed border-t-[1.5px] border-[color:var(--d-ink)] px-5 py-3 text-[0.62rem] uppercase tracking-[0.055em] text-[color:var(--d-text-2)] sm:px-6">
              Chaque profil est validé sur les technologies qu&apos;il revendique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 03 — LES FICHES.
   ═══════════════════════════════════════════════════════════════════════ */

export function Fiches({ profiles, onOpen }: { profiles: TalentProfile[]; onOpen: () => void }) {
  return (
    <section id="fiches" className="scroll-mt-16 border-b border-[color:var(--d-stock-3)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <PieceHead
          piece="03"
          label="Fiches talents"
          title="Trois profils,"
          accent="déjà instruits."
          lead="Photos volontairement floutées : l'identité du candidat n'est levée qu'après signature. Tout le reste est exact — séniorité, diplôme, TJM, disponibilité."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {profiles.map((p, i) => (
            <article key={p.id} className="d-fiche flex h-full flex-col">
              <div className="flex items-start gap-3 border-b-[1.5px] border-[color:var(--d-ink)] p-5">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden border border-[color:var(--d-stock-3)] grayscale">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover"
                    style={{ filter: "blur(5px)", transform: "scale(1.2)" }}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="d-struck text-[1.05rem] tracking-[-0.03em] text-[color:var(--d-text)]">
                    {p.name}
                  </h3>
                  <p className="d-typed mt-1 text-[0.68rem] uppercase tracking-[0.055em] text-[color:var(--d-text-2)]">
                    {p.role}
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-5">
                <FieldRow label="Réf." value={p.id.toUpperCase()} />
                <FieldRow label="Expérience" value={p.experience} />
                <FieldRow label="Diplôme" value={p.diploma} />
                <FieldRow label="TJM" value={p.tjm} strong />
              </div>

              <div className="border-t border-[color:var(--d-stock-3)] px-5 py-4">
                <p className="d-typed text-[0.58rem] uppercase tracking-[0.095em] text-[color:var(--d-text-2)]">
                  Points forts
                </p>
                <ul className="mt-2.5 space-y-2">
                  {p.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="flex gap-2.5 text-[0.8rem] leading-6 text-[color:var(--d-text-2)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[10px] h-px w-2 flex-shrink-0 bg-[color:var(--d-ink)]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t border-[color:var(--d-stock-3)] px-5 py-4">
                <p className="d-typed text-[0.58rem] uppercase tracking-[0.095em] text-[color:var(--d-text-2)]">
                  Compétences
                </p>
                <p className="d-typed mt-2 text-[0.76rem] leading-[1.7] text-[color:var(--d-text)]">
                  {p.skills.join(" · ")}
                </p>
              </div>

              <div className="flex items-center justify-between border-t-[1.5px] border-[color:var(--d-ink)] px-5 py-3.5">
                <Stamp index={i}>{p.availability}</Stamp>
                <button
                  onClick={onOpen}
                  className="d-typed text-[0.68rem] font-bold uppercase tracking-[0.07em] text-[color:var(--d-ink)] underline underline-offset-4"
                >
                  Détail
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 04 — LA PROCÉDURE. Ici la numérotation porte l'ordre réel.
   ═══════════════════════════════════════════════════════════════════════ */

export function Procedure() {
  return (
    <section
      id="procedure"
      className="scroll-mt-16 border-b border-[color:var(--d-stock-3)] bg-[color:var(--d-stock-2)]"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <PieceHead
          piece="04"
          label="Circuit de traitement"
          title="Du brief au développeur"
          accent="opérationnel : 7 jours."
        />

        <ol className="mt-12 max-w-3xl border-t-[1.5px] border-[color:var(--d-ink)]">
          {GLOBAL_PROCESS_STEPS.map((s, i) => (
            <li key={s.step} className="border-b border-[color:var(--d-stock-3)]">
              <div className="grid gap-2 py-6 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-8">
                <div
                  className="d-typed flex h-[42px] w-[42px] items-center justify-center border-[1.5px] border-[color:var(--d-ink)] text-[0.86rem] font-bold text-[color:var(--d-ink)]"
                  style={{ rotate: rotFor(i + 3) }}
                >
                  {s.step}
                </div>
                <div>
                  <h3 className="d-struck text-[1rem] tracking-[-0.03em] text-[color:var(--d-text)]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] leading-[1.75] text-[color:var(--d-text-2)]">
                    {s.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="d-typed mt-8 text-[0.76rem] uppercase tracking-[0.07em] text-[color:var(--d-text-2)]">
          Prêt à ouvrir un dossier ?{" "}
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[color:var(--d-ink)] underline underline-offset-4"
          >
            Réserver l&apos;appel de 30 min
          </a>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 05 — LE REGISTRE.
   ═══════════════════════════════════════════════════════════════════════ */

const REGISTRE = [
  {
    title: "Sourcing Afrique francophone",
    description:
      "Nous identifions les meilleurs talents francophones d'Afrique — des profils motivés, rigoureux, qui veulent prouver leur valeur.",
  },
  {
    title: "Profils testés & validés",
    description:
      "Tests techniques, entretiens comportementaux, vérification des références. Vous ne rencontrez que les meilleurs.",
  },
  {
    title: "Recrutement en 7 jours",
    description:
      "Notre ATS de 8 000+ candidats pré-qualifiés nous permet de vous proposer des profils en 48h. Candidat retenu en moins d'une semaine.",
  },
  {
    title: "100% francophones",
    description:
      "Tous nos talents communiquent couramment en français. Pas de barrière de langue, pas de friction.",
  },
  {
    title: "Coût maîtrisé",
    description:
      "Jusqu'à 60% d'économies sur vos coûts RH. Des talents qui performent dès le premier mois.",
  },
  {
    title: "Accompagnement humain",
    description:
      "Un interlocuteur dédié. Un suivi rigoureux. Pas un prestataire qui disparaît après la signature.",
  },
];

export function Registre({ data }: { data: LandingPageData["whyBNJ"] }) {
  return (
    <section className="border-b border-[color:var(--d-stock-3)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <PieceHead piece="05" label="Registre" title={data.title} accent={data.subtitle} />

        <div className="mt-12 grid border-t-[1.5px] border-[color:var(--d-ink)] md:grid-cols-2">
          {REGISTRE.map((item, i) => (
            <div
              key={item.title}
              className={`border-b border-[color:var(--d-stock-3)] py-6 md:py-7 ${
                i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <h3 className="d-struck text-[0.98rem] tracking-[-0.03em] text-[color:var(--d-text)]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[0.88rem] leading-[1.75] text-[color:var(--d-text-2)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NOTE — la seule région où l'encre couvre toute la page.
   ═══════════════════════════════════════════════════════════════════════ */

export function Note({ data }: { data: LandingPageData["aPlayers"] }) {
  const metrics = data.metrics ?? [];

  return (
    <section className="bg-[color:var(--d-ink)] text-[color:var(--d-stock)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="d-typed flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-white/25 pb-3 text-[0.62rem] uppercase tracking-[0.11em] text-white/70">
          <span>Note interne</span>
          <span>Réf. {REF}/NOTE</span>
          <span className="ml-auto">Diffusion : client</span>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div>
            <h2 className="d-struck text-[2rem] leading-[0.95] sm:text-[2.7rem] md:text-[3.2rem]">
              {data.title}
              <br />
              <span className="text-[color:var(--d-gold)]">{data.headlineAccent}</span>
            </h2>

            <p className="mt-7 max-w-2xl text-[1rem] leading-[1.85] text-white/85">{data.body}</p>

            {/* Pièce jointe : séparée par un filet plein et un intitulé
                dactylographié, pas par un liseré d'un pixel qui disparaît
                sur l'aplat d'encre. */}
            <div className="mt-8 max-w-2xl border-t border-white/25 pt-5">
              <p className="d-typed text-[0.58rem] uppercase tracking-[0.055em] text-[color:var(--d-gold)]">
                Pièce jointe — références
              </p>
              <p className="mt-2.5 text-[0.9rem] leading-[1.8] text-white/70">{data.proof}</p>
            </div>

            <div className="mt-9">
              <a
                href={BRAND.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="d-action inline-flex items-center gap-2 px-7 py-4 text-[0.76rem]"
              >
                Réserver un appel de 30 min
                <Arrow />
              </a>
            </div>
          </div>

          {metrics.length > 0 && (
            <dl className="self-start border border-white/25">
              {metrics.map((m, i) => (
                <div key={m.label} className={`px-5 py-4 ${i > 0 ? "border-t border-white/25" : ""}`}>
                  <dd className="d-struck text-[1.5rem] leading-none text-[color:var(--d-gold)]">
                    {m.value}
                  </dd>
                  <dt className="d-typed mt-1.5 text-[0.64rem] uppercase tracking-[0.07em] text-white/70">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PIÈCE 06 — QUESTIONS.
   ═══════════════════════════════════════════════════════════════════════ */

export function Questions() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="questions" className="scroll-mt-16 border-b border-[color:var(--d-stock-3)]">
      <div className="mx-auto max-w-[900px] px-5 py-16 md:px-8 md:py-24">
        <PieceHead piece="06" label="Questions" title="Tout ce que vous" accent="voulez savoir." />

        <div className="mt-11 border-t-[1.5px] border-[color:var(--d-ink)]">
          {GLOBAL_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[color:var(--d-stock-3)]">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`q-${i}`}
                    className="flex w-full items-baseline gap-4 py-5 text-left transition-colors hover:bg-[color:var(--d-stock-2)]"
                  >
                    <span className="flex-1 text-[0.95rem] font-semibold leading-snug text-[color:var(--d-text)]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center border-[1.5px] border-[color:var(--d-ink)] text-[color:var(--d-ink)]"
                    >
                      <PlusMinus open={isOpen} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[0.9rem] leading-[1.8] text-[color:var(--d-text-2)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CLÔTURE — bloc signature, cachet encré, pied.
   ═══════════════════════════════════════════════════════════════════════ */

function Cachet() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="d-inked h-[132px] w-[132px] md:h-[156px] md:w-[156px]"
      style={{ rotate: "-6deg" }}
      role="img"
      aria-label={`Cachet : dossier ouvert, référence ${REF}`}
    >
      <defs>
        <path id="cachet-arc" d="M 80,80 m -60,0 a 60,60 0 1,1 120,0" fill="none" />
      </defs>
      <circle cx="80" cy="80" r="74" fill="none" stroke="var(--d-ink)" strokeWidth="2.5" />
      <circle cx="80" cy="80" r="67" fill="none" stroke="var(--d-ink)" strokeWidth="1" />
      <text
        className="d-typed"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.7"
        fill="var(--d-ink)"
      >
        <textPath href="#cachet-arc" startOffset="50%" textAnchor="middle">
          BNJ TEAM MAKER
        </textPath>
      </text>
      <text x="80" y="76" textAnchor="middle" className="d-struck" fontSize="21" fill="var(--d-ink)">
        Dossier
      </text>
      <text x="80" y="97" textAnchor="middle" className="d-struck" fontSize="21" fill="var(--d-ink)">
        ouvert
      </text>
      <path d="M 46,108 H 114" stroke="var(--d-ink)" strokeWidth="1" />
      <text
        x="80"
        y="122"
        textAnchor="middle"
        className="d-typed"
        fontSize="8.5"
        letterSpacing="1"
        fill="var(--d-ink)"
      >
        RÉF. {REF}
      </text>
    </svg>
  );
}

export function Cloture({
  data,
  onOpen,
}: {
  data: LandingPageData["finalCTA"];
  onOpen: () => void;
}) {
  return (
    <footer className="d-grid-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="border-[1.5px] border-[color:var(--d-ink)] bg-[color:var(--d-stock)]">
          <div className="d-typed flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-[color:var(--d-stock-3)] px-6 py-3 text-[0.62rem] uppercase tracking-[0.11em] text-[color:var(--d-text-2)] md:px-10">
            <span>Clôture du dossier</span>
            <span className="ml-auto text-[color:var(--d-ink)]">Réf. {REF}</span>
          </div>

          <div className="grid gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16 md:px-10 md:py-16">
            <div>
              <h2 className="d-struck text-[2rem] leading-[0.95] text-[color:var(--d-text)] sm:text-[2.7rem] md:text-[3.4rem]">
                {data.title}
                <br />
                <span className="text-[color:var(--d-ink)]">{data.titleAccent}</span>
              </h2>

              <p className="mt-6 max-w-lg text-[0.98rem] leading-[1.8] text-[color:var(--d-text-2)]">
                {data.subtitle}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BRAND.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-action inline-flex items-center justify-center gap-2 px-8 py-4 text-center text-[0.78rem]"
                >
                  {data.ctaPrimary}
                  <Arrow />
                </a>
                <button
                  onClick={onOpen}
                  className="d-action d-action--ink inline-flex items-center justify-center px-8 py-4 text-[0.78rem]"
                >
                  {data.ctaSecondary}
                </button>
              </div>

              <div className="mt-9">
                <GuaranteeStrip
                  items={[
                    "Appel gratuit, sans engagement",
                    "Premiers profils sous 48h",
                    "Garantie remplacement 30 jours",
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <Cachet />
            </div>
          </div>

          <div className="d-typed flex flex-col gap-2 border-t border-[color:var(--d-stock-3)] px-6 py-5 text-[0.66rem] text-[color:var(--d-text-2)] sm:flex-row sm:items-center sm:justify-between md:px-10">
            <span>© {new Date().getFullYear()} BNJ Team Maker</span>
            <a
              href={`mailto:${BRAND.email}`}
              className="underline underline-offset-4 hover:text-[color:var(--d-ink)]"
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
