"use client";

import { ouvrirCal } from "./useCalSlots";

/* ─────────────────────────────────────────────────────────────────────
   Le bouton « Réserver un appel », partout sur la page.

   Il ouvre la MÊME modale Cal.com que le panneau de réservation du bas :
   un seul agenda, un seul parcours. Auparavant ces boutons partaient sur
   Calendly dans un nouvel onglet, alors que les créneaux affichés sur la
   page venaient déjà de Cal — deux systèmes de réservation pour un seul
   rendez-vous.

   Sans date, Cal ouvre sur son propre calendrier : c'est le comportement
   voulu ici, l'appel à l'action ne présume d'aucun jour.

   Le repli est géré par ouvrirCal : si l'embed ne se charge pas, un
   nouvel onglet cal.com prend le relais.
   ───────────────────────────────────────────────────────────────────── */

export default function BookingButton({
  children = "Réserver un appel",
  className = "",
  /** Enveloppe le bouton dans le halo néon animé (.p-formglow). */
  glow = false,
}: {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const bouton = (
    <button
      type="button"
      onClick={() => ouvrirCal()}
      className={`p-cta relative z-10 inline-flex items-center gap-2 rounded-lg font-medium ${className}`}
    >
      {children}
    </button>
  );

  if (!glow) return bouton;

  return (
    <div className="p-formglow relative inline-block rounded-lg">{bouton}</div>
  );
}
