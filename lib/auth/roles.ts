import { createClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "seo" | "podcast";

export function canEditBlog(role: AppRole | null): boolean {
  return role === "admin" || role === "seo";
}

export function canEditPodcast(role: AppRole | null): boolean {
  return role === "admin" || role === "podcast";
}

// Rôle de l'utilisateur connecté (null si non connecté ou non provisionné).
export async function getCurrentRole(): Promise<AppRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return (data?.role as AppRole | undefined) ?? null;
}
