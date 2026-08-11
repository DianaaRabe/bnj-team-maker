/**
 * Types partagés.
 *
 * Le modèle de contenu d'une landing vit désormais dans
 * lib/data/verticals.ts (`Vertical`) : l'ancien `LandingPageData`
 * décrivait des sections qui n'existent plus et a été retiré plutôt que
 * gardé en doublon.
 */

/** Familles de profils du vivier — voir lib/data/profiles.ts. */
export type PageVariant = "dev" | "sdr" | "rh";

export interface FAQItem {
  question: string;
  answer: string;
}
