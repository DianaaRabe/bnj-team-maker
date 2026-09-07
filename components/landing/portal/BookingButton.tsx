"use client";

import { useBooking } from "./BookingContext";

/* ─────────────────────────────────────────────────────────────────────
   Le bouton « Réserver un appel », partout sur la page.

   Il déclenche le formulaire de qualification (type Yield Studio)
   pour exclure les mauvaises cibles avant d'ouvrir Cal.com.
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
  const { requestBooking } = useBooking();

  const bouton = (
    <button
      type="button"
      onClick={() => requestBooking()}
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
