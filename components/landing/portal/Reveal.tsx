"use client";

// Paquet `motion` (ex-framer-motion) : `framer-motion` n'est plus qu'un
// alias de compatibilité, l'entrée React supportée est `motion/react`.
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────
   Le vocabulaire de mouvement de la page — un seul, partagé.

   Toutes les sections apparaissent de la même façon : une montée courte
   avec fondu, sur une courbe qui décélère franchement. C'est la
   cohérence qui fait qu'un défilement paraît fluide ; dix réglages
   différents donnent une page qui s'agite.

   Ces composants sont clients, mais leurs ENFANTS restent serveur : une
   section peut donc s'envelopper dans <Reveal> sans basculer tout son
   contenu côté navigateur. C'est ce qui permet d'animer la page entière
   sans gonfler le bundle.

   `prefers-reduced-motion` est respecté partout : le contenu s'affiche
   alors d'emblée, à sa place définitive, sans transition.
   ───────────────────────────────────────────────────────────────────── */

/** Décélération franche — l'essentiel du trajet est fait très tôt. */
const EASE = [0.22, 1, 0.36, 1] as const;
const DUREE = 0.6;
/** Montée volontairement courte : au-delà, le texte « saute ». */
const MONTEE = 22;

/**
 * `amount: 0.2` — le bloc s'anime quand un cinquième est visible, pas
 * quand il affleure : sinon l'animation se joue hors champ sur les
 * grands blocs. `once` — rejouer à chaque passage est fatigant en
 * remontée de page.
 */
const VUE = { once: true, amount: 0.2 } as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Retard, en secondes. Pour décaler deux blocs voisins à la main. */
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduit = useReducedMotion();

  if (reduit) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: MONTEE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VUE}
      transition={{ duration: DUREE, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Conteneur d'une série d'éléments qui entrent en cascade.
 * Les enfants directs doivent être des <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = "div",
}: Props & {
  /** Écart entre deux enfants. Au-delà de ~0.1 s, la cascade traîne. */
  stagger?: number;
  /** `ul` quand le groupe est une liste — le balisage prime sur l'effet. */
  as?: "div" | "ul";
}) {
  const reduit = useReducedMotion();
  const Balise = as === "ul" ? motion.ul : motion.div;

  if (reduit) {
    return as === "ul" ? <ul className={className}>{children}</ul> : <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    masque: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Balise
      data-reveal
      className={className}
      variants={variants}
      initial="masque"
      whileInView="visible"
      viewport={VUE}
    >
      {children}
    </Balise>
  );
}

/** Un enfant de <RevealGroup>. Hors d'un groupe, il ne s'anime pas. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduit = useReducedMotion();
  const Balise = as === "li" ? motion.li : motion.div;

  if (reduit) {
    return as === "li" ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    masque: { opacity: 0, y: MONTEE },
    visible: { opacity: 1, y: 0, transition: { duration: DUREE, ease: EASE } },
  };

  return (
    <Balise data-reveal className={className} variants={variants}>
      {children}
    </Balise>
  );
}

/**
 * Entrée à l'ouverture de la page, pas au défilement — réservée au hero,
 * qui est déjà à l'écran quand la page s'affiche.
 */
export function RevealOnLoad({ children, className, delay = 0 }: Props) {
  const reduit = useReducedMotion();

  if (reduit) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: MONTEE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUREE, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
