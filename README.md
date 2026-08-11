# BNJ Team Maker — Landings métiers

Trois landings, destinées à être servies sur le domaine principal
(`bnjteammaker.fr`) à côté du site déjà en production :

| Route | Surface |
|---|---|
| `/dev` | Développeurs |
| `/rh` | Recrutement & RH |
| `/offshore` | Générale — tous les métiers (tech, RH, sales, growth, CM, admin…) |

**Hébergement retenu : le VPS**, aux côtés du site existant. Voir
« Déploiement » plus bas.

Next.js 16 (App Router) + React 19 + Tailwind CSS v4, en TypeScript.

## Ajouter une verticale

Les trois pages partagent **un seul jeu de composants**
(`components/landing/portal/`) ; seul le contenu diffère. Pour en ajouter une :

1. ajouter une entrée dans `VERTICALS` (`lib/data/verticals.ts`) ;
2. créer `app/<slug>/page.tsx` sur le modèle de `app/rh/page.tsx`.

Aucun composant n'est à dupliquer.

---

## ⚠ À faire en premier : révoquer les clés

Les identifiants Cloudflare présents dans `.env.local` **ont été transmis en clair
dans une conversation**. Ils doivent être considérés comme compromis.

Avant toute mise en production :

1. Cloudflare → *My Profile* → *API Tokens* → révoquer le token existant.
2. Cloudflare → *R2* → révoquer l'Access Key / Secret Access Key.
3. Régénérer, puis remplacer les valeurs dans `.env.local`.

Idem pour `CAL_API_KEY`, transmise dans les mêmes conditions.

`.env.local` est couvert par `.gitignore` (`.env*`) : il n'est jamais versionné.

---

## Démarrer

```bash
npm install
npm run dev
```

→ http://localhost:3000

```bash
npm run build   # build de production
npm start       # sert le build
npm run lint
```

---

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner les valeurs.

| Variable | Rôle | Obligatoire |
|---|---|---|
| `CAL_API_KEY` | Clé serveur Cal.com. Lit les créneaux réels. **Jamais exposée au navigateur.** | oui — sans elle le panneau de réservation affiche son état d'erreur |
| `NEXT_PUBLIC_CAL_USERNAME` | Identifiant public Cal.com | oui |
| `CLOUDFLARE_ACCOUNT_ID` | Compte Cloudflare (DNS / R2) | non — infra uniquement |
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare | non — infra uniquement |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_S3_ENDPOINT` | Stockage R2. **Non utilisé par la landing aujourd'hui.** | non |

---

## Structure

```
app/
  dev/page.tsx        Landing développeurs
  rh/page.tsx         Landing recrutement & RH
  offshore/page.tsx   Landing générale
  layout.tsx          Polices + coquille HTML + metadataBase
  globals.css         Thème « portail » — tout est préfixé .p-
  api/cal/slots/      Créneaux Cal.com, côté serveur (protège la clé API)
components/landing/portal/     ← partagé par les trois surfaces
  PortalLanding.tsx   Assemble la page à partir d'une verticale
  CostSimulator.tsx   Simulateur d'économies (hero)
  FloatingTech.tsx    Icônes d'outils animées (gsap)
  RolesGrid.tsx       Grille des métiers — /offshore uniquement
  PainGrid.tsx        « Le constat »
  ProcessSpire.tsx    Entonnoir en 5 étapes
  CompareTable.tsx    Tableau comparatif (section claire)
  LoveWall.tsx        Mur des retours  ⚠ contenu de démonstration
  Faq.tsx             FAQ en accordéon
  BookingArc.tsx      Section de réservation
  BookingPanel.tsx    Calendrier + créneaux, branché sur Cal.com
  PortalFooter.tsx    Liens croisés entre landings + site principal (VPS)
lib/
  cal.ts              Config Cal.com (fuseau, durée, event type)
  constants.ts        Marque, FAQ, étapes du process
  data/verticals.ts   TOUTE la copie des trois landings
  data/profiles.ts    Profils du vivier
  types.ts
```

### Contenu à remplacer avant mise en ligne

1. **Témoignages.** Chaque verticale porte huit retours **fictifs** (`love.items`
   dans `lib/data/verticals.ts`), signalés dans l'interface par un bandeau
   « Exemples de mise en page ». BNJ ne dispose d'aucun témoignage client réel à
   ce jour. Remplacer les données et **retirer le bandeau en même temps** — pas
   avant.
2. **Grille tarifaire.** Les TJM France du simulateur sont des *estimations*, et
   les TJM BNJ ne sont adossés au vivier réel que pour dev (123 €), RH (75 €) et
   SDR (100 €). Les autres lignes sont extrapolées.
3. **Métiers sans tarif.** Sur `/offshore`, growth, CM, assistanat, support et
   design affichent « Tarif sur demande » : aucun profil réel du vivier ne
   substantie un chiffre. Renseigner `tjm` dans `METIERS` quand la grille
   existe — plutôt que d'inventer un montant.

---

## Cal.com

Le panneau de réservation lit les vrais créneaux via `/api/cal/slots`, qui
interroge Cal.com côté serveur. La clé API ne descend jamais dans le navigateur.

Tout est affiché en **heure de Paris**, quel que soit le fuseau du visiteur.

Un clic sur un créneau ouvre la modale Cal.com **directement sur ce créneau** :
l'utilisateur n'a pas à le resélectionner.

Réglages qui vivent dans le **dashboard Cal.com**, pas dans ce code :

- le titre du rendez-vous ;
- les champs du formulaire (téléphone, type de profil recherché…) →
  *Event Types* → l'événement → *Advanced* → *Booking questions*.

---

## Déploiement — VPS

Les trois landings rejoignent le site déjà en production sur le VPS, sous
`/dev`, `/rh` et `/offshore`.

**Le rendu serveur doit rester actif.** `/api/cal/slots` en dépend pour
garder `CAL_API_KEY` hors du navigateur, et les pages sont rendues par
Next. Ne pas basculer le site en export statique : `next build` puis
`next start` (ou un gestionnaire de processus type PM2), pas un simple
dossier de fichiers.

Ce que le déploiement suppose côté VPS :

1. Node 20 (voir `NODE_VERSION` dans `netlify.toml`, même exigence ici).
2. `CAL_API_KEY` et `NEXT_PUBLIC_CAL_USERNAME` dans l'environnement du
   processus Node. `.env.local` n'est pas versionné.
3. Le serveur web existant (nginx/Apache) relaie `/dev`, `/rh`,
   `/offshore`, `/_next/*`, `/api/cal/*` et `/icon.jpg` vers le processus
   Next ; tout le reste continue d'être servi par le site actuel.

> ⚠ Les chemins `/_next/*` et `/api/cal/*` sont indispensables : sans le
> premier les pages s'affichent sans styles ni JavaScript, sans le second
> le panneau de réservation part en erreur.

### Reste de l'ancienne piste Netlify

Un site Netlify (`earnest-marigold-2f5d3e`) existe encore et sert ces
landings sur `dev.bnjteammaker.fr` / `.com`. Il devient inutile une fois
le VPS en place : penser à retirer les domaines personnalisés, les CNAME
`dev` correspondants sur Cloudflare, et à archiver le projet.
`docs/cloudflare-dns.md` documente cette ancienne mise en place.

### Si vous zippez le projet

Exclure de l'archive : `node_modules/`, `.next/`, `tsconfig.tsbuildinfo`, et
**`.env.local`** si l'archive part chez un tiers.
