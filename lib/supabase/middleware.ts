import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
} from "./config";

export async function updateSession(request: NextRequest) {
  // Clés non renseignées : on laisse passer (l'app affiche un écran de config).
  if (!isSupabaseConfigured) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdmin = path.startsWith("/admin");
  const isLogin = path === "/admin/login";

  // Non connecté + zone admin (hors login) → redirige vers login
  if (isAdmin && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // RBAC : un utilisateur connecté doit avoir un profil (rôle). Sans profil
  // → accès refusé. Fail-open si la table profiles n'existe pas encore
  // (fenêtre de migration) : on ne bloque que lorsque la requête aboutit.
  let hasRole = true;
  if (isAdmin && user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (!error) hasRole = data?.role != null;
  }

  if (isAdmin && !isLogin && user && !hasRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "access");
    return NextResponse.redirect(url);
  }

  // Déjà connecté (avec rôle) + page login → redirige vers le dashboard
  if (isLogin && user && hasRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ─── Zone MLM (membres du réseau) : RBAC isolé du staff ───
  // Repose sur la table `users_profiles` (≠ `profiles`). La logique /admin
  // ci-dessus n'est jamais atteinte pour un chemin /mlm (isAdmin = false).
  const isMlm = path.startsWith("/mlm");
  const isMlmLogin = path === "/mlm/login";
  // Finalisation SSO : session requise, mais PAS encore de nœud réseau.
  const isMlmFinalize = path === "/mlm/join/finalize";
  // Pages MLM publiques (accessibles sans session) : login, inscription,
  // callback OAuth et pages légales (conditions, confidentialité).
  const isMlmPublic =
    isMlmLogin ||
    path === "/mlm/join" ||
    path === "/mlm/auth/callback" ||
    path.startsWith("/mlm/legal");

  // Non connecté + zone MLM (hors pages publiques) → redirige vers le login MLM.
  // La finalisation n'est pas publique : un visiteur sans session y est renvoyé
  // au login (puis reviendra après authentification).
  if (isMlm && !isMlmPublic && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/mlm/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Connecté : doit être membre provisionné du réseau. Fail-open si la table
  // n'existe pas encore (fenêtre de migration), comme pour /admin.
  let hasMlmRole = true;
  if (isMlm && user) {
    const { data, error } = await supabase
      .from("users_profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (!error) hasMlmRole = data?.role != null;
  }

  // Connecté mais pas encore rattaché (typiquement après un SSO Google, ou un
  // email confirmé sans parrain résolu) → on l'oriente vers la finalisation
  // plutôt que de le bloquer. Exception : s'il y est déjà (évite la boucle).
  if (isMlm && !isMlmPublic && !isMlmFinalize && user && !hasMlmRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/mlm/join/finalize";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Déjà membre connecté sur login ou finalisation → dashboard MLM.
  if ((isMlmLogin || isMlmFinalize) && user && hasMlmRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/mlm";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
