"use client";

import { useMemo, useState } from "react";
import { CAL, CAL_LINK } from "@/lib/cal";
import {
  grilleMois,
  libelleJour,
  libelleMois,
  TZ,
  useCalSlots,
} from "./useCalSlots";
import { useBooking } from "./BookingContext";

/* ─────────────────────────────────────────────────────────────────────
   Panneau de réservation, branché sur les vrais créneaux Cal.com.

   Les créneaux viennent de /api/cal/slots, qui interroge Cal côté serveur :
   la clé API ne descend jamais dans le navigateur. Cal lit lui-même
   l'agenda Google connecté, donc les heures occupées ne remontent pas —
   il n'y a rien à filtrer ici.

   Le chargement est mutualisé avec la colonne « Disponibilités » du hero
   (useCalSlots) : les deux calendriers de la page montrent forcément les
   mêmes jours, et l'agenda n'est interrogé qu'une fois.

   Un clic sur un créneau ouvre la modale Cal positionnée sur ce jour ;
   c'est Cal qui encaisse la réservation, envoie les confirmations et écrit
   dans l'agenda. On ne réimplémente ni les fuseaux, ni les collisions, ni
   les mails.
   ───────────────────────────────────────────────────────────────────── */

const JOURS_COURTS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

export default function BookingPanel() {
  const { requestBooking } = useBooking();
  const { etat, jours } = useCalSlots();
  /** `null` tant que le visiteur n'a pas choisi de jour lui-même. */
  const [choix, setChoix] = useState<string | null>(null);
  /** Index dans `moisListe` du mois affiché par le calendrier. */
  const [moisIndex, setMoisIndex] = useState(0);

  // Le jour affiché est DÉRIVÉ, pas synchronisé dans un effet : à
  // l'arrivée des créneaux, le premier jour disponible s'ouvre de
  // lui-même, sans rendu en cascade.
  const selection = choix ?? jours[0]?.date ?? null;

  const dispo = useMemo(() => new Map(jours.map((j) => [j.date, j.slots])), [jours]);

  /**
   * Mois navigables : la suite CONTINUE du premier au dernier mois couvert par
   * les créneaux. Un simple Set des mois présents sauterait un mois entièrement
   * complet, et la navigation ferait un bond incompréhensible.
   */
  const moisListe = useMemo(() => {
    if (jours.length === 0) return [] as string[];
    const premier = jours[0].date.slice(0, 7);
    const dernier = jours[jours.length - 1].date.slice(0, 7);
    const out: string[] = [];
    let an = Number(premier.slice(0, 4));
    let mois = Number(premier.slice(5, 7)) - 1;
    const anFin = Number(dernier.slice(0, 4));
    const moisFin = Number(dernier.slice(5, 7)) - 1;
    while (an < anFin || (an === anFin && mois <= moisFin)) {
      out.push(`${an}-${String(mois + 1).padStart(2, "0")}`);
      mois += 1;
      if (mois > 11) {
        mois = 0;
        an += 1;
      }
    }
    return out;
  }, [jours]);

  // Repli sur le mois courant tant que les créneaux ne sont pas arrivés.
  const ancre = moisListe[moisIndex] ?? new Date().toISOString().slice(0, 7);
  const grille = grilleMois(ancre);

  const heure = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TZ,
    }).format(new Date(iso));

  const slotsDuJour = selection ? dispo.get(selection) ?? [] : [];

  return (
    <div className="relative mx-auto mt-14 max-w-[1000px] px-4">
      {/* Le conteneur porte le néon, la carte le recouvre : voir .p-formglow. */}
      <div className="p-formglow relative rounded-[16px]">
      {/* z-10 : ::after du conteneur vient APRÈS les enfants dans l'ordre de
          l'arbre, la carte doit donc être remontée pour rester au-dessus. */}
      <div className="relative z-10 rounded-[16px] border border-white/[0.09] bg-[#100b20]">
        {/* 452px : la grille du calendrier tient sept cases de 48px plus la
            gouttière. En dessous, les jours se chevauchent. */}
        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] md:min-h-[500px] md:grid-cols-[minmax(0,1fr)_452px]">
          {/* ── Créneaux du jour sélectionné ── */}
          <div className="p-6">
            {etat === "chargement" && (
              <div className="space-y-3" aria-live="polite">
                <div className="h-4 w-48 animate-pulse rounded bg-white/[0.07]" />
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-full animate-pulse rounded-lg bg-white/[0.04]" />
                ))}
                <span className="sr-only">Chargement des créneaux…</span>
              </div>
            )}

            {etat === "erreur" && (
              <div>
                <p className="text-[0.92rem] font-semibold text-white">
                  Impossible de charger les créneaux
                </p>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-white/50">
                  L&apos;agenda ne répond pas pour le moment. Vous pouvez réserver directement sur
                  la page Cal.com.
                </p>
                <a
                  href={`https://cal.com/${CAL_LINK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-cta mt-5 inline-flex rounded-lg px-5 py-2.5 text-[0.86rem] font-medium"
                >
                  Ouvrir l&apos;agenda
                </a>
              </div>
            )}

            {etat === "ok" && jours.length === 0 && (
              <p className="text-[0.9rem] text-white/60">
                Aucun créneau ouvert sur les trois prochaines semaines.
              </p>
            )}

            {etat === "ok" && selection && (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[0.92rem] font-semibold capitalize text-white">
                    {libelleJour(selection)}
                  </p>
                  <p className="text-[0.72rem] text-white/35">
                    {slotsDuJour.length} créneau{slotsDuJour.length > 1 ? "x" : ""}
                  </p>
                </div>

                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {slotsDuJour.map((iso) => (
                    <li key={iso}>
                      <button
                        onClick={() => requestBooking(iso.slice(0, 10), iso)}
                        className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] py-2.5 text-[0.86rem] font-medium text-white/85 transition-colors hover:border-[#c069ee]/50 hover:bg-[#590293]/25 hover:text-white"
                      >
                        {heure(iso)}
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[0.72rem] text-white/30">
                  Heures affichées en heure de Paris. Appel de {CAL.dureeMinutes} minutes.
                </p>
              </>
            )}
          </div>

          {/* ── Calendrier ── */}
          <div className="border-l border-white/[0.07] p-7">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[1.25rem] font-semibold capitalize text-white">
                {libelleMois(ancre)}
              </p>

              {/* Navigation bornée aux mois réellement couverts par les
                  créneaux : au-delà, il n'y aurait rien à afficher. */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMoisIndex((i) => Math.max(0, i - 1))}
                  disabled={moisIndex === 0}
                  aria-label="Mois précédent"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.1] text-white/70 transition-colors hover:border-[#c069ee]/50 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg viewBox="0 0 9 14" className="h-3.5 w-2.5" fill="none" aria-hidden>
                    <path d="M7.5 1 1.5 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setMoisIndex((i) => Math.min(moisListe.length - 1, i + 1))}
                  disabled={moisIndex >= moisListe.length - 1}
                  aria-label="Mois suivant"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.1] text-white/70 transition-colors hover:border-[#c069ee]/50 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg viewBox="0 0 9 14" className="h-3.5 w-2.5" fill="none" aria-hidden>
                    <path d="M1.5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-y-2 text-center text-[0.88rem] text-white/35">
              {JOURS_COURTS.map((j) => (
                <span key={j}>{j}</span>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-7 gap-y-2 text-center text-[1.02rem]">
              {Array.from({ length: grille.decalage }, (_, i) => (
                <span key={`v${i}`} />
              ))}
              {Array.from({ length: grille.nbJours }, (_, i) => i + 1).map((n) => {
                const date = grille.date(n);
                const libre = dispo.has(date);
                const actif = date === selection;
                if (!libre) {
                  return (
                    <span key={n} className="mx-auto flex h-12 w-12 items-center justify-center text-white/20">
                      {n}
                    </span>
                  );
                }
                return (
                  <button
                    key={n}
                    onClick={() => setChoix(date)}
                    aria-pressed={actif}
                    aria-label={`${libelleJour(date)}, ${dispo.get(date)?.length} créneaux`}
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                      actif
                        ? "bg-[#590293] font-semibold text-white"
                        : "text-white/80 hover:bg-white/[0.08]"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 flex items-center gap-2 text-[0.85rem] text-white/35">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#c069ee]" />
              {jours.length} jour{jours.length > 1 ? "s" : ""} disponible
              {jours.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* ── Cartes flottantes ── */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {/* left-[30%] : la carte doit rester dans la colonne des créneaux —
              plus à droite elle recouvrirait le titre du mois. Et remontée à
              -34px pour dégager la ligne d'en-tête (date + nombre de créneaux). */}
          <div className="absolute -top-[34px] left-[30%] flex w-[232px] items-center gap-3 rounded-[10px] border border-white/[0.1] bg-[#17102c] px-3.5 py-3 shadow-[0_14px_34px_rgba(8,4,18,0.6)]">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#590293] text-[0.7rem] font-bold text-white">
              31
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.82rem] font-semibold text-white">
                Google Agenda
              </span>
              <span className="block truncate text-[0.72rem] text-white/40">Synchronisé</span>
            </span>
          </div>

          {/* Doit refléter le type d'événement réellement configuré dans Cal —
              la modale l'annonce en Google Meet. À corriger ici si le
              dashboard Cal repasse en Cal Video. */}
          <div className="absolute left-[6%] top-[336px] flex w-[218px] items-center gap-3 rounded-[10px] border border-white/[0.1] bg-[#17102c] px-3.5 py-3 shadow-[0_14px_34px_rgba(8,4,18,0.6)]">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#c069ee] text-[0.7rem] font-bold text-[#1a0530]">
              ▸
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.82rem] font-semibold text-white">
                Google Meet
              </span>
              <span className="block truncate text-[0.72rem] text-white/40">Lien envoyé auto.</span>
            </span>
          </div>
        </div>
      </div>
      </div>

      <p className="mt-4 text-center text-[0.7rem] text-white/25">
        Créneaux réels, synchronisés avec l&apos;agenda de Benjamin.
      </p>
    </div>
  );
}
