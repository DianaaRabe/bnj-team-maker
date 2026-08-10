"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────
   Icônes technos flottant au-dessus du portail.

   Les marques sont dessinées en SVG inline : pas de CDN, rien à charger,
   et elles héritent de leur couleur via currentColor. Ce sont des marques
   de tiers — leurs couleurs sortent volontairement de la palette BNJ,
   c'est ce qui les rend reconnaissables.

   Positions de départ FIXES (aucun Math.random au rendu) : le serveur et le
   client doivent produire le même HTML. Le hasard est introduit par GSAP,
   côté client uniquement, une fois monté.
   ───────────────────────────────────────────────────────────────────── */

type Tech = {
  id: string;
  label: string;
  color: string;
  mark: ReactNode;
  /** Angle sur l'arc, en degrés : 180° = horizon gauche, 90° = zénith,
   *  0° = horizon droit. Le centre de l'arc est celui du dôme — le milieu
   *  du bord bas du portail — donc les icônes suivent le même rayon que
   *  les anneaux concentriques. */
  angle: number;
  /** Écart au rayon nominal, pour que l'arc respire au lieu d'être mécanique. */
  rf: number;
  /** Affichée au format téléphone. Dix icônes dans 386×260 px se marchent
   *  dessus, on n'en garde que six. */
  mobile?: boolean;
};

const TECHS: Tech[] = [
  {
    id: "react",
    label: "React",
    color: "#61DAFB",
    angle: 165,
    rf: 1,
    mobile: true,
    mark: (
      <>
        <g stroke="currentColor" strokeWidth="1.1" fill="none">
          <ellipse cx="12" cy="12" rx="10.5" ry="4" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
        </g>
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </>
    ),
  },
  {
    id: "node",
    label: "Node.js",
    color: "#7FC728",
    angle: 133,
    rf: 1.06,
    mobile: true,
    mark: (
      <>
        <path d="M12 1.6 21.5 7v10L12 22.4 2.5 17V7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="currentColor"
        >
          N
        </text>
      </>
    ),
  },
  {
    id: "ts",
    label: "TypeScript",
    color: "#3178C6",
    angle: 101,
    rf: 1.03,
    mobile: true,
    mark: (
      <>
        <rect width="24" height="24" rx="3" fill="currentColor" />
        <text x="12" y="17" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0a0613">
          TS
        </text>
      </>
    ),
  },
  {
    id: "python",
    label: "Python",
    color: "#FFD43B",
    angle: 79,
    rf: 0.93,
    mobile: true,
    mark: (
      <>
        <path
          d="M11.9 2c-2.4 0-4.3.9-4.3 2.6v2.2h4.4v.7H5.9C4.2 7.5 3 9 3 11.5s1.2 4 2.9 4h1.6v-2.6c0-1.8 1.5-3.3 3.3-3.3h3.9c1.5 0 2.7-1.2 2.7-2.7V4.6C17.4 3 15.6 2 13.2 2zM9.6 4.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
          fill="currentColor"
        />
        <path
          d="M12.1 22c2.4 0 4.3-.9 4.3-2.6v-2.2h-4.4v-.7h6.1c1.7 0 2.9-1.5 2.9-4s-1.2-4-2.9-4h-1.6v2.6c0 1.8-1.5 3.3-3.3 3.3H9.3c-1.5 0-2.7 1.2-2.7 2.7v2.3C6.6 21 8.4 22 10.8 22zm2.3-2.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
          fill="currentColor"
          opacity="0.55"
        />
      </>
    ),
  },
  {
    id: "graphql",
    label: "GraphQL",
    color: "#E535AB",
    angle: 149,
    rf: 0.94,
    mark: (
      <>
        <g stroke="currentColor" strokeWidth="1.1" fill="none">
          <path d="M12 2.6 20.1 7.3v9.4L12 21.4 3.9 16.7V7.3z" />
          <path d="M12 3.4 4.4 16.6h15.2z" />
        </g>
        <g fill="currentColor">
          <circle cx="12" cy="3" r="1.7" />
          <circle cx="20.4" cy="7.6" r="1.7" />
          <circle cx="20.4" cy="16.4" r="1.7" />
          <circle cx="12" cy="21" r="1.7" />
          <circle cx="3.6" cy="16.4" r="1.7" />
          <circle cx="3.6" cy="7.6" r="1.7" />
        </g>
      </>
    ),
  },
  {
    id: "php",
    label: "PHP",
    color: "#8892BF",
    angle: 117,
    rf: 0.96,
    mark: (
      <>
        <ellipse cx="12" cy="12" rx="11.5" ry="6.6" fill="currentColor" />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fontSize="7.6"
          fontWeight="700"
          fontStyle="italic"
          fill="#0a0613"
        >
          php
        </text>
      </>
    ),
  },
  {
    id: "redis",
    label: "Redis",
    color: "#FF4438",
    angle: 47,
    rf: 0.97,
    mobile: true,
    mark: (
      <g fill="currentColor">
        <ellipse cx="12" cy="5.6" rx="10" ry="3.3" />
        <path d="M2 9c0 1.8 4.5 3.3 10 3.3S22 10.8 22 9v2.9c0 1.8-4.5 3.3-10 3.3S2 13.7 2 11.9z" opacity="0.72" />
        <path d="M2 14.8c0 1.8 4.5 3.3 10 3.3s10-1.5 10-3.3v2.6c0 1.8-4.5 3.3-10 3.3s-10-1.5-10-3.3z" opacity="0.5" />
      </g>
    ),
  },
  {
    id: "docker",
    label: "Docker",
    color: "#2496ED",
    angle: 15,
    rf: 0.95,
    mobile: true,
    mark: (
      <g fill="currentColor">
        <rect x="3.2" y="10" width="3.1" height="3.1" rx="0.3" />
        <rect x="6.8" y="10" width="3.1" height="3.1" rx="0.3" />
        <rect x="10.4" y="10" width="3.1" height="3.1" rx="0.3" />
        <rect x="14" y="10" width="3.1" height="3.1" rx="0.3" />
        <rect x="6.8" y="6.5" width="3.1" height="3.1" rx="0.3" />
        <rect x="10.4" y="6.5" width="3.1" height="3.1" rx="0.3" />
        <rect x="10.4" y="3" width="3.1" height="3.1" rx="0.3" />
        <path d="M1.4 14.6h20.1c.2 3.4-2.6 6.2-6.8 6.2H8.3c-4.1 0-6.9-2.5-6.9-6.2z" />
      </g>
    ),
  },
  {
    id: "vue",
    label: "Vue.js",
    color: "#41B883",
    angle: 63,
    rf: 1.05,
    mark: (
      <>
        <path d="M2 3.4h4.3L12 13.2 17.7 3.4H22L12 20.6z" fill="currentColor" opacity="0.5" />
        <path d="M6.3 3.4h3.3L12 7.7l2.4-4.3h3.3L12 12.9z" fill="currentColor" />
      </>
    ),
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    color: "#38BDF8",
    angle: 31,
    rf: 1.02,
    mark: (
      <path
        d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C15.6 7.1 14.4 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C10.6 13.1 9.4 12 7 12z"
        fill="currentColor"
      />
    ),
  },
];

export default function FloatingTech() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    // gsap.context() scope les sélecteurs à ce conteneur et permet un
    // revert() propre au démontage — sans quoi les tweens survivent.
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".p-tech");
      const rnd = gsap.utils.random;

      // Aucune animation d'entrée : un gsap.from() poserait opacity:0 tout de
      // suite, et si requestAnimationFrame ne tourne pas — onglet ouvert en
      // arrière-plan, économie d'énergie, hydratation qui échoue — les icônes
      // resteraient invisibles. Ici l'état au repos est l'état rendu : le pire
      // cas, c'est une icône immobile, jamais une icône absente.
      items.forEach((el) => {
        // Dérive continue, chaque icône sur son propre rythme.
        gsap.to(el, {
          y: rnd(-26, 26),
          x: rnd(-16, 16),
          rotation: rnd(-9, 9),
          duration: rnd(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: rnd(0, 2.5),
        });

        // Respiration lumineuse, décorrélée de la dérive et bornée haut pour
        // ne jamais descendre sous le seuil de lisibilité.
        gsap.to(el, {
          opacity: rnd(0.5, 0.95),
          duration: rnd(2.5, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: rnd(0, 3),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    // --p-r : rayon de l'arc. Il grandit avec le portail, dont la hauteur
    // passe de 260 à 420px — sinon le zénith sortirait par le haut au format
    // téléphone et les extrémités déborderaient sur les côtés.
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 [--p-r:150px] sm:[--p-r:250px] md:[--p-r:330px]"
    >
      {TECHS.map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        const cos = (Math.cos(rad) * t.rf).toFixed(4);
        const sin = (Math.sin(rad) * t.rf).toFixed(4);
        return (
          // Enveloppe : porte la position sur l'arc et le centrage. Le tween
          // GSAP écrit sur `transform`, donc il ne doit pas vivre ici — sinon
          // il écraserait le translate(-50%,-50%) et décalerait tout.
          <span
            key={t.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${t.mobile ? "block" : "hidden sm:block"}`}
            style={{
              left: `calc(50% + var(--p-r) * ${cos})`,
              top: `calc(100% - var(--p-r) * ${sin})`,
            }}
          >
            <span
              className="p-tech flex h-[38px] w-[38px] items-center justify-center rounded-[11px] md:h-[44px] md:w-[44px]"
              style={{
                color: t.color,
                // Opacité de repos : c'est ce qu'on voit si GSAP ne tourne pas.
                opacity: 0.78,
                // Chrome de la tuile : tokens du monde portail, rien en dur.
                background: "var(--p-fill)",
                border: "1px solid var(--p-line)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: "0 6px 20px var(--p-shadow)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-[21px] w-[21px] md:h-[24px] md:w-[24px]">
                <title>{t.label}</title>
                {t.mark}
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
