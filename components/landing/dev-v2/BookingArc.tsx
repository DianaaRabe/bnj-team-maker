import BookingPanel from "./BookingPanel";

/* ─────────────────────────────────────────────────────────────────────
   Section de réservation — reproduction de la référence : arc de lumière,
   badge, titre sur deux lignes, sous-titre, puis un panneau applicatif
   avec agenda, calendrier et cartes flottantes.

   L'arc est un chemin elliptique tracé trois fois : un halo large et très
   flouté, un trait moyen, puis un filet fin quasi blanc. C'est cette
   superposition qui donne le néon — un seul trait, même épais, reste plat.

   Le panneau est branché sur Cal.com (voir BookingPanel) : les créneaux
   affichés sont réels et synchronisés avec l'agenda Google connecté.
   ───────────────────────────────────────────────────────────────────── */

const ARC = "M210 236 A 232 126 0 0 1 674 236";

/** Colonnes sombres derrière l'arc. */
const BARS: [number, number][] = [
  [286, 96], [318, 150], [350, 74], [382, 128], [414, 178],
  [470, 164], [502, 110], [534, 142], [566, 82], [598, 118],
];










function Arc() {
  return (
    <svg
      viewBox="0 0 884 300"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[300px] w-full"
    >
      <defs>
        <linearGradient id="ba-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#590293" stopOpacity="0.1" />
          <stop offset="18%" stopColor="#8b2fd8" />
          <stop offset="42%" stopColor="#e9c8ff" />
          <stop offset="58%" stopColor="#c069ee" />
          <stop offset="84%" stopColor="#7b3fe0" />
          <stop offset="100%" stopColor="#590293" stopOpacity="0.1" />
        </linearGradient>

        <radialGradient id="ba-dome" cx="50%" cy="100%" r="72%">
          <stop offset="0%" stopColor="#3a0a6b" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#22063f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0613" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="ba-bar" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#33146e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#170a36" stopOpacity="0" />
        </radialGradient>

        <filter id="ba-wide" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="ba-mid" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="ba-thin" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Colonnes sombres */}
      {BARS.map(([x, h], i) => (
        <rect key={i} x={x} y={236 - h} width="18" height={h} rx="3" fill="url(#ba-bar)" opacity={0.4 + (i % 3) * 0.2} />
      ))}

      {/* Dôme sombre sous l'arc */}
      <path d={`${ARC} L674 300 L210 300 Z`} fill="url(#ba-dome)" />

      {/* Trois passes : halo large, trait moyen, filet fin */}
      <path d={ARC} fill="none" stroke="url(#ba-arc)" strokeWidth="26" filter="url(#ba-wide)" opacity="0.75" />
      <path d={ARC} fill="none" stroke="url(#ba-arc)" strokeWidth="7" filter="url(#ba-mid)" opacity="0.9" />
      <path d={ARC} fill="none" stroke="url(#ba-arc)" strokeWidth="1.6" filter="url(#ba-thin)" />
    </svg>
  );
}

export default function BookingArc() {
  return (
    <section id="reserver" className="relative overflow-hidden bg-[#0a0613] pb-24 pt-0 md:pb-32">
      <Arc />

      <div className="relative mx-auto max-w-[760px] px-4 pt-[236px] text-center">
        <span className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.05] px-4 py-1.5 text-[0.82rem] text-white/85">
          Réserver un appel
        </span>

        <h2 className="mt-6 text-[2.2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.9rem]">
          Trente minutes pour
          <br />
          cadrer votre besoin
        </h2>

        <p className="mx-auto mt-5 max-w-[560px] text-[1rem] leading-[1.55] text-white/45">
          On analyse votre stack et votre contexte, puis on vous présente des profils sous 48 h.
          <br className="hidden sm:block" /> Sans engagement.
        </p>
      </div>

      <BookingPanel />

    </section>
  );
}
