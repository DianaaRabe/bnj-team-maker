import { GLOBAL_PROCESS_STEPS } from "@/lib/constants";
import type { Vertical } from "@/lib/data/verticals";
import BookingButton from "./BookingButton";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   Section process — reproduction de la référence : une flèche de lumière
   qui s'évase vers le bas, colonnes sombres derrière, poussière d'étoiles,
   puis badge, titre et sous-titre.

   Palette volontairement celle de la référence (bleu nuit / cyan / blanc),
   pas celle du portail : la demande est explicite là-dessus.

   La forme est un seul chemin SVG rempli d'un dégradé radial dont le foyer
   est en bas au centre — c'est ce décentrage qui crée le cœur incandescent
   à la base et la pointe froide au sommet. Le halo extérieur est le MÊME
   chemin, dupliqué en trait épais et flouté : deux formes distinctes ne se
   superposeraient jamais proprement.

   L'entonnoir porte les cinq étapes : la plus large en bas (le vivier),
   la plus étroite au sommet (le dev en poste).
   ───────────────────────────────────────────────────────────────────── */

/** Colonnes sombres en arrière-plan. Positions fixes, jamais aléatoires. */
const BARS: [number, number][] = [
  [326, 150], [352, 214], [378, 96], [404, 262], [430, 132],
  [530, 178], [556, 250], [582, 110], [608, 196], [634, 140],
];

const STARS: [number, number, number, number][] = [
  [8, 46, 1.5, 0.5], [13, 62, 1, 0.32], [18, 34, 1.2, 0.42], [23, 55, 1, 0.3],
  [28, 20, 1.4, 0.45], [30, 68, 1.1, 0.35], [72, 24, 1.3, 0.4], [76, 52, 1, 0.3],
  [80, 38, 1.5, 0.5], [85, 64, 1.1, 0.34], [90, 30, 1.2, 0.4], [94, 50, 1, 0.28],
  [15, 18, 1, 0.26], [88, 16, 1.1, 0.3], [66, 70, 1, 0.28], [35, 78, 1.2, 0.3],
];

/** Rayons descendants sous la base. */
const RAYS = [-26, -16, -8, 0, 8, 16, 26];

/**
 * Ancrage des cinq étapes le long du bord de la flèche : `y` en % de la
 * hauteur de la zone lumineuse, `dx` en px depuis l'axe central. L'écart
 * croît vers le bas parce que la flèche s'évase — c'est ce qui produit la
 * lecture en entonnoir. Signe négatif = à gauche de l'axe.
 *
 * Les deux extrémités sont sur l'axe : l'étape 1 au-dessus de la pointe
 * (l'entrée de l'entonnoir), l'étape 5 sous la base (la sortie). Les trois
 * étapes intermédiaires alternent gauche → droite le long des bords.
 *
 * Le `y` négatif de l'étape 1 la remonte au-dessus de la pointe : c'est à
 * ça que sert la réserve de 80px ajoutée au-dessus de la zone lumineuse.
 */
const ETAPES_POS = [
  { y: -6, dx: 0 },
  { y: 38, dx: -150 },
  { y: 54, dx: 205 },
  { y: 70, dx: -285 },
  { y: 87, dx: 0 },
];

export default function ProcessSpire({ process }: { process: Vertical["process"] }) {
  return (
    // 640px en desktop : 560 pour la zone lumineuse, plus 80 de réserve
    // au-dessus de la pointe où vient se poser l'étape 1. Le contenu qui
    // suit doit démarrer en dessous de l'ensemble.
    <section id="process" className="relative overflow-hidden bg-[#0a0613] lg:pt-[640px]">
      {/* ── Décor ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map(([l, t, s, o], i) => (
          <span
            key={i}
            style={{ left: `${l}%`, top: `${t}%`, height: s, width: s, opacity: o }}
            className="absolute rounded-full bg-white"
          />
        ))}

        <svg
          viewBox="0 0 960 560"
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-x-0 top-0 h-[560px] w-full lg:top-[80px]"
        >
          <defs>
            {/* Foyer en bas au centre : cœur blanc à la base, pointe froide. */}
            <radialGradient id="ps-fill" cx="50%" cy="86%" r="66%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="16%" stopColor="#f8edff" />
              <stop offset="34%" stopColor="#dfaaff" />
              <stop offset="54%" stopColor="#c069ee" />
              <stop offset="74%" stopColor="#8b2fd8" />
              <stop offset="90%" stopColor="#590293" />
              <stop offset="100%" stopColor="#3b0166" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="ps-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4dcff" />
              <stop offset="38%" stopColor="#ecc8ff" />
              <stop offset="100%" stopColor="#c069ee" stopOpacity="0.15" />
            </linearGradient>

            <radialGradient id="ps-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#efdcff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#c069ee" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ps-bar" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#33146e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#170a36" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="ps-fade" x1="0" y1="26" x2="0" y2="446" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="90%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <mask id="ps-mask">
              <rect x="0" y="0" width="960" height="560" fill="url(#ps-fade)" />
            </mask>

            <filter id="ps-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="ps-rimblur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
            <filter id="ps-coreblur" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="ps-rayblur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* Colonnes sombres, derrière la flèche */}
          <g>
            {BARS.map(([x, h], i) => (
              <rect
                key={i}
                x={x}
                y={430 - h}
                width="17"
                height={h}
                rx="3"
                fill="url(#ps-bar)"
                opacity={0.5 + (i % 3) * 0.16}
              />
            ))}
          </g>

          {/* Rayons descendants */}
          <g filter="url(#ps-rayblur)" opacity="0.5" className="ps-rays">
            {RAYS.map((d, i) => (
              <path
                key={i}
                d={`M480,360 L${470 + d * 5},560 L${492 + d * 5},560 Z`}
                fill="#e8ccff"
                opacity={0.16 - Math.abs(d) * 0.003}
              />
            ))}
          </g>

          <g mask="url(#ps-mask)">
          {/* Halo : le MÊME chemin en trait épais et flouté */}
          <path
            d="M480 26 C 476 150 464 274 250 430 L710 430 C 496 274 484 150 480 26 Z"
            fill="#7b1fd6"
            opacity="0.55"
            filter="url(#ps-soft)"
            className="ps-halo"
          />

          {/* Corps de la flèche */}
          <path
            d="M480 26 C 476 150 464 274 250 430 L710 430 C 496 274 484 150 480 26 Z"
            fill="url(#ps-fill)"
          />

          {/* Arête lumineuse */}
          <path
            d="M480 26 C 476 150 464 274 250 430"
            fill="none"
            stroke="url(#ps-rim)"
            strokeWidth="1.8"
            filter="url(#ps-rimblur)"
          />
          <path
            d="M480 26 C 484 150 496 274 710 430"
            fill="none"
            stroke="url(#ps-rim)"
            strokeWidth="1.8"
            filter="url(#ps-rimblur)"
          />

          {/* Reflets qui remontent les arêtes : la lumière aspirée vers la
              pointe. Purement décoratifs, invisibles au repos. */}
          <path
            d="M480 26 C 476 150 464 274 250 430"
            fill="none"
            stroke="#f6e2ff"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#ps-rimblur)"
            className="ps-sheen"
          />
          <path
            d="M480 26 C 484 150 496 274 710 430"
            fill="none"
            stroke="#f6e2ff"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#ps-rimblur)"
            className="ps-sheen ps-sheen--b"
          />
          </g>

          {/* Cœur incandescent à la base */}
          <ellipse cx="480" cy="404" rx="112" ry="40" fill="url(#ps-core)" filter="url(#ps-coreblur)" className="ps-core" />
        </svg>
      </div>

      {/* ── Les étapes, posées le long de l'évasement ──
          Elles suivent le bord de la flèche au lieu de la recouvrir : c'est
          leur écartement croissant qui dessine l'entonnoir, et la lumière
          reste visible entre elles. Empilées sous la flèche en dessous de lg,
          où il n'y a pas la largeur pour les écarter. */}
      <ol className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[560px] lg:top-[80px] lg:block">
        {ETAPES_POS.map(({ y, dx }, i) => {
          const s = GLOBAL_PROCESS_STEPS[i];
          return (
            <li
              key={s.step}
              style={{ top: `${y}%`, left: `calc(50% + ${dx}px)` }}
              className={`absolute w-[228px] -translate-y-1/2 ${
                dx < 0 ? "-translate-x-full text-right" : dx === 0 ? "-translate-x-1/2 text-center" : ""
              }`}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#c069ee]">
                Étape {s.step}
              </p>
              <p className="mt-1 text-[0.95rem] font-semibold leading-snug text-white">{s.title}</p>
            </li>
          );
        })}
      </ol>

      {/* Repli mobile : la même liste, empilée sous la flèche. */}
      <RevealGroup as="ul" className="relative z-10 mx-auto max-w-[520px] space-y-3 px-4 pt-[420px] lg:hidden">
        {GLOBAL_PROCESS_STEPS.map((s) => (
          <RevealItem
            as="li"
            key={s.step}
            className="rounded-[12px] border border-white/[0.12] bg-[#170a36]/70 px-5 py-3 backdrop-blur-[3px]"
          >
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#c069ee]">
              Étape {s.step}
            </p>
            <p className="mt-1 text-[0.95rem] font-semibold text-white">{s.title}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ── Badge, titre, sous-titre ── */}
      <Reveal className="relative mx-auto max-w-[720px] px-4 pb-24 pt-10 text-center md:pb-28">
        <span className="inline-flex items-center rounded-full border border-[#c069ee]/35 bg-[#2a1152]/70 px-4 py-1.5 text-[0.82rem] text-[#e6d4ff]">
          {process.badge}
        </span>
        <h2 className="mt-6 text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#f3eaff] sm:text-[2.9rem]">
          {process.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[1rem] leading-[1.55] text-[#a794c6]">
          {process.sub}
        </p>

        <div className="mt-8">
          <BookingButton glow className="px-6 py-3.5 text-[0.9rem]" />
        </div>
      </Reveal>
    </section>
  );
}
