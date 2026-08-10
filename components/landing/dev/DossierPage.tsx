"use client";

import { useState } from "react";
import type { LandingPageData } from "@/lib/types";
import type { TalentProfile } from "@/lib/data/profiles";
import DossierModal from "./DossierModal";
import {
  DossierHeader,
  Cover,
  Constat,
  Vivier,
  Fiches,
  Procedure,
  Registre,
  Note,
  Questions,
  Cloture,
} from "./sections";

/** Contrat de direction — émis en commentaire HTML dans le build.
 *  React supprime les commentaires JSX, d'où l'injection explicite. */
const CONTRACT = `<!--
IMPECCABLE DIRECTION CONTRACT — surface /dev — seed 818e1046
THESIS: This page is not a brochure about the talent pool; it IS the dossier, already
assembled and already stamped. It refuses the category default it replaced: dark hero,
blurred colour orbs, glass cards, gradient text, floating badges.
OWN-WORLD: French administrative dossier. Pale folder stock #eceaf1; violet #590293 as
STAMP INK, owning whole regions rather than glowing; gold #feb527 as index-tab stock and
the primary action; Archivo struck uppercase for titles, DM Sans (uppercase, tracked, tabular
figures) for the entry layer (references, day rates, stamps, field entries); form rules, dotted
leaders, perforated margins, ruled ledgers. No glass, no glow, no gradient, no rounded pill.
STORY: A CTO sees three real developers with real day rates in the first viewport, believes
the pool already exists, and books the 30-minute call.
FIRST VIEWPORT: Opening cartouche across the top. Left: struck headline, the accent line
stamped in solid violet at an angle, the exposé as a ruled field, gold tab action, three
checked boxes. Right: three real fiches with names, roles and day rates, visible without a
click. Below the fold line: the four figures as a ruled bordereau, not cards.
FORM: Grounded candidate 3 of 7 (administrative dossier); assigned by the roll, seed 818e1046.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

interface Props {
  data: LandingPageData;
  profiles: TalentProfile[];
}

export default function DossierPage({ data, profiles }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);

  return (
    <div data-surface="dossier" className="flex min-h-screen flex-col">
      <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: CONTRACT }} />

      <DossierHeader onOpen={open} />

      <main>
        <Cover data={data} profiles={profiles} onOpen={open} />
        <Constat data={data.painPoints} />
        <Vivier data={data.profileSection} onOpen={open} />
        <Fiches profiles={profiles} onOpen={open} />
        <Procedure />
        <Registre data={data.whyBNJ} />
        <Note data={data.aPlayers} />
        <Questions />
      </main>

      <Cloture data={data.finalCTA} onOpen={open} />

      <DossierModal isOpen={modalOpen} onClose={() => setModalOpen(false)} profiles={profiles} />
    </div>
  );
}
