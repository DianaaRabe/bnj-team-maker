import type { Testimonial } from "./verticals";

/* ─────────────────────────────────────────────────────────────────────
   Témoignages — EXEMPLES DE MISE EN PAGE, PAS DE VRAIS RETOURS.

   Noms, sociétés et verbatims sont inventés. Ce fichier n'est importé par
   personne, volontairement : rien de ce qu'il contient ne part dans le
   bundle envoyé au navigateur. Il ne sert que de gabarit — le format et
   la longueur utile d'un verbatim pour le mur des retours.

   Pour rallumer la section : remplacer ces entrées par de vrais retours
   clients, les recopier dans `love.items` (lib/data/verticals.ts), passer
   TEMOIGNAGES_REELS à true, et retirer le bandeau de LoveWall.tsx.
   ───────────────────────────────────────────────────────────────────── */

export const EXEMPLES_DEV: Testimonial[] = [
  { nom: "Julien Ferrand", poste: "CTO · Novalia (SaaS B2B)", texte: "Le dev qu'on a intégré a livré son premier module en prod avant la fin du sprint. Le delivery n'a jamais ralenti la vélocité de l'équipe, contrairement à ce qu'on craignait." },
  { nom: "Camille Roussel", poste: "Head of Engineering · Kelvyn CRM", texte: "On refondait notre CRM interne et il manquait deux devs back. BNJ nous en a mis un en poste en une semaine, avec la codebase en tête dès le premier standup." },
  { nom: "Antoine Marchetti", poste: "Fondateur · Structo (SaaS RH)", texte: "On a scalé l'équipe produit sans dégrader le rythme de release. Deux devs, deux features livrées le mois suivant, comme si l'équipe était en place depuis six mois." },
  { nom: "Léa Bertrand", poste: "VP Product · Tallyo (plateforme ATS)", texte: "Voir le TJM et le stack avant le premier appel a changé la donne côté produit : on a pu cadrer le scope du sprint avant même d'avoir signé." },
  { nom: "Nicolas Ory", poste: "Lead Dev · Cardyo (fintech)", texte: "L'onboarding technique était fait avant l'arrivée : accès, repo, tickets priorisés. Le premier commit en prod est parti au bout de trois jours." },
  { nom: "Sophie Delatour", poste: "DSI · Reso (SaaS retail)", texte: "On migrait notre ATS legacy vers une stack moderne. Le dev a tenu la roadmap de migration sans un jour de retard sur les deux mois de delivery." },
  { nom: "Maxime Guillot", poste: "CTO · Fluenta (scale-up SaaS)", texte: "Un profil n'a pas tenu le rythme de delivery attendu. Remplacé sous dix jours, sans discussion et sans que le backlog en pâtisse." },
  { nom: "Inès Chapelle", poste: "Engineering Manager · Meridianne CRM", texte: "Sur un produit CRM avec beaucoup de dette technique, avoir un dev déjà rôdé aux specs mal écrites a évité trois semaines de clarifications." },
];

export const EXEMPLES_RH: Testimonial[] = [
  { nom: "Claire Vasseur", poste: "DRH · Ombeline (retail, 140 salariés)", texte: "On avait douze postes ouverts et une seule personne aux RH. La chargée de recrutement de BNJ a repris le sourcing en trois jours, sans période de flottement." },
  { nom: "Thomas Rivière", poste: "Fondateur · Skalen (scale-up B2B)", texte: "Notre time-to-hire est passé de deux mois à trois semaines. Pas de secret : quelqu'un s'occupe enfin des relances à temps plein." },
  { nom: "Nadia Berthier", poste: "Head of People · Vantel", texte: "Le tri des candidatures nous mangeait deux jours par semaine. Aujourd'hui je ne vois que des dossiers pré-qualifiés, avec un compte rendu d'entretien." },
  { nom: "Pierre Lemoine", poste: "DG · Groupe Astel (services)", texte: "On cherchait un profil RH sans vouloir ouvrir un CDI. Un temps partagé chez BNJ a réglé la question, et on ajuste le volume chaque trimestre." },
  { nom: "Émilie Fontaine", poste: "Talent Manager · Kaleo", texte: "Le vrai apport a été la structure : grilles d'entretien, scorecards, process d'onboarding écrit. Ça n'existait pas avant chez nous." },
  { nom: "Yann Delcourt", poste: "COO · Neveris (industrie)", texte: "Recruter des techniciens en région, c'était devenu impossible en interne. Le sourcing multi-jobboard a débloqué quatre postes en un mois." },
  { nom: "Sarah Ould", poste: "DRH · Petrelle & Associés", texte: "La communication en français n'a jamais été un sujet. Les entretiens candidats se passent exactement comme s'ils étaient dans nos bureaux." },
  { nom: "Grégoire Nallet", poste: "Directeur associé · Hyanne Conseil", texte: "On a testé un profil sur un mois avant de s'engager. C'est ce format sans engagement qui nous a décidés à continuer." },
];

export const EXEMPLES_OFFSHORE: Testimonial[] = [
  { nom: "Julien Ferrand", poste: "CTO · Novalia (SaaS B2B)", texte: "Le dev qu'on a intégré a livré son premier module en prod avant la fin du sprint. Le delivery n'a jamais ralenti la vélocité de l'équipe." },
  { nom: "Claire Vasseur", poste: "DRH · Ombeline (retail)", texte: "On avait douze postes ouverts et une seule personne aux RH. La chargée de recrutement de BNJ a repris le sourcing en trois jours." },
  { nom: "Marc Anselme", poste: "VP Sales · Trilio (SaaS)", texte: "Deux SDR en poste en dix jours. Le pipeline a redémarré au mois suivant, sans que j'aie eu à ouvrir un seul processus de recrutement." },
  { nom: "Nadia Berthier", poste: "Head of People · Vantel", texte: "Le tri des candidatures nous mangeait deux jours par semaine. Aujourd'hui je ne vois que des dossiers pré-qualifiés." },
  { nom: "Hugo Trémaud", poste: "Fondateur · Lorenzia (e-commerce)", texte: "Un assistant admin et une CM. Deux postes que je n'aurais jamais ouverts en CDI et qui m'ont rendu quinze heures par semaine." },
  { nom: "Sophie Delatour", poste: "DSI · Reso (SaaS retail)", texte: "Un seul interlocuteur pour trois métiers différents, c'est ce qui a fait la décision. Avant, on jonglait entre trois prestataires." },
  { nom: "Maxime Guillot", poste: "CTO · Fluenta (scale-up)", texte: "Un profil n'a pas tenu le rythme attendu. Remplacé sous dix jours, sans discussion et sans que le backlog en pâtisse." },
  { nom: "Élodie Kerhoas", poste: "Directrice marketing · Baltane", texte: "La community manager écrit un français impeccable. C'était mon inquiétude principale et elle a été levée dès le test rédactionnel." },
];
