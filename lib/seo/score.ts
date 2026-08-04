import { countWords } from "@/lib/cms";

// ─────────────────────────────────────────────────────────────
//  Moteur de score SEO (sur 100). Fonction pure : utilisée en
//  direct dans l'UI (panneau SEO Health) ET côté serveur pour
//  figer `seo_score` à l'enregistrement.
// ─────────────────────────────────────────────────────────────

export interface SeoCheck {
  id: string;
  label: string;
  ok: boolean;
  weight: number;
}

export type SeoLevel = "rouge" | "orange" | "vert";

export interface SeoHealth {
  score: number;
  level: SeoLevel;
  checks: SeoCheck[];
}

export interface SeoInput {
  title: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  content: string;
  featured_image: string;
  cover_alt: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
}

function isReadable(html: string): boolean {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return false;
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return false;
  const avgWords =
    sentences.reduce((acc, s) => acc + s.split(/\s+/).length, 0) /
    sentences.length;
  return avgWords <= 25; // phrases ni trop longues ni illisibles
}

// ─────────────────────────────────────────────────────────────
//  Maillage interne : compte les liens pointant vers d'autres pages
//  du site (href relatif ou vers le domaine), et en déduit un niveau.
// ─────────────────────────────────────────────────────────────

export type LinkingLevel = "insuffisant" | "bon" | "excellent";

export interface InternalLinkStats {
  count: number;
  level: LinkingLevel;
}

export function internalLinkStats(html: string): InternalLinkStats {
  const hrefs = [...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)].map(
    (m) => m[1].trim(),
  );
  const count = hrefs.filter((h) => {
    const lower = h.toLowerCase();
    if (lower.startsWith("/")) return true; // chemin relatif interne
    return lower.includes("bnjteammaker.fr"); // lien absolu vers le site
  }).length;

  const level: LinkingLevel =
    count >= 3 ? "excellent" : count >= 1 ? "bon" : "insuffisant";
  return { count, level };
}

export function computeSeoHealth(v: SeoInput): SeoHealth {
  const text = v.content.replace(/<[^>]+>/g, " ").toLowerCase();
  const words = countWords(v.content);
  const kw = v.focus_keyword.trim().toLowerCase();
  const seoTitle = (v.meta_title.trim() || v.title.trim());
  const metaLen = v.meta_description.trim().length;

  const imgs = v.content.match(/<img\b[^>]*>/gi) ?? [];
  const imgsWithoutAlt = imgs.filter(
    (tag) => !/\balt\s*=\s*["'][^"']+["']/i.test(tag),
  );
  const links = v.content.match(/<a\b[^>]*href=/gi) ?? [];

  const checks: SeoCheck[] = [
    {
      id: "title",
      label: "Titre SEO renseigné (≤ 60 caractères)",
      weight: 10,
      ok: v.title.trim().length > 0 && seoTitle.length <= 60,
    },
    {
      id: "meta",
      label: "Meta description (80–160 caractères)",
      weight: 10,
      ok: metaLen >= 80 && metaLen <= 160,
    },
    {
      id: "keyword",
      label: "Mot-clé principal dans le titre et le contenu",
      weight: 15,
      ok:
        kw.length > 0 &&
        seoTitle.toLowerCase().includes(kw) &&
        text.includes(kw),
    },
    {
      id: "alt",
      label: "Toutes les images ont un ALT",
      weight: 10,
      ok:
        (v.featured_image.trim() === "" || v.cover_alt.trim().length > 0) &&
        imgsWithoutAlt.length === 0,
    },
    {
      id: "links",
      label: "Au moins un lien dans l'article",
      weight: 10,
      ok: links.length >= 1,
    },
    {
      id: "length",
      label: "Contenu d'au moins 500 mots",
      weight: 10,
      ok: words >= 500,
    },
    {
      id: "readability",
      label: "Lisibilité correcte (phrases courtes)",
      weight: 10,
      ok: isReadable(v.content),
    },
    {
      id: "canonical",
      label: "URL canonique renseignée",
      weight: 5,
      ok: v.canonical_url.trim().length > 0,
    },
    {
      id: "og",
      label: "Open Graph (titre + description)",
      weight: 5,
      ok: v.og_title.trim().length > 0 && v.og_description.trim().length > 0,
    },
    {
      id: "hn",
      label: "Structure Hn (au moins un H2 et un H3)",
      weight: 10,
      ok: /<h2[\s>]/i.test(v.content) && /<h3[\s>]/i.test(v.content),
    },
  ];

  const score = checks.reduce((sum, c) => sum + (c.ok ? c.weight : 0), 0);
  const level: SeoLevel = score >= 80 ? "vert" : score >= 50 ? "orange" : "rouge";
  return { score, level, checks };
}
