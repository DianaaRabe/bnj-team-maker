"use client";

import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL, CAL_LINK } from "@/lib/cal";

/* ─────────────────────────────────────────────────────────────────────
   Accès partagé aux créneaux Cal.com.

   Deux surfaces de la page réservent : le panneau de profils du hero
   (colonne « Disponibilités ») et le panneau de réservation du bas. Les
   deux affichent donc les MÊMES jours — d'où ce module commun plutôt
   qu'un fetch dupliqué qui pourrait diverger.

   La requête n'est émise qu'une fois par chargement : `cache` retient la
   promesse. Un échec vide le cache, pour qu'un remontage puisse réessayer.
   ───────────────────────────────────────────────────────────────────── */

export type Jour = { date: string; slots: string[] };
export type Etat = "chargement" | "ok" | "erreur";

/** Toutes les heures sont affichées en heure de Paris, quel que soit le fuseau
 *  du visiteur : c'est le fuseau de l'agenda et celui annoncé à l'appel. */
export const TZ = CAL.defaultTimeZone;

let cache: Promise<Jour[]> | null = null;

function charger(): Promise<Jour[]> {
  cache ??= fetch(`/api/cal/slots?timeZone=${encodeURIComponent(TZ)}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: { jours?: Jour[] }) => d.jours ?? [])
    .catch((e) => {
      cache = null;
      throw e;
    });
  return cache;
}

/**
 * Les jours réellement réservables.
 *
 * Le rendu serveur part toujours de l'état « chargement » : rien ici ne
 * dépend de la date du build, donc aucune divergence d'hydratation.
 */
export function useCalSlots() {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [jours, setJours] = useState<Jour[]>([]);

  useEffect(() => {
    let vivant = true;
    charger()
      .then((j) => {
        if (!vivant) return;
        setJours(j);
        setEtat("ok");
      })
      .catch(() => vivant && setEtat("erreur"));
    return () => {
      vivant = false;
    };
  }, []);

  return { etat, jours };
}

let uiPrete = false;

/** Thème de la modale. Idempotent : appelé par chaque point d'entrée. */
async function preparerUi() {
  if (uiPrete) return;
  uiPrete = true;
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
}

/**
 * Ouvre la modale Cal.
 *
 * Sans argument : sur le calendrier de Cal, c'est le cas des appels à
 * l'action de la page, qui ne présument d'aucun jour. Avec `date` : sur ce
 * jour. Avec `slotIso` en plus : directement sur ce créneau — sans lui, Cal
 * rouvre sur le calendrier du jour et fait resélectionner l'heure qu'on
 * vient de choisir.
 *
 * Repli sur cal.com en nouvel onglet si l'embed ne se charge pas : la
 * réservation reste possible même quand le script est bloqué.
 */
export async function ouvrirCal(date?: string, slotIso?: string) {
  try {
    await preparerUi();
    const cal = await getCalApi();
    cal("modal", {
      calLink: CAL_LINK,
      config: {
        ...(date ? { month: date.slice(0, 7), date } : {}),
        ...(slotIso ? { slot: slotIso } : {}),
        "cal.tz": TZ,
      },
    });
  } catch {
    const params = new URLSearchParams({
      ...(date ? { date } : {}),
      ...(slotIso ? { slot: slotIso } : {}),
    });
    const q = params.toString();
    window.open(`https://cal.com/${CAL_LINK}${q ? `?${q}` : ""}`, "_blank", "noopener");
  }
}

const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « août 2026 » à partir d'une ancre `AAAA-MM`. */
export function libelleMois(ancre: string) {
  return `${MOIS_FR[Number(ancre.slice(5, 7)) - 1]} ${ancre.slice(0, 4)}`;
}

/** « mercredi 12 août » à partir d'une date `AAAA-MM-JJ`. */
export function libelleJour(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
}

/** Géométrie d'une grille mensuelle qui commence au lundi. */
export function grilleMois(ancre: string) {
  const an = Number(ancre.slice(0, 4));
  const mois = Number(ancre.slice(5, 7)) - 1;
  return {
    an,
    mois,
    nbJours: new Date(an, mois + 1, 0).getDate(),
    // getDay() donne 0 pour dimanche ; la grille commence au lundi.
    decalage: (new Date(an, mois, 1).getDay() + 6) % 7,
    /** `AAAA-MM-JJ` pour le énième jour du mois. */
    date: (n: number) => `${ancre}-${String(n).padStart(2, "0")}`,
  };
}
