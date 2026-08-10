---
name: Le Dossier — BNJ /dev
description: A French administrative dossier rendered as a landing page — folder stock, stamp ink, index tabs, ruled fields.
colors:
  stock: "#eceaf1"
  stock-2: "#e3dfea"
  stock-3: "#d5cee2"
  stock-fiche: "#f4f2f7"
  ink: "#590293"
  ink-active: "#47027a"
  ink-deep: "#2b0748"
  gold: "#feb527"
  gold-hover: "#ffc84f"
  gold-active: "#e9a411"
  text: "#1c0b2e"
  text-2: "#4a3d5c"
  rule-muted: "#7f6f99"
  leader: "#b3a8c6"
  violet-2: "#c069ee"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline-compact:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.8rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  annotation:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: "normal"
  question:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "normal"
  stat-label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "normal"
  typed:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
  stamp:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.14em"
  action:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  chip:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.58rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
  tab:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0"
spacing:
  field: "8px"
  card: "20px"
  gutter: "20px"
  gutter-md: "32px"
  block: "48px"
  section: "64px"
  section-md: "96px"
components:
  action-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  action-gold-hover:
    backgroundColor: "{colors.gold-hover}"
    textColor: "{colors.ink-deep}"
  action-gold-active:
    backgroundColor: "{colors.gold-active}"
    textColor: "{colors.ink-deep}"
  action-ink:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  action-ink-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  stamp-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.6em 0.24em"
  stamp-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.6em 0.24em"
  stamp-gold:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.6em 0.24em"
  tab:
    backgroundColor: "{colors.stock-2}"
    textColor: "{colors.text-2}"
    typography: "{typography.tab}"
    rounded: "{rounded.none}"
    padding: "8px 13.6px 7.2px"
  tab-current:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink-deep}"
  fiche:
    backgroundColor: "{colors.stock-fiche}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Le Dossier — BNJ /dev

> **Scope.** This system governs the `/dev` surface only. It is opted in by the
> `[data-surface="dossier"]` attribute on the page root (`components/landing/dev/DossierPage.tsx`)
> and implemented in the `LE DOSSIER` block at the foot of `app/globals.css`; every class is
> prefixed `.d-`. The other routes (`/sdr`, `/rh`, the CMS) still run the legacy dark theme
> that occupies the top of `globals.css` — a `#08050f` background with glass panels, blurred
> glows and gradient text. **The two worlds are unrelated and neither one governs the repo.**
> Do not import legacy utilities (`.bg-glass`, `.glow-purple`, `.text-gradient-*`, `.bg-grid`)
> into the dossier, and do not read the dossier's rules as a mandate over the legacy pages.
> If the dossier is ever extended to another route, extend it by adding `data-surface="dossier"`
> to that route's root — never by loosening the `.d-` prefix.

## Overview

**Creative North Star: "Le Dossier"**

This is not a page *about* a talent pool; it is the dossier itself — already assembled,
already referenced `DEV-2026`, already stamped. Everything on screen is a real artefact of
French administrative paperwork: pale folder stock, violet stamp ink, gold index tabs, form
rules, dotted leaders between a field label and its value, a perforated filing margin, a
ruled bordereau, and a closing seal. The reader is not being sold a service; they are being
handed a file that exists.

The material logic is strict and it does all the work. Stock is card, not screen: three
steps of pale violet-grey paper, flat, opaque, never translucent. Ink is ink: violet
`#590293` prints — it draws rules, fills whole regions, strokes SVG paths, sets type — but it
never glows, blurs, or fades into a gradient. Gold `#feb527` is index-tab stock: it is the
material an active tab and the one conversion action are cut from, nothing else. Density
irregularity in the stamps comes from a shared `feTurbulence` alpha mask, because a perfect
flat fill reads as digital print and breaks the conceit.

The world defines itself as much by refusal as by material. It explicitly replaced a dark
hero with blurred colour orbs, glass cards, gradient text and floating badges, and none of
those devices may come back. There are no rounded corners anywhere on this surface — not a
pill, not an 8px card, not a 2px input. In the document plane depth is carried by paper tone
and ruled ink; a shadow is spent on one thing only, the overlay that floats above the file.

**Key Characteristics:**
- Zero border radius, everywhere, without exception.
- Two type layers only: Archivo struck uppercase (what is *printed* on the form) and DM Sans, uppercase and tracked (what was *entered into* it).
- Type steps at breakpoints and never interpolates — no `clamp()`, no viewport units.
- Violet is stamp ink; gold is index-tab stock; nothing else carries colour.
- Flat document plane — no glass, no gradient, no glow; one soft ambient shadow, reserved for the overlay.
- Groups of items are ruled ledger rows, not cards in a grid.
- Content is server-rendered visible; motion is armed after paint and can never hide content.
- Icons are drawn SVG at a single stroke weight; no unicode glyphs stand in for marks.

## Colors

A violet-grey administrative palette: three tones of folder stock carrying one saturated
violet ink and one saturated gold, with no tint, tone or third accent between them.

### Primary
- **Stamp Ink Violet** (`#590293`): the ink. It sets the piece reference, the day rate, every
  1.5px register rule, the stamp border and its solid fill, the drawn checkmarks, the seal,
  and it floods the entire "Note interne" section as a full-bleed field. Contrast on stock is
  9.5:1, so it is legible as text at label sizes. It is never used as a glow, a shadow colour,
  a gradient stop, or a translucent overlay.
- **Ink Deep** (`#2b0748`): the darker ink used where violet would sit *on* gold — the border
  and text of the gold action (9.7:1 on gold), and the modal scrim at 55% opacity.
- **Ink Active** (`#47027a`): pressed state of the outline-ink action only.

### Secondary
- **Index Tab Gold** (`#feb527`): tab stock and the primary action's material. Reserved: an
  active header tab and the Calendly button are the only elements cut from it, plus figures
  and the attachment label inside the ink-flooded Note, where gold is the only readable accent.
  Never used for body text on stock (it fails contrast there); always paired with `ink-deep`
  (9.7:1). Hover lifts to `#ffc84f`, press drops to `#e9a411`.

### Tertiary
- **Violet Clair** (`#c069ee`): declared as `--d-violet-2` and part of the contractual brand
  triad, but **currently unused in the dossier**. It carries no role here. Do not introduce it
  as a third accent, a hover tint, or a gradient partner without a deliberate decision — the
  world's tension depends on exactly two inks.

### Neutral
- **Folder Stock** (`#eceaf1`): the page. Also set on `body` via `:has()` so overscroll stays paper.
- **Stock Two** (`#e3dfea`): the alternating section tone and the tab/perforation ground. This
  is how sections separate — a tone step, not a shadow or a card.
- **Stock Three** (`#d5cee2`): every hairline. Row separators, panel borders, the perforation
  dots, the vertical divider in the header.
- **Fiche Stock** (`#f4f2f7`): the index-card tone, one step *lighter* than the page, so a
  fiche reads as a card laid on the folder rather than a hole cut into it.
- **Text** (`#1c0b2e`): body and headings on stock (15.5:1).
- **Text Two** (`#4a3d5c`): secondary prose, field labels, all typed metadata (8.3:1).
- **Rule Muted** (`#7f6f99`): the non-committal border — an unavailable candidate's status
  chip, an unselected pagination cell. 4.07:1 against fiche stock, so it clears the 3:1
  non-text minimum on its own.
- **Leader Grey** (`#b3a8c6`): the dotted leader between a field label and its value. Decorative
  only, `aria-hidden`.

### Named Rules

**The Stamp-Ink Rule.** Violet is ink, not light. It may print (border, fill, stroke, type)
and it may own a whole region. It may never glow, blur, gradient, or sit at partial opacity
as an atmospheric wash.

**The Two-Action Rule.** Gold `.d-action` = book the 30-minute Calendly call, the sole
conversion. Outline-ink `.d-action--ink` = consult the fiches, the on-ramp. **No other colour
on this surface carries an action.** A new CTA either joins one of these two, or it is not a CTA.
The secondary is deliberately outline and not a violet fill: a solid `#590293` slab on stock
outweighs gold and steals primacy from the conversion.

**The One Ink Region Rule.** At most one full-bleed ink field per page (currently the "Note
interne"). Inside it, gold is the only accent and hairlines become `white/25` — a 1px
`stock-3` rule vanishes on ink. A second flooded section would turn the stamp into wallpaper.

**The Contractual Triad Rule.** `#590293`, `#feb527`, `#c069ee` are brand-binding. A
contributor may change how they are *used*; the hex values themselves are not up for revision.

## Typography

**Display Font:** Archivo (fallback `system-ui, sans-serif`), weights 400–900
**Body Font:** Archivo, 400 — the surface's default family
**Entry Font:** DM Sans (fallback `system-ui, sans-serif`), 400 & 700, uppercase and tracked, with `font-variant-numeric: tabular-nums` so ledger columns align.

**Character:** One grotesque and one typewriter, doing two literally different jobs. Archivo
at 900, uppercase, tracked to −0.02em with a 0.92–0.95 line-height is the *struck* layer: what
the form itself says, set tight enough that a four-line headline reads as one block of print.
DM Sans is the *entry* layer: everything a clerk would have entered into the form —
references, day rates, dates, field labels, stamps, tab names, action labels. Ligatures are
disabled and `font-synthesis-weight: none` is set on the surface, so a missing weight degrades
to a real weight rather than a smeared one.

### Hierarchy

Sizes are **discrete steps**, never fluid: no `clamp()`, no `vw` unit, no interpolation. A role
that grows does so at named breakpoints. Every value the build uses is listed below — a literal
outside this set does not belong to the system. Breakpoints: `sm` 640, `md` 768, `xl` 1280;
an unmarked value is the base and holds until a step overrides it.

**Struck layer — Archivo 900, uppercase**

- **Display** (lh 0.92, ls −0.02em) — the cover H1, one per page.
  `2.25rem` → sm `3.4rem` → md `4.2rem` → xl `4.9rem`.
- **Headline** (lh 0.95, ls −0.02em) — section H2s and the closing titles. Three ladders are in
  use, one per host; do not mix them:
  - `PieceHead` (default): `2rem` → sm `2.6rem` → md `3.2rem`.
  - Note interne: `2rem` → sm `2.7rem` → md `3.2rem`.
  - Clôture: `2rem` → sm `2.7rem` → md `3.4rem`.
- **Headline Compact** (lh 0.98) — `PieceHead size="compact"`, for a headline set in a narrow
  column. `1.75rem` → sm `2.1rem` → md `2.35rem`.
- **Headline Overlay** (lh 0.98) — the modal's booking title, no steps: `1.7rem`.
- **Title** (ls −0.01em) — H3s and named entities. Four fixed steps, chosen by host:
  `0.95rem` (modal header counter), `0.98rem` (registre row, cover fiche name), `1rem` (process
  step), `1.05rem` (constat row, fiche name) → md `1.25rem` (constat row only), `1.2rem` (modal
  profile name, no steps).
- **Figure** (lh 1, ink or gold) — `1.8rem` → md `2.4rem` for the bordereau; `1.5rem` for a Note
  metric.

**Prose layer — Archivo 400/500/600**

- **Lead** (400, lh 1.75–1.8, `text-2`) — the paragraph under a headline: `0.95rem` (`PieceHead`),
  `0.98rem` (cover exposé, Clôture subtitle), `1rem` (Note body).
- **Annotation** (500, lh 1.75, `text`) — the constat's closing statement, the one paragraph set
  above body size: `1.02rem` → md `1.15rem`.
- **Body** (400, lh 1.75–1.8, `text-2`) — `0.8rem` (fiche highlights), `0.82rem` (checked box),
  `0.84rem` (modal highlights), `0.88rem` (registre and process rows), `0.9rem` (constat rows,
  FAQ answers, Note proof, modal booking copy).
- **Question** (600, lh 1.375, `text`) — the FAQ trigger: `0.95rem`.
- **Stat Label** (600, lh 1.375, `text`) — the bordereau `dt` under a figure: `0.78rem`.

**Entry layer — DM Sans**

- **Action** (700, uppercase, ls 0.1em) — every button and CTA label. Five fixed steps by host:
  `0.66rem` (header), `0.68rem` (the dashed tear-off and the fiche "Détail" text action),
  `0.72rem` (vivier button, modal footer button), `0.76rem` (cover, Note, modal booking),
  `0.78rem` (Clôture).
- **Stamp** (700, uppercase, ls 0.14em) — `0.62rem` → md `0.68rem`. The cover's solid accent
  stamp overrides this with its own ladder, the only stamp permitted to: `1rem` → sm `1.3rem`
  → md `1.55rem` at ls 0.06em.
- **Label** (400/700, uppercase, ls 0.08–0.18em, `text-2`) — cartouche entries, field intitulés,
  section markers, footnotes. `0.58rem`, `0.6rem`, `0.62rem`, `0.64rem`, and `0.68rem` for the
  `PieceHead` filing coordinate. Tracking rises as size falls.
- **Typed Data** (400/700, lh 1.7–1.75) — field values, roles, skill lists, references:
  `0.66rem` (candidate experience, footer), `0.7rem` (modal role), `0.72rem` (cover fiche role),
  `0.76rem` (fiche skills, the process closing line), `0.78rem` (skill names, mobile nav rows),
  `0.8rem` (field rows, modal skills), `0.86rem` (cover day rate, process step number).
- **Chip** (400, uppercase, ls 0.1em) — availability chips: `0.58rem`.
- **Pagination** (700, uppercase, ls 0.08em) — modal page cells: `0.6rem`.
- **Tab** (400/700, uppercase, ls 0.1em) — `0.68rem`, set once in `.d-tab` and never overridden.

The closing seal is the only place type is sized in SVG user units rather than rem: `21`
(struck "Dossier ouvert"), `9` (the arc legend), `8.5` (the reference line), on a `160`-unit
viewBox. Scale the seal by its box, never by restyling those numbers.

### Named Rules

**The Discrete Step Rule.** Type never interpolates. Pick a role, take its listed steps, and
step at `sm` / `md` / `xl`. Never introduce `clamp()`, a viewport unit, or a size that is not in
the list above — a value between two steps has no meaning in this system and will read as drift.

**The Two-Layer Rule.** Archivo for what is *printed on* the form, DM Sans for what is
*typed into* it. A reference, a day rate, a date, a status, a stamp, a tab or a button label is
always Courier. A heading or a paragraph of argument is always Archivo. Never set a typed value
in Archivo to "clean it up" — the split is the whole system.

**The Filing Coordinate Rule.** The only element permitted above a heading is the piece
coordinate — `Pièce 03 · Fiches talents`, set in Courier at `0.68rem`/0.18em with the number in
ink and a 24px hairline between number and label. It is a filing reference, not a marketing
eyebrow. Never add an adjectival kicker ("Enfin une solution…") above a title; that device does
not exist in this world.

**The Struck-Tight Rule.** Struck headings run at line-height < 1 (0.92–0.98) and negative
tracking. Never set an Archivo 900 uppercase heading at default leading — it disintegrates into
a list of words instead of a printed block.

## Layout

**Container.** `max-w-[1180px]`, centred, gutters `px-5` (20px) rising to `md:px-8` (32px). The
FAQ narrows to `max-w-[900px]`; the consultation modal caps at `560px`. Prose is bounded
independently at `max-w-xl` / `max-w-2xl` / `max-w-3xl` regardless of container width.

**Vertical rhythm.** Sections run `py-16` (64px) → `md:py-24` (96px). The gap between a
`PieceHead` and its content is `mt-11`/`mt-12` (44–48px). Inside a ledger, rows are `py-6` →
`md:py-7`. Inside a fiche or modal block, padding is a flat `p-5` (20px) and field rows are
separated by `space-y-2` (8px). There is no 4px-multiple purism beyond that; the ladder in use
is 8 / 20 / 32 / 48 / 64 / 96.

**Section boundaries.** Sections are separated by a rule and a tone step, never a gap or a
shadow. A `1.5px` ink border closes the cover; `1px stock-3` closes every other section;
alternating sections take `stock-2` as their ground.

**Asymmetric two-column grids** carry the pages that need them, always with a fixed-width side
column so the ruled material never reflows into a soft ratio:
- Cover: `lg:grid-cols-[minmax(0,1fr)_384px]` — headline top-left, fiches spanning both rows on
  the right, exposé and actions bottom-left. Source order puts the fiches directly after the
  headline so that at 390px a named candidate with a day rate lands in the first viewport.
- Vivier: `lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)]`.
- Note: `lg:grid-cols-[minmax(0,1fr)_340px]`.

**Breakpoints** are Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Behaviour at
each: below `sm` everything is one column and action pairs stack; at `sm` the checkbox row goes
to 3 columns and actions go inline; at `md` the bordereau goes from 2 to 4 columns and type
steps up; at `lg` the tab navigation replaces the "Sommaire" disclosure and the perforated
margin appears.

**The perforated margin** (`PerfMargin`, 26px) is `lg:block` only — it is a filing artefact, and
on a phone the page has no margin to spare.

### Named Rules

**The Ruled Ledger Rule.** A set of comparable items is a ruled table, not a grid of cards: a
`1.5px` ink rule opens the list, a `1px stock-3` hairline separates each row, and the rows carry
no box, no background and no shadow of their own. This applies to the constat, the process, the
registre, the FAQ and the bordereau. A card is reserved for a fiche — a thing that is literally
a card.

**The Sticky Cartouche Rule.** The header is opaque `stock` at `z-40` with a `stock-3` bottom
rule. Card does not become translucent when it scrolls; never give it a backdrop-filter.

## Elevation & Depth

**The document plane is flat.** Nothing that lies in the dossier — section, panel, fiche, button,
chip, header — casts a shadow. Depth there is carried by three devices, in order of preference:

1. **Tone stepping** — `stock` (page) / `stock-2` (recessed section, tabs, perforation) /
   `stock-fiche` `#f4f2f7` (a card laid *on* the page, one step lighter).
2. **Ruled ink** — a `1.5px` `#590293` register rule opens or closes a structural block; a
   `1px` `#d5cee2` hairline separates rows within it. Weight, not shadow, signals rank.
3. **Ink flooding** — the one region where violet covers the full width reads as a different
   physical sheet inserted into the file.

**There is exactly one plane above the document, and it is the only thing that casts.** The
consultation modal is a sheet held over the file rather than filed in it, so it takes a single
soft ambient shadow — a wide, purely vertical, ink-tinted cast, no offset to the side, no spread.
That shadow is what says "held above", which tone stepping cannot say. It is the only
`box-shadow` in the system, and the modal is currently the only element entitled to it.

The `blur(5px)` on candidate photographs is not a depth effect: it is deliberate anonymisation
(identity is released after signature), applied with `grayscale` inside a bordered frame. It is
the only blur allowed on this surface.

### Shadow Vocabulary

- **Overlay lift** (`box-shadow: 0 18px 44px rgba(43,7,72,0.3)`): the modal panel only. Zero
  horizontal offset, a 44px blur, no spread, tinted with `ink-deep` rather than black so the cast
  stays inside the palette. Any future overlay plane (a second dialog, a lightbox) uses this exact
  value; nothing in the document plane uses it at all.

### Named Rules

**The Flat Stock Rule.** Surfaces in the document plane never cast. No `box-shadow`, no
`backdrop-filter`, no `filter: drop-shadow` on a section, panel, fiche, card, button or chip — if
one needs to read as raised, it changes stock tone and gains a border. Only a surface that floats
above the entire dossier may take the Overlay lift, and only at that exact value.

**The No-Offset Rule.** A shadow in this world is diffuse and vertical. Hard offset "block"
shadows (`Npx Npx 0`, any colour, any size) are banned outright, including on the overlay: this
world is administrative, not neobrutalist, and a 3px/3px offset was the single most repeated tell
in the page this replaced. If a shadow is ever justified, it has zero horizontal offset, a blur
radius several times its vertical offset, no spread, and an `ink-deep` tint.

## Shapes

**Zero radius, everywhere.** `border-radius: 0` on every element without exception: buttons,
stamps, fiches, chips, the modal, avatars, pagination cells. This is the fastest way to tell
whether a new component belongs to this world.

Borders carry the whole form language and use exactly three weights, each with a fixed meaning:
- **1px `stock-3`** — hairline: row separators, panel edges, avatar frames, the header divider.
- **1.5px `ink`** — register rule: opens a ledger, closes the cover, frames a document panel,
  encloses the modal, borders every action and every drawn box (checkbox, process number,
  FAQ toggle).
- **2px `ink`** — stamp border only.

Two shapes are non-rectangular, and both are cut rather than curved:
- **The index tab** — `clip-path: polygon(0 100%, 6px 0, calc(100% - 6px) 0, 100% 100%)`, a
  6px-chamfered trapezoid with no bottom border, seated on the header rule.
- **The seal** — two concentric circles (r 74 at 2.5px, r 67 at 1px) with text on an arc path.
  A circle is permitted only when the artefact is genuinely round.

Recurring linear marks: the **dotted leader** (1px dotted `#b3a8c6`, `flex:1`, baseline-aligned,
in its own single-line box so a wrapping value never drags an orphan leader under it), the
**perforation** (a `radial-gradient` dot, 2.6px radius, repeating every 26px), and the
**grid paper** (`rgba(89,2,147,0.055)` at 22px, used only where a real form would be ruled — the
skills panel and the closing footer).

## Components

Every component is drawn from card and ink. Nothing is translucent, nothing is rounded, nothing
is lifted.

### Buttons

- **Shape:** square (0 radius), `1.5px` border, DM Sans 700 uppercase at 0.1em tracking.
- **Primary — `.d-action`:** gold `#feb527` ground, `#2b0748` text and border, padding `16px 28px`
  (`px-7 py-4`); `md` header instance shrinks to `10px 20px`. Hover `#ffc84f`, active `#e9a411`,
  transition `background 0.12s linear`. This button always points at Calendly.
- **Secondary — `.d-action .d-action--ink`:** transparent ground, ink text and border. Hover
  inverts to a solid ink fill with `stock` text; active `#47027a`. This button always opens the
  fiches modal.
- **Dashed variant** (used once, under the cover fiche list): `1.5px dashed` ink at 45% opacity,
  full-width, inverting to solid ink on hover. It reads as a perforated tear-off strip.
- **Text action:** Courier 700 uppercase in ink with `underline underline-offset-4`. Used for
  in-flow links and the fiche "Détail" affordance. Never styled as a third button.
- **Focus:** every focusable element on the surface takes `outline: 2px solid #590293` at
  `outline-offset: 2px`, inherited by the modal. Do not remove or recolour it.

### Chips

- **Status chip:** `1px` border, `px-1.5 py-0.5`, Courier at `0.58rem`/0.1em uppercase. Available
  = ink border + ink text; otherwise `#7f6f99` border + `text-2` text. The chip carries no fill —
  a filled chip would read as a stamp.
- **Index tab — `.d-tab`:** chamfered trapezoid, `stock-2` ground with `stock-3` border and no
  bottom edge, `text-2` label. `[aria-current="true"]` swaps to gold ground, gold border,
  `ink-deep` bold text. Hover fills to `stock-3`. Transition `0.14s linear`.

### Cards / Containers

- **Fiche (`.d-fiche`)** — the only true card. `#f4f2f7` ground, `1px stock-3` border, 0 radius,
  no shadow, `p-5` per block. It is structured like a real bordereau: a header band closed by a
  `1.5px` ink rule (blurred grayscale avatar + name + role), a field block of dotted-leader rows,
  hairline-separated "Points forts" and "Compétences" blocks, and a footer band opened by a
  second `1.5px` ink rule holding the availability stamp and the detail action. **There is no
  side accent bar** — ink structures the card through its register rules, exactly as a real
  form does.
- **Document panel** — `1.5px` ink border on `stock` or `stock-2`, with an optional typed
  cartouche strip across the top separated by a `1px` hairline. Used for the closing block, the
  skills inventory and the constat annotation.
- **Bordereau** — statistics as a bordered grid of `dl` cells (`2` cols → `md:4`), separated by
  `stock-3` borders only, figure in ink Archivo 900, label beneath in Archivo 600. Never cards.

### Field Rows

The signature data primitive: a Courier uppercase label, a dotted leader that fills the
remaining space, and a right-aligned Courier value capped at `62%` width. `strong` renders the
value bold in ink — reserved for the day rate, which is the number the reader came for. The
leader lives in its own single-line flex box precisely so a two-line value cannot leave a
dangling dotted trail beneath it.

### Navigation

Sticky opaque header: logo at `1.7rem`, a hairline divider, and the dossier reference in Courier
with `DEV-2026` bold in ink. Section links are index tabs at `lg+`; below that a "Sommaire"
disclosure button opens a `stock-2` panel of full-width rows, each numbered `01`–`05` in ink,
separated by hairlines, ending with the fiches action in ink. The gold Calendly action is present
at every width and never collapses into the menu.

### Consultation Modal

A folder opened over the dossier, in the same material: `#2b0748` scrim at 55%, a `560px`
`#eceaf1` panel bordered `1.5px` ink, capped at `calc(100vh - 2rem)` with only the body
scrolling. Header band and footer band are closed by `1.5px` ink rules. Pagination is a row of
square `24px` Courier cells — current = solid ink on `stock`, others = `#7f6f99` outline — with
the final cell labelled "Suite" for the booking card. Arrow buttons are `32px` squares; the
"next" affordance is the solid-ink one. Keyboard: Escape closes, Left/Right paginate, body scroll
locks, focus moves to the panel on open. Entry `0.24s` with `cubic-bezier(0.2,0.8,0.3,1)`, scrim
`0.18s`, both reduced to opacity-only under `prefers-reduced-motion`.

### Stamps (signature component)

`.d-stamp` — Courier 700 uppercase at 0.14em, `2px` ink border, transparent ground, laid at an
angle. Three variants: outline (default), `--solid` (ink ground, stock text), `--gold`. Ink
density is broken by a shared `feTurbulence` alpha mask (`baseFrequency 0.75`, 4 octaves, alpha
remapped 0.42→1) so no stamp is a perfect flat fill. The same mask is exposed separately as
`.d-inked` for non-text ink marks — the closing seal uses it, because a perfectly crisp seal was
the one mark that still read as vector art.

Rotation is never random: `atoms.tsx` exports a fixed 8-angle table
(`-2.1, 1.4, -1.2, 2.3, -0.8, 1.9, -2.6, 0.9`) indexed modulo, so the irregularity is identical
on server and client. **Any new tilted element must draw its angle from `rotFor(i)`** — never
`Math.random()`, never a hand-typed one-off.

### Icons

All marks are drawn SVG in `atoms.tsx` — checkmark, arrow, plus/minus, close cross — at a single
1.6–2px stroke weight with `strokeLinecap="square"`, `fill="none"`, `currentColor` or
`var(--d-ink)`, and `aria-hidden`. Square caps match the ruled world; round caps do not. No icon
library, and **no unicode glyph ever stands in for a mark** — a `✕` beside a guarantee reads as a
refusal, and a `→` inherits the text font's stroke weight instead of the world's.

### Reveal Atoms

`Lift` (a 10px rise over `0.5s cubic-bezier(0.2,0.7,0.3,1)`, optional `--d-delay`) and `Stamp`
(a 0.34s stamp-down from `scale(1.14)` to `1`, once, on entry).

**The Armed-Not-Hidden Rule.** Content is server-rendered **visible**. `useReveal` arms the
effect in a layout effect (before paint), then plays it on intersection at `rootMargin
0px 0px -8% 0px`. With no JS, no `IntersectionObserver`, a failed hydration, or
`prefers-reduced-motion: reduce`, the page is fully readable and nothing is stuck at opacity 0.
This is load-bearing, not a nicety: never ship an element whose initial serialized state is
`opacity: 0`. A stamp poses once on entry and never re-plays on hover.

## Do's and Don'ts

### Do:
- **Do** scope every dossier style under `[data-surface="dossier"]` with a `.d-` prefix, and put new global rules in the `LE DOSSIER` block at the foot of `app/globals.css`.
- **Do** keep radius at exactly `0` on every new element.
- **Do** use the three border weights with their fixed meanings: `1px #d5cee2` hairline, `1.5px #590293` register rule, `2px #590293` stamp.
- **Do** render a set of comparable items as ruled ledger rows; reserve the card (`.d-fiche`) for a candidate fiche.
- **Do** send every gold action to Calendly and every outline-ink action to the fiches modal — the Two-Action Rule admits no third colour.
- **Do** set typed data (references, day rates, statuses, labels, button text) in DM Sans uppercase, and printed matter (headings, argument prose) in Archivo 900 uppercase.
- **Do** ship content visible and arm reveals after paint, so the page reads with JS disabled and under `prefers-reduced-motion`.
- **Do** draw new icons as SVG at 1.6–2px with `strokeLinecap="square"`.
- **Do** take any rotation from `rotFor(i)` in `atoms.tsx`, and put ink density irregularity on new stamps via `.d-inked`.
- **Do** hold the measured contrast floor: body 15.5:1, secondary 8.3:1, ink 9.5:1, ink-on-gold 9.7:1, and ≥3:1 for every non-text border.

### Don't:
- **Don't** introduce glassmorphism, `backdrop-filter`, translucent panels, or blurred colour orbs. The only permitted blur is the 5px anonymisation on candidate photographs.
- **Don't** put a `box-shadow` on anything in the document plane — sections, panels, fiches, buttons and chips get depth from stock tone and ruled ink. The single Overlay lift (`0 18px 44px rgba(43,7,72,0.3)`) belongs to the modal and to any future surface that floats above the whole dossier.
- **Don't** write a hard offset block shadow (`Npx Npx 0`) anywhere, overlay included — this world is administrative, not neobrutalist. Shadows here are diffuse, vertical-only and ink-tinted.
- **Don't** invent a size between two type steps, and don't reach for `clamp()` or a viewport unit — every legal value is listed in the Typography hierarchy.
- **Don't** use gradients anywhere: not as backgrounds, not as borders, and never as `background-clip: text`.
- **Don't** round anything — no pills, no `rounded-lg` cards, no soft avatars.
- **Don't** give a card a side-tab accent bar; structure it with header and footer register rules instead.
- **Don't** let violet glow, blur, or sit as a low-opacity atmospheric wash — it prints or it is absent.
- **Don't** flood a second section with ink, or introduce `#c069ee` as a third accent.
- **Don't** put an adjectival kicker or eyebrow above a heading; the only thing permitted there is the piece coordinate.
- **Don't** substitute a unicode glyph (`→`, `✓`, `✕`, `•`, `★`) for a drawn mark, and don't add an icon library.
- **Don't** import the legacy dark-theme utilities (`.bg-glass`, `.glow-purple`, `.glow-gold`, `.text-gradient-*`, `.bg-grid`, `.noise-overlay`) into this surface — they belong to the unrelated `/sdr` and `/rh` world.
- **Don't** randomise a rotation, a delay, or an ink pattern at render time; server and client must agree.
