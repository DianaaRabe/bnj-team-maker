import { NextResponse } from "next/server";
import { CAL } from "@/lib/cal";

/**
 * Créneaux réels Cal.com.
 *
 * Cette route existe pour une seule raison : `CAL_API_KEY` est une clé
 * serveur. Elle ne doit jamais partir dans le bundle client, donc le
 * navigateur interroge cette route, jamais l'API Cal directement.
 *
 * Cal.com lit l'agenda Google connecté au compte : les heures déjà occupées
 * ne remontent pas. Il n'y a donc rien à filtrer ici.
 */

/** Cache court : la clé est limitée à 120 requêtes/minute et la disponibilité
 *  ne bouge pas à la seconde. */
export const revalidate = 60;

type CalSlot = { start: string };
type CalResponse = { status?: string; data?: Record<string, CalSlot[]>; error?: unknown };

export async function GET(request: Request) {
  if (!CAL.apiKey) {
    return NextResponse.json(
      { error: "CAL_API_KEY absente du serveur." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const timeZone = searchParams.get("timeZone") || CAL.defaultTimeZone;

  // Fenêtre par défaut : à partir de demain, sur 90 jours. Assez large pour
  // que la navigation par mois du panneau tienne sur un seul appel — inutile
  // de refetcher à chaque changement de mois. Cal applique de son côté le
  // préavis minimum du type d'événement (2 h ici).
  const debut = new Date();
  debut.setDate(debut.getDate() + 1);
  const fin = new Date(debut);
  fin.setDate(fin.getDate() + 90);

  const jour = (d: Date) => d.toISOString().slice(0, 10);
  const start = searchParams.get("start") || jour(debut);
  const end = searchParams.get("end") || jour(fin);

  const url =
    `https://api.cal.com/v2/slots?eventTypeId=${CAL.eventTypeId}` +
    `&start=${start}&end=${end}&timeZone=${encodeURIComponent(timeZone)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CAL.apiKey}`,
        "cal-api-version": "2024-09-04",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // On ne relaie jamais le corps de l'erreur Cal : il peut contenir des
      // détails de compte qui n'ont rien à faire dans le navigateur.
      console.error("[cal/slots] réponse Cal", res.status);
      return NextResponse.json({ error: "Créneaux indisponibles." }, { status: 502 });
    }

    const json = (await res.json()) as CalResponse;
    const parJour = json.data ?? {};

    // On ne renvoie que ce dont l'interface a besoin : une date et des heures.
    const jours = Object.entries(parJour)
      .map(([date, slots]) => ({
        date,
        slots: (slots ?? []).map((s) => s.start),
      }))
      .filter((j) => j.slots.length > 0)
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({ timeZone, jours });
  } catch (e) {
    console.error("[cal/slots] échec", e);
    return NextResponse.json({ error: "Créneaux indisponibles." }, { status: 502 });
  }
}
