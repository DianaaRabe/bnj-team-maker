/**
 * Configuration Cal.com.
 *
 * `apiKey` est lue côté serveur uniquement — pas de préfixe NEXT_PUBLIC_,
 * donc Next ne l'inclut jamais dans le bundle client. Les autres valeurs
 * sont publiques par nature : elles figurent déjà dans l'URL de réservation.
 */
export const CAL = {
  /** Serveur uniquement. `undefined` côté client, c'est voulu. */
  apiKey: process.env.CAL_API_KEY,

  username: "benjaminparienty",
  /** « Rendez-vous de 30 min » — cohérent avec la promesse du site. */
  eventSlug: "30min",
  eventTypeId: 6587419,
  dureeMinutes: 30,

  /** Fuseau du compte Cal. Sert de repli quand le navigateur n'expose rien. */
  defaultTimeZone: "Europe/Paris",
} as const;

/** Lien public, au format attendu par l'embed. */
export const CAL_LINK = `${CAL.username}/${CAL.eventSlug}`;
