# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: French-speaking founders, CTOs and engineering managers at European (mainly French)
startups and scale-ups who need to add developers to a team and are blocked by local hiring —
3–6 month cycles, €60–80K gross salaries in Paris, recruitment agencies taking 15–20%, and a
shallow pool where the strongest candidates are already employed and solicited weekly.

They arrive from paid or organic search on a buying-intent query, on desktop during a work day,
usually comparing BNJ against a local recruitment agency, a freelance marketplace, and doing
nothing. They are evaluating, not browsing: the decision they are about to make is whether to
spend 30 minutes on a discovery call.

Other confirmed audiences exist on adjacent surfaces (`/sdr` sales profiles, `/rh` HR profiles,
`/agent-de-talent` partner network) and are out of scope for this surface.

## Product Purpose

BNJ Team Maker places pre-qualified French-speaking talent — sourced primarily from French-speaking
Africa (Madagascar, Senegal, Côte d'Ivoire, Cameroon, Benin) — into European companies. The `/dev`
surface covers developers specifically.

Success for this surface is a booked discovery call (Calendly) or an opened talent carousel that
leads to one. There is no self-serve purchase and no account creation on this page.

## Positioning

The mechanism a neighboring product cannot truthfully copy: BNJ maintains a standing ATS of 8 000+
pre-qualified French-speaking candidates, so it presents named profiles with day rates within 48h
instead of opening a search. The claim is not "cheaper offshore developers" — it is **no language
barrier and no sourcing delay**, because the pool already exists and already speaks French.

The competitive frame is a local French recruitment agency, not an offshore body shop.

## Operating Context

- Sole conversion path: Calendly (`https://calendly.com/benjaminparienty/30min`), 30-minute discovery call.
- Secondary engagement: an in-page talent carousel showing real available profiles, ending on a Calendly slide.
- Stated delivery promise: first profiles within 48h, hire within ~7 days, structured onboarding, weekly check-ins for the first 30 days.
- Commercial terms: flexible contracts, no mandatory long-term commitment, free replacement within the first 30 days.
- Contact: contact@bnjteammaker.fr.

## Capabilities and Constraints

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4, TypeScript. Supabase for a separate CMS/admin area.
- `framer-motion`, `lucide-react`, `next-cloudinary` available. Fonts loaded via `next/font/google`.
- The `/dev` route currently renders `PageWithModal`, a component set **shared with `/sdr` and `/rh`**. Those two routes are out of scope and must keep rendering exactly as they do today. Any redesign of `/dev` must therefore not mutate the shared components.
- Page copy is data-driven from `lib/data/dev.ts` (`LandingPageData`); global FAQ from `lib/constants.ts`; talent profiles from `lib/data/profiles.ts`.
- Locale is French (`lang="fr"`). All copy is French. No i18n system is in place and none is required.
- Talent photos are deliberately blurred — candidate identity is not disclosed pre-contract.

## Brand Commitments

- Name: **BNJ Team Maker**. Logo is a hosted asset (`BRAND.logo.white` / `.color`), binding.
- **Palette is contractual and binding:** primary purple `#590293`, accent gold `#feb527`,
  secondary `#c069ee`. Their *usage* is free — the obligation is the colors, not the current
  dark-violet-with-glow treatment.
- The 3D cartoon avatar (`public/images/avatar.png`) is **not** binding and may be removed.
- Voice: direct, concrete, second person ("vous"), numbers over adjectives, short declarative
  sentences. No hype vocabulary. Existing copy is the reference for tone.

## Evidence on Hand

Real and usable:
- Three real anonymized developer profiles with role, seniority, diploma, day rate (€123–140/j), country, skills and availability (`lib/data/profiles.ts`). These are the strongest proof asset on the page — specific, checkable-feeling, and impossible for a competitor to copy-paste.
- Real day rates in euros, which directly substantiate the cost claim.
- Real stack coverage list (18 named technologies) in `lib/data/dev.ts`.
- Logo assets.

Claimed but unsourced — carried forward from existing copy, must not be amplified or invented past
their current form: "8 000+ candidates in ATS", "7 days average", "−60% on HR costs", "94% satisfaction
at 90 days", "12% acceptance rate", "40–65% savings".

**Absent — must not be fabricated:** client logos, named testimonials, case studies, press, real
photographs of team/talent/offices, pricing grid. The user confirmed none are available today. Any
slot that needs them ships as a clearly marked placeholder on the user's replacement list.

## Product Principles

1. **The pool is the product.** Anything that shows real profiles, real rates and real availability
   outranks anything that describes the service in the abstract.
2. **Compete on speed and language, not on being cheap.** Cost is a consequence, not the headline promise.
3. **Specifics beat adjectives.** A day rate, a stack name, a country flag, a number of days — never "premium", "excellence", "innovant".
4. **One action.** Every section resolves to the same discovery call; the talent carousel is the on-ramp to it, never a competing destination.
5. **Do not spend credibility on claims we cannot source.** Unsourced numbers stay at their current
   modest form and are never dressed up as verified proof.

## Accessibility & Inclusion

No product-specific standard was established. Baseline obligations apply: the surface is French-language,
keyboard-operable, respects `prefers-reduced-motion`, and maintains legible contrast — the incumbent
`#a898c0` body text on `#08050f` is a known weak point to fix rather than inherit.
