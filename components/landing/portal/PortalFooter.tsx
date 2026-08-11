import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { VERTICALS, type VerticalSlug } from "@/lib/data/verticals";
import { RevealGroup, RevealItem } from "./Reveal";

/* ─────────────────────────────────────────────────────────────────────
   Pied de page — commun aux trois surfaces.

   Sa raison d'être n'est pas décorative : les trois landings vivent sur
   le même domaine que le site principal (déployé sur le VPS) mais ne sont
   pas dans sa navigation. Sans ces liens, /dev, /rh et /offshore sont des
   culs-de-sac — pour un visiteur comme pour un robot d'indexation.

   Les liens vers le site principal sont ABSOLUS : en développement, le
   site du VPS n'est pas servi par cette application.
   ───────────────────────────────────────────────────────────────────── */

const SITE = "https://bnjteammaker.fr";

const ORDRE: VerticalSlug[] = ["offshore", "dev", "rh"];

const LIENS_SITE = [
  { label: "Site BNJ Team Maker", href: SITE },
  { label: "Recrutement & coaching", href: `${SITE}/recrutement-et-coaching` },
  { label: "Tech & automatisation", href: `${SITE}/tech` },
  { label: "Nos offres d'emploi", href: `${SITE}/carrieres` },
];

export default function PortalFooter({ current }: { current: VerticalSlug }) {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#0a0613] px-4 py-14">
      <RevealGroup className="mx-auto grid max-w-[1210px] gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <RevealItem>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo.white} alt="BNJ Team Maker" style={{ height: "1.7rem", width: "auto" }} />
          <p className="mt-4 max-w-[34ch] text-[0.88rem] leading-[1.6] text-white/45">
            {BRAND.tagline}
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-4 inline-block text-[0.88rem] text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            {BRAND.email}
          </a>
        </RevealItem>

        <RevealItem>
        <nav aria-label="Nos landings par métier">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/35">
            Par métier
          </p>
          <ul className="mt-4 space-y-2.5">
            {ORDRE.map((slug) => {
              const v = VERTICALS[slug];
              const actif = slug === current;
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    aria-current={actif ? "page" : undefined}
                    className={`text-[0.9rem] underline-offset-4 hover:underline ${
                      actif ? "font-medium text-[#d8b4fe]" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {v.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </RevealItem>

        <RevealItem>
        <nav aria-label="Site BNJ Team Maker">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/35">
            BNJ Team Maker
          </p>
          <ul className="mt-4 space-y-2.5">
            {LIENS_SITE.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.9rem] text-white/60 underline-offset-4 hover:text-white hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </RevealItem>
      </RevealGroup>

      <div className="mx-auto mt-12 max-w-[1210px] border-t border-white/[0.06] pt-6">
        <p className="text-[0.78rem] text-white/30">
          © {new Date().getFullYear()} BNJ Team Maker — Talents francophones qualifiés.
        </p>
      </div>
    </footer>
  );
}
