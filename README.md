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

## Secrets

Tous les identifiants vivent dans `.env.local`, couvert par `.gitignore`
(`.env*`) : il n'est jamais versionné. Ne les recopier nulle part ailleurs
dans le dépôt.

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

## Déploiement — export statique dans `bnj-sites`

Les trois landings sont servies sur `bnjteammaker.fr/dev`, `/rh` et
`/offshore` par **le conteneur nginx du site principal** (dépôt
`bnj-sites`). Aucun processus Node ne tourne en production : le build
d'export est copié dans ce dépôt et versionné avec lui.

### Régénérer les pages

```bash
# bash
STATIC_EXPORT=1 npm run build
# PowerShell
$env:STATIC_EXPORT=1; npm run build
```

`out/` contient alors `dev.html`, `rh.html`, `offshore.html`, leurs
dossiers de navigation `dev/`, `rh/`, `offshore/`, plus `_next/` et
`icon.jpg`. On copie **tout cela** à la racine de `bnj-sites`, en
écrasant la version précédente — et **rien d'autre** : `404.html` et
`_not-found/` ne doivent pas y aller, ils écraseraient la page d'erreur
du site.

```bash
SRC=../bnj-landing/out
rm -rf _next dev rh offshore
cp -r $SRC/_next .
for p in dev rh offshore; do cp -r $SRC/$p .; cp $SRC/$p.html .; cp $SRC/$p.txt .; done
cp $SRC/icon.jpg .
```

`STATIC_EXPORT=1` change trois choses (voir `next.config.ts`) :
`output: "export"`, l'optimiseur d'images désactivé, et
`pageExtensions: ["tsx"]` qui exclut `app/api/cal/slots/route.ts` —
un route handler dynamique est incompatible avec l'export.

### Créneaux Cal.com en production

`/api/cal/slots` n'est plus servi par Next mais **par nginx**, qui relaie
vers `api.cal.com` en injectant l'en-tête d'autorisation
(`cal-slots.conf.template` dans `bnj-sites`). La clé reste donc hors du
navigateur, comme avant.

Le conteneur du site doit recevoir `CAL_API_KEY` dans son environnement :
`.env` à la racine de `bnj-sites` (non versionné, modèle dans
`.env.example`) pour un lancement local, et la même variable dans
l'environnement du conteneur côté hébergeur. Sans elle, les pages et la
modale Cal.com fonctionnent toujours ; seul le calendrier intégré affiche
son état d'erreur.

En développement (`npm run dev`), c'est le route handler Next qui répond :
`charger()` dans `useCalSlots.ts` accepte les deux formes de réponse.

### Reste de l'ancienne piste Netlify

Un site Netlify (`earnest-marigold-2f5d3e`) existe encore et sert ces
landings sur `dev.bnjteammaker.fr` / `.com`. Il devient inutile une fois
le VPS en place : penser à retirer les domaines personnalisés, les CNAME
`dev` correspondants sur Cloudflare, et à archiver le projet.
`docs/cloudflare-dns.md` documente cette ancienne mise en place.

### Si vous zippez le projet

Exclure de l'archive : `node_modules/`, `.next/`, `tsconfig.tsbuildinfo`, et
**`.env.local`** si l'archive part chez un tiers.
