import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { canEditBlog, type AppRole } from "@/lib/auth/roles";
import {
  normalizeReview,
  type SeoReview,
  type SeoReviewInput,
} from "@/lib/seo/review";

// Analyse SEO d'un article via Groq (API compatible OpenAI). La clé est lue
// côté serveur uniquement — jamais exposée au navigateur.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Tu es un expert SEO francophone. Tu analyses un article de blog et tu réponds STRICTEMENT en JSON valide, sans texte autour, avec la forme exacte :
{
  "summary": string,                    // bilan en une phrase
  "strengths": string[],                // points forts (max 5)
  "weaknesses": string[],               // points faibles (max 5)
  "suggestions": string[],              // actions concrètes d'amélioration (max 6)
  "keywords": string[],                 // mots-clés pertinents à viser (max 8)
  "alt_titles": string[],               // 3 titres SEO alternatifs (≤ 60 caractères)
  "alt_meta_descriptions": string[]     // 3 meta descriptions alternatives (120-160 caractères)
}
Réponds en français. Sois concret et spécifique au contenu fourni.`;

function buildUserPrompt(v: SeoReviewInput): string {
  const text = v.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return [
    `Titre : ${v.title || "(vide)"}`,
    `Meta title : ${v.meta_title || "(vide)"}`,
    `Meta description : ${v.meta_description || "(vide)"}`,
    `Mot-clé principal : ${v.focus_keyword || "(vide)"}`,
    `Contenu (texte brut) :`,
    text.slice(0, 6000),
  ].join("\n");
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { data: prof } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!canEditBlog((prof?.role as AppRole | undefined) ?? null)) {
    return NextResponse.json(
      { error: "Accès refusé : ton rôle ne permet pas d'analyser le blog." },
      { status: 403 },
    );
  }

  // Accepte GROQ_API_KEY (recommandé) ou LLM_Key (nom déjà présent en local).
  const apiKey = process.env.GROQ_API_KEY || process.env.LLM_Key;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Clé Groq absente. Ajoute GROQ_API_KEY dans .env.local puis redémarre le serveur.",
      },
      { status: 503 },
    );
  }

  let body: SeoReviewInput;
  try {
    body = (await request.json()) as SeoReviewInput;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(body) },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `Groq a renvoyé une erreur (${res.status}).`, detail },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "{}";

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Réponse IA illisible (JSON invalide)." },
        { status: 502 },
      );
    }

    const review: SeoReview = normalizeReview(parsed);
    return NextResponse.json(review);
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter Groq." },
      { status: 502 },
    );
  }
}
