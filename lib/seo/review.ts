// ─────────────────────────────────────────────────────────────
//  Type partagé de l'analyse SEO produite par l'IA (Groq).
//  Utilisé par la route /api/seo-review et par l'UI (onglet IA).
// ─────────────────────────────────────────────────────────────

export interface SeoReview {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: string[];
  alt_titles: string[];
  alt_meta_descriptions: string[];
}

export interface SeoReviewInput {
  title: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  content: string;
}

// Garantit une forme exploitable même si le modèle renvoie un JSON partiel.
export function normalizeReview(raw: unknown): SeoReview {
  const o = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [];
  return {
    summary: typeof o.summary === "string" ? o.summary : "",
    strengths: arr(o.strengths),
    weaknesses: arr(o.weaknesses),
    suggestions: arr(o.suggestions),
    keywords: arr(o.keywords),
    alt_titles: arr(o.alt_titles),
    alt_meta_descriptions: arr(o.alt_meta_descriptions),
  };
}
