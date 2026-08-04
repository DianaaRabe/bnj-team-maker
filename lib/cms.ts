// Types partagés du CMS (blog + podcasts) et petits helpers.

export type ContentStatus = "draft" | "published" | "scheduled";

// Lien interne suggéré/posé dans un article (maillage).
export interface InternalLink {
  title: string;
  slug: string;
  anchor: string;
}

// ─────────────────────────────────────────────────────────────
//  Auteur unique du site (Benjamin reste le seul visage public).
//  → Édite ces valeurs une fois ; elles alimentent tout le blog.
// ─────────────────────────────────────────────────────────────
export interface Author {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  socials: Record<string, string>;
}

export const SITE_AUTHOR: Author = {
  id: "benjamin",
  name: "Benjamin",
  avatar_url: "",
  bio: "Fondateur de BNJ Team Maker.",
  socials: {
    linkedin: "https://www.linkedin.com/",
  },
};

// ─── Ligne en base (table blog_posts) ───
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string;
  linkedin_url: string;
  category: string;
  tags: string[];
  status: ContentStatus;
  read_time_minutes: number;
  views_count: number;
  author_email: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  // ─── CMS éditorial : SEO / Open Graph / images / planification ───
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  focus_keyword: string;
  secondary_keywords: string[];
  robots_index: boolean;
  robots_follow: boolean;
  cover_alt: string;
  cover_caption: string;
  cover_credit: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_card: string;
  internal_links: InternalLink[];
  word_count: number;
  seo_score: number;
  scheduled_at: string | null;
}

// ─── Ligne en base (table podcasts) ───
export interface Podcast {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  linkedin_url: string;
  status: ContentStatus;
  author_email: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// ─── Commentaire (scaffolding : alimenté plus tard par le site public) ───
export interface BlogComment {
  id: string;
  user_name: string;
  avatar_url: string;
  comment_text: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// ─── Forme publique exposée par l'API (format « classique » imbriqué) ───
export interface BlogPostPublic {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: ContentStatus;
  featured_image: string;
  published_at: string | null;
  updated_at: string;
  read_time_minutes: number;
  views_count: number;
  author: Author;
  categories: Category[];
  tags: string[];
  comments: BlogComment[];
}

// Slug URL-safe à partir d'un titre (accents retirés, espaces → tirets).
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Nombre de mots du contenu (balises HTML retirées).
export function countWords(html: string): number {
  return html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// Temps de lecture estimé (≈ 200 mots/minute), minimum 1 min.
export function readingTimeMinutes(html: string): number {
  return Math.max(1, Math.round(countWords(html) / 200));
}

// Transforme une ligne SQL en objet public imbriqué (auteur, catégories, tags…).
export function toPublicBlogPost(
  row: BlogPost,
  comments: BlogComment[] = [],
): BlogPostPublic {
  const name = row.category?.trim() ?? "";
  const categories: Category[] = name
    ? [{ id: slugify(name), name, slug: slugify(name) }]
    : [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    content: row.content ?? "",
    status: row.status,
    featured_image: row.featured_image ?? "",
    published_at: row.published_at,
    updated_at: row.updated_at,
    read_time_minutes: row.read_time_minutes ?? 1,
    views_count: row.views_count ?? 0,
    author: SITE_AUTHOR,
    categories,
    tags: row.tags ?? [],
    comments,
  };
}
