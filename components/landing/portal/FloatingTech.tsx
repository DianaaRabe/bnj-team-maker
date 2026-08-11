"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";
import type { TechKey } from "@/lib/data/verticals";

/* ─────────────────────────────────────────────────────────────────────
   Icônes d'outils flottant au-dessus du portail.

   Les marques sont dessinées en SVG inline : pas de CDN, rien à charger,
   et elles héritent de leur couleur via currentColor. Ce sont des marques
   de tiers — leurs couleurs sortent volontairement de la palette BNJ,
   c'est ce qui les rend reconnaissables.

   Le jeu affiché dépend de la verticale : des technos sur /dev, des
   outils métier sur /rh, un mélange sur /offshore. La verticale ne donne
   qu'une LISTE D'IDENTIFIANTS ; les positions viennent d'ARC ci-dessous,
   par index. Deux surfaces ont donc la même géométrie d'arc quel que soit
   leur jeu d'icônes.

   Positions FIXES (aucun Math.random au rendu) : le serveur et le client
   doivent produire le même HTML. Le hasard est introduit par GSAP, côté
   client uniquement, une fois monté.
   ───────────────────────────────────────────────────────────────────── */

type Mark = { label: string; color: string; mark: ReactNode };

const MARKS: Record<TechKey, Mark> = {
  react: {
    label: "React",
    color: "#61DAFB",
    mark: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="currentColor" />,
  },
  node: {
    label: "Node.js",
    color: "#7FC728",
    mark: (
      <>
        <path d="M12 1.6 21.5 7v10L12 22.4 2.5 17V7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">
          N
        </text>
      </>
    ),
  },
  ts: {
    label: "TypeScript",
    color: "#3178C6",
    mark: (
      <>
        <rect width="24" height="24" rx="3" fill="currentColor" />
        <text x="12" y="17" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0a0613">
          TS
        </text>
      </>
    ),
  },
  python: {
    label: "Python",
    color: "#FFD43B",
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
  graphql: {
    label: "GraphQL",
    color: "#E535AB",
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
  php: {
    label: "PHP",
    color: "#8892BF",
    mark: (
      <>
        <ellipse cx="12" cy="12" rx="11.5" ry="6.6" fill="currentColor" />
        <text x="12" y="15" textAnchor="middle" fontSize="7.6" fontWeight="700" fontStyle="italic" fill="#0a0613">
          php
        </text>
      </>
    ),
  },
  redis: {
    label: "Redis",
    color: "#FF4438",
    mark: (
      <g fill="currentColor">
        <ellipse cx="12" cy="5.6" rx="10" ry="3.3" />
        <path d="M2 9c0 1.8 4.5 3.3 10 3.3S22 10.8 22 9v2.9c0 1.8-4.5 3.3-10 3.3S2 13.7 2 11.9z" opacity="0.72" />
        <path d="M2 14.8c0 1.8 4.5 3.3 10 3.3s10-1.5 10-3.3v2.6c0 1.8-4.5 3.3-10 3.3s-10-1.5-10-3.3z" opacity="0.5" />
      </g>
    ),
  },
  docker: {
    label: "Docker",
    color: "#2496ED",
    mark: <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="currentColor" />,
  },
  vue: {
    label: "Vue.js",
    color: "#41B883",
    mark: (
      <>
        <path d="M2 3.4h4.3L12 13.2 17.7 3.4H22L12 20.6z" fill="currentColor" opacity="0.5" />
        <path d="M6.3 3.4h3.3L12 7.7l2.4-4.3h3.3L12 12.9z" fill="currentColor" />
      </>
    ),
  },
  tailwind: {
    label: "Tailwind CSS",
    color: "#38BDF8",
    mark: (
      <path
        d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C15.6 7.1 14.4 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C10.6 13.1 9.4 12 7 12z"
        fill="currentColor"
      />
    ),
  },

  /* ── Jobboards & outils de recrutement ──────────────────────────────
     Marques françaises pour l'essentiel, dessinées en monogramme plutôt
     qu'en reproduction de logo : à 44 px, un logotype complet est
     illisible, et un tracé approximatif ressemblerait à une contrefaçon.
     Le monogramme dans la couleur de la marque assume ce qu'il est.

     ⚠ COULEURS À CONFIRMER pour les marques françaises : elles n'ont pas
     de charte publique consultable (Brandfetch renvoie 403). Celles de
     LinkedIn et Indeed sont établies. Remplacer les autres dès que les
     hex officiels sont connus. */

  hellowork: {
    label: "HelloWork",
    color: "#E2001A",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
          hw
        </text>
      </>
    ),
  },
  indeed: {
    label: "Indeed",
    // Le bleu principal d'Indeed (#003A9B) est un marine trop sombre pour
    // ce fond : on prend le bleu clair de sa propre interface. Le tracé,
    // lui, est le logo officiel.
    color: "#2164F3",
    mark: <path d="M11.566 21.5633v-8.762c.2553.0231.5009.0346.758.0346 1.2225 0 2.3739-.3206 3.3506-.8928v9.6182c0 .8219-.1957 1.4287-.5757 1.8338-.378.4033-.8808.6049-1.491.6049-.6007 0-1.0766-.2016-1.468-.6183-.3781-.4032-.5739-1.01-.5739-1.8184zM11.589.5659c2.5447-.8929 5.4424-.8449 7.6186.987.405.3687.8673.8334 1.0515 1.3806.2207.6913-.7695-.073-.9057-.167-.71-.4532-1.4182-.8334-2.2127-1.0946C12.8614.3873 8.8122 2.709 6.2945 6.315c-1.0516 1.5939-1.7367 3.2721-2.299 5.1174-.0614.2017-.1094.4647-.2207.6413-.1113.2036-.048-.5453-.048-.5702.0845-.7623.2438-1.4997.4414-2.237C5.3292 5.3375 7.897 2.0655 11.5891.5658zm4.9281 7.0587c0 1.6686-1.353 3.0224-3.0205 3.0224-1.6677 0-3.0186-1.3538-3.0186-3.0224 0-1.6687 1.351-3.0224 3.0186-3.0224 1.6676 0 3.0205 1.3518 3.0205 3.0224Z" fill="currentColor" />,
  },
  cvaden: {
    label: "CVaden",
    color: "#1C3F94",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
          cv
        </text>
      </>
    ),
  },
  taleez: {
    label: "Taleez",
    color: "#00B2A9",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0a0613">
          tz
        </text>
      </>
    ),
  },
  apec: {
    label: "APEC",
    color: "#E30613",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <text x="12" y="15.4" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">
          apec
        </text>
      </>
    ),
  },
  wttj: {
    label: "Welcome to the Jungle",
    color: "#FFCD00",
    mark: <path d="M22.62 3.783c-1.115-1.811-4.355-2.604-6.713-.265-.132.135-.306.548.218 1.104 1.097 1.149 6.819 7.046 4.702 12.196-1.028 2.504-3.953 2.073-5.052-2.076a23.184 23.184 0 0 1-.473-9.367s.105-.394-.065-.52c-.117-.087-.305-.05-.547.33-.06.096-.048.076-.106.178l-.003.002c-1.622 2.688-3.272 5.874-4.049 7.07.38-1.803-.101-4.283-.85-6.359l-.142-.375c-.692-1.776-1.524-2.974-1.776-3.245-.03-.033-.105-.094-.353-.094H.398c-.49 0-.448.412-.293.561 1.862 2.178 7.289 10.343 4.773 18.355-.194.619.11.944.612.305 2.206-2.81 4.942-7.598 6.925-11.187-.437 1.245-.822 2.63-1.028 4.083-.435 3.064.487 5.37 1.162 6.58.345.619.803.998 1.988.824 6.045-.885 8.06-6.117 8.805-8.77 1.357-4.839.363-7.568-.722-9.33" fill="currentColor" />,
  },
  francetravail: {
    label: "France Travail",
    color: "#26365F",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
          ft
        </text>
      </>
    ),
  },
  monster: {
    label: "Monster",
    color: "#6D4C9F",
    mark: <path d="M0 0V24H5.42V12.39L12 18.19L18.58 12.39V24H24V0L12 11.23L0 0Z" fill="currentColor" />,
  },

  /* ── Outils métier : sales, growth, contenu ── */

  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
    mark: (
      <>
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <g fill="#0a0613">
          <circle cx="7" cy="7.4" r="1.8" />
          <rect x="5.4" y="10.2" width="3.2" height="8.4" rx="0.4" />
          <path d="M10.8 10.2h3v1.2c.6-.9 1.6-1.5 2.9-1.5 2.2 0 3.5 1.4 3.5 3.9v4.8h-3.2v-4.3c0-1.2-.5-1.9-1.5-1.9s-1.6.7-1.6 1.9v4.3h-3.1z" />
        </g>
      </>
    ),
  },
  hubspot: {
    label: "HubSpot",
    color: "#FF7A59",
    mark: <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" fill="currentColor" />,
  },
  slack: {
    label: "Slack",
    color: "#E01E5A",
    mark: (
      <g fill="currentColor">
        <rect x="9.6" y="2" width="3.2" height="9.6" rx="1.6" />
        <rect x="2" y="11.2" width="9.6" height="3.2" rx="1.6" opacity="0.75" />
        <rect x="11.2" y="12.4" width="3.2" height="9.6" rx="1.6" opacity="0.55" />
        <rect x="12.4" y="9.6" width="9.6" height="3.2" rx="1.6" opacity="0.85" />
      </g>
    ),
  },
  notion: {
    label: "Notion",
    color: "#E9E9E9",
    mark: <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="currentColor" />,
  },
  sheets: {
    label: "Google Sheets",
    color: "#34A853",
    mark: <path d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z" fill="currentColor" />,
  },
  canva: {
    label: "Canva",
    color: "#00C4CC",
    mark: (
      <>
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <text x="12" y="16.4" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0a0613">
          C
        </text>
      </>
    ),
  },
  figma: {
    label: "Figma",
    color: "#F24E1E",
    mark: <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" fill="currentColor" />,
  },
  salesforce: {
    label: "Salesforce",
    color: "#00A1E0",
    mark: (
      <g fill="currentColor">
        <ellipse cx="8.4" cy="14" rx="5.4" ry="4.4" />
        <ellipse cx="15.6" cy="13.4" rx="5.4" ry="4.8" opacity="0.8" />
        <circle cx="11.6" cy="9.4" r="4.2" opacity="0.9" />
      </g>
    ),
  },
  meta: {
    label: "Meta",
    color: "#0467DF",
    mark: <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" fill="currentColor" />,
  },
  ads: {
    label: "Google Ads",
    color: "#4285F4",
    mark: <path d="M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z" fill="currentColor" />,
  },
};

/**
 * Emplacements sur l'arc, dans l'ordre où la verticale liste ses icônes.
 *
 * `angle` : 180° = horizon gauche, 90° = zénith, 0° = horizon droit. Le
 * centre de l'arc est celui du dôme — le milieu du bord bas du portail —
 * donc les icônes suivent le même rayon que les anneaux concentriques.
 * `rf` : écart au rayon nominal, pour que l'arc respire au lieu d'être
 * mécanique. `mobile` : affichée au format téléphone — dix icônes dans
 * 386×260 px se marchent dessus, on n'en garde que six.
 */
const ARC: { angle: number; rf: number; mobile?: boolean }[] = [
  { angle: 165, rf: 1, mobile: true },
  { angle: 133, rf: 1.06, mobile: true },
  { angle: 101, rf: 1.03, mobile: true },
  { angle: 79, rf: 0.93, mobile: true },
  { angle: 149, rf: 0.94 },
  { angle: 117, rf: 0.96 },
  { angle: 47, rf: 0.97, mobile: true },
  { angle: 15, rf: 0.95, mobile: true },
  { angle: 63, rf: 1.05 },
  { angle: 31, rf: 1.02 },
];

export default function FloatingTech({ techs }: { techs: TechKey[] }) {
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
      {techs.slice(0, ARC.length).map((id, i) => {
        const t = MARKS[id];
        const pos = ARC[i];
        const rad = (pos.angle * Math.PI) / 180;
        const cos = (Math.cos(rad) * pos.rf).toFixed(4);
        const sin = (Math.sin(rad) * pos.rf).toFixed(4);
        return (
          // Enveloppe : porte la position sur l'arc et le centrage. Le tween
          // GSAP écrit sur `transform`, donc il ne doit pas vivre ici — sinon
          // il écraserait le translate(-50%,-50%) et décalerait tout.
          <span
            key={id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${pos.mobile ? "block" : "hidden sm:block"}`}
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
