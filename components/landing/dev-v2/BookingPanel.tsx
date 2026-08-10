"use client";

import { useEffect, useMemo, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL, CAL_LINK } from "@/lib/cal";

/* ─────────────────────────────────────────────────────────────────────
   Panneau de réservation, branché sur les vrais créneaux Cal.com.

   Les créneaux viennent de /api/cal/slots, qui interroge Cal côté serveur :
   la clé API ne descend jamais dans le navigateur. Cal lit lui-même
   l'agenda Google connecté, donc les heures occupées ne remontent pas —
   il n'y a rien à filtrer ici.

   Un clic sur un créneau ouvre la modale Cal positionnée sur ce jour ;
   c'est Cal qui encaisse la réservation, envoie les confirmations et écrit
   dans l'agenda. On ne réimplémente ni les fuseaux, ni les collisions, ni
   les mails.
   ───────────────────────────────────────────────────────────────────── */

type Jour = { date: string; slots: string[] };
type Etat = "chargement" | "ok" | "erreur";

const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const JOURS_COURTS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

/** Toutes les heures sont affichées en heure de Paris, quel que soit le fuseau
 *  du visiteur : c'est le fuseau de l'agenda et celui annoncé à l'appel. */
const TZ = CAL.defaultTimeZone;

export default function BookingPanel() {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [jours, setJours] = useState<Jour[]>([]);
  const [selection, setSelection] = useState<string | null>(null);
  /** Index dans `moisListe` du mois affiché par le calendrier. */
  const [moisIndex, setMoisIndex] = useState(0);

  // Initialisation de la modale Cal.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#590293" },
          light: { "cal-brand": "#590293" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })().catch(() => {
      /* L'échec de l'embed ne doit pas casser la page : le lien direct reste. */
    });
  }, []);

  // Récupération des créneaux réels, en heure de Paris.
  useEffect(() => {
    let vivant = true;
    fetch(`/api/cal/slots?timeZone=${encodeURIComponent(TZ)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { jours: Jour[] }) => {
        if (!vivant) return;
        setJours(d.jours ?? []);
        setSelection(d.jours?.[0]?.date ?? null);
        // Le premier jour disponible ouvre toujours le calendrier.
        setMoisIndex(0);
        setEtat("ok");
      })
      .catch(() => vivant && setEtat("erreur"));
    return () => {
      vivant = false;
    };
  }, []);

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
  const [an, mois] = [Number(ancre.slice(0, 4)), Number(ancre.slice(5, 7)) - 1];
  const nbJours = new Date(an, mois + 1, 0).getDate();
  // getDay() donne 0 pour dimanche ; la grille commence au lundi.
  const decalage = (new Date(an, mois, 1).getDay() + 6) % 7;

  const heure = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TZ,
    }).format(new Date(iso));

  const libelleJour = (date: string) => {
    const d = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(d);
  };

  const slotsDuJour = selection ? dispo.get(selection) ?? [] : [];

  /** Ouvre la modale Cal directement sur le créneau choisi : `slot` porte
   *  l'heure précise, sans quoi Cal rouvre sur le calendrier du jour et
   *  fait resélectionner l'heure qu'on vient de choisir. */
  const ouvrir = async (slotIso: string) => {
    const date = slotIso.slice(0, 10);
    try {
      const cal = await getCalApi();
      cal("modal", {
        calLink: CAL_LINK,
        config: { month: date.slice(0, 7), date, slot: slotIso, "cal.tz": TZ },
      });
    } catch {
      window.open(
        `https://cal.com/${CAL_LINK}?date=${date}&slot=${encodeURIComponent(slotIso)}`,
        "_blank",
        "noopener"
      );
    }
  };

  return (
    <div className="relative mx-auto mt-14 max-w-[1000px] px-4">
      {/* Le conteneur porte le néon, la carte le recouvre : voir .p-formglow. */}
      <div className="p-formglow relative rounded-[16px]">
      {/* z-10 : ::after du conteneur vient APRÈS les enfants dans l'ordre de
          l'arbre, la carte doit donc être remontée pour rester au-dessus. */}
      <div className="relative z-10 rounded-[16px] border border-white/[0.09] bg-[#100b20]">
        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] md:min-h-[430px] md:grid-cols-[minmax(0,1fr)_368px]">
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
                        onClick={() => ouvrir(iso)}
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
          <div className="border-l border-white/[0.07] p-6">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[1.05rem] font-semibold capitalize text-white">
                {MOIS_FR[mois]} {an}
              </p>

              {/* Navigation bornée aux mois réellement couverts par les
                  créneaux : au-delà, il n'y aurait rien à afficher. */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMoisIndex((i) => Math.max(0, i - 1))}
                  disabled={moisIndex === 0}
                  aria-label="Mois précédent"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.1] text-white/70 transition-colors hover:border-[#c069ee]/50 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg viewBox="0 0 9 14" className="h-3 w-2" fill="none" aria-hidden>
                    <path d="M7.5 1 1.5 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setMoisIndex((i) => Math.min(moisListe.length - 1, i + 1))}
                  disabled={moisIndex >= moisListe.length - 1}
                  aria-label="Mois suivant"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.1] text-white/70 transition-colors hover:border-[#c069ee]/50 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg viewBox="0 0 9 14" className="h-3 w-2" fill="none" aria-hidden>
                    <path d="M1.5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-y-2 text-center text-[0.78rem] text-white/35">
              {JOURS_COURTS.map((j) => (
                <span key={j}>{j}</span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-y-1.5 text-center text-[0.9rem]">
              {Array.from({ length: decalage }, (_, i) => (
                <span key={`v${i}`} />
              ))}
              {Array.from({ length: nbJours }, (_, i) => i + 1).map((n) => {
                const date = `${an}-${String(mois + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
                const libre = dispo.has(date);
                const actif = date === selection;
                if (!libre) {
                  return (
                    <span key={n} className="mx-auto flex h-10 w-10 items-center justify-center text-white/20">
                      {n}
                    </span>
                  );
                }
                return (
                  <button
                    key={n}
                    onClick={() => setSelection(date)}
                    aria-pressed={actif}
                    aria-label={`${libelleJour(date)}, ${dispo.get(date)?.length} créneaux`}
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
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

            <p className="mt-5 flex items-center gap-2 text-[0.78rem] text-white/35">
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

          {/* Le type d'événement Cal est configuré en Cal Video : afficher
              « Google Meet » serait faux. */}
          <div className="absolute left-[6%] top-[336px] flex w-[218px] items-center gap-3 rounded-[10px] border border-white/[0.1] bg-[#17102c] px-3.5 py-3 shadow-[0_14px_34px_rgba(8,4,18,0.6)]">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#c069ee] text-[0.7rem] font-bold text-[#1a0530]">
              ▸
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.82rem] font-semibold text-white">
                Cal Video
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
