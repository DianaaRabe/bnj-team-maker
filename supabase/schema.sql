-- ═══════════════════════════════════════════════════════════════════
--  BNJ Team Maker — Schéma CMS (blog + podcasts + commentaires)
--  À exécuter dans Supabase : Dashboard → SQL Editor → New query → Run
--  Ré-exécutable sans risque (idempotent).
-- ═══════════════════════════════════════════════════════════════════

-- ─── Table : articles de blog ───
create table if not exists public.blog_posts (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text not null unique,
  summary           text default '',           -- résumé court (carte + meta description)
  content           text default '',           -- HTML produit par l'éditeur riche (Tiptap)
  featured_image    text default '',           -- image de couverture (Cloudinary)
  linkedin_url      text default '',
  category          text default '',           -- champ libre (une catégorie)
  tags              text[] not null default '{}',
  status            text not null default 'draft' check (status in ('draft', 'published')),
  read_time_minutes int  not null default 1,
  views_count       int  not null default 0,
  author_email      text default '',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  published_at      timestamptz
);

-- Migration douce si la table existait déjà avec l'ancien schéma (sûr sur base neuve) :
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='blog_posts' and column_name='excerpt') then
    alter table public.blog_posts rename column excerpt to summary;
  end if;
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='blog_posts' and column_name='body_html') then
    alter table public.blog_posts rename column body_html to content;
  end if;
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='blog_posts' and column_name='thumbnail_url') then
    alter table public.blog_posts rename column thumbnail_url to featured_image;
  end if;
end $$;
alter table public.blog_posts add column if not exists category          text default '';
alter table public.blog_posts add column if not exists tags              text[] not null default '{}';
alter table public.blog_posts add column if not exists read_time_minutes int  not null default 1;
alter table public.blog_posts add column if not exists views_count       int  not null default 0;

-- ─── CMS éditorial : SEO, Open Graph, images, planification ───
alter table public.blog_posts add column if not exists meta_title          text default '';
alter table public.blog_posts add column if not exists meta_description    text default '';
alter table public.blog_posts add column if not exists canonical_url       text default '';
alter table public.blog_posts add column if not exists focus_keyword       text default '';
alter table public.blog_posts add column if not exists secondary_keywords  text[] not null default '{}';
alter table public.blog_posts add column if not exists robots_index        boolean not null default true;
alter table public.blog_posts add column if not exists robots_follow       boolean not null default true;
alter table public.blog_posts add column if not exists cover_alt           text default '';      -- ALT image de couverture (obligatoire à la publication)
alter table public.blog_posts add column if not exists cover_caption       text default '';      -- légende affichée sous la couverture
alter table public.blog_posts add column if not exists cover_credit        text default '';      -- crédit / source de l'image de couverture
alter table public.blog_posts add column if not exists og_title            text default '';
alter table public.blog_posts add column if not exists og_description      text default '';
alter table public.blog_posts add column if not exists og_image            text default '';
alter table public.blog_posts add column if not exists twitter_title       text default '';
alter table public.blog_posts add column if not exists twitter_description text default '';
alter table public.blog_posts add column if not exists twitter_card        text default 'summary_large_image';
alter table public.blog_posts add column if not exists internal_links      jsonb not null default '[]'::jsonb;  -- [{title,slug,anchor}]
alter table public.blog_posts add column if not exists word_count          int  not null default 0;
alter table public.blog_posts add column if not exists seo_score           int  not null default 0;
alter table public.blog_posts add column if not exists scheduled_at        timestamptz;          -- date de publication programmée (statut 'scheduled')

-- Statut : autorise désormais 'scheduled' (publication programmée).
do $$
begin
  alter table public.blog_posts drop constraint if exists blog_posts_status_check;
  alter table public.blog_posts add constraint blog_posts_status_check
    check (status in ('draft', 'published', 'scheduled'));
end $$;

-- ─── Table : podcasts (simplifiée : pas d'upload de média lourd) ───
create table if not exists public.podcasts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text default '',               -- HTML produit par l'éditeur riche
  thumbnail_url text default '',               -- miniature = couverture de la carte (Cloudinary)
  linkedin_url  text not null default '',      -- obligatoire côté formulaire (la carte mène au post)
  status        text not null default 'draft' check (status in ('draft', 'published')),
  author_email  text default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz
);

do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='podcasts' and column_name='description_html') then
    alter table public.podcasts rename column description_html to description;
  end if;
end $$;
alter table public.podcasts add column if not exists description text default '';
alter table public.podcasts drop column if exists media_url;

-- ─── Table : commentaires (scaffolding ; alimentée plus tard par le site public) ───
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid not null references public.blog_posts (id) on delete cascade,
  user_name    text not null default '',
  avatar_url   text default '',
  comment_text text not null default '',
  created_at   timestamptz not null default now()
);
create index if not exists idx_comments_post on public.comments (post_id, created_at);

-- ─── Tient updated_at à jour automatiquement ───
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_blog_touch on public.blog_posts;
create trigger trg_blog_touch before update on public.blog_posts
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_podcast_touch on public.podcasts;
create trigger trg_podcast_touch before update on public.podcasts
  for each row execute function public.touch_updated_at();

-- ─── Incrément des vues (appelé par l'API publique, sans authentification) ───
create or replace function public.increment_post_views(p_slug text)
returns void language sql security definer set search_path = public as $$
  update public.blog_posts
     set views_count = views_count + 1
   where slug = p_slug and status = 'published';
$$;
grant execute on function public.increment_post_views(text) to anon, authenticated;

-- ─── Index pour les lectures publiques (contenu publié, plus récent d'abord) ───
create index if not exists idx_blog_published on public.blog_posts (status, published_at desc);
create index if not exists idx_podcasts_published on public.podcasts (status, published_at desc);

-- ═══════════════════════════════════════════════════════════════════
--  Row Level Security
--  - anon : LECTURE du contenu PUBLIÉ + lecture des commentaires
--  - authenticated (rédacteur) : accès complet
-- ═══════════════════════════════════════════════════════════════════
alter table public.blog_posts enable row level security;
alter table public.podcasts   enable row level security;
alter table public.comments   enable row level security;

drop policy if exists "public read published blog" on public.blog_posts;
create policy "public read published blog" on public.blog_posts
  for select using (status = 'published');

drop policy if exists "public read published podcasts" on public.podcasts;
create policy "public read published podcasts" on public.podcasts
  for select using (status = 'published');

drop policy if exists "public read comments" on public.comments;
create policy "public read comments" on public.comments
  for select using (true);

drop policy if exists "authenticated full blog" on public.blog_posts;
create policy "authenticated full blog" on public.blog_posts
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full podcasts" on public.podcasts;
create policy "authenticated full podcasts" on public.podcasts
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated full comments" on public.comments;
create policy "authenticated full comments" on public.comments
  for all to authenticated using (true) with check (true);

-- ═══════════════════════════════════════════════════════════════════
--  RBAC : rôles admin / seo / podcast (table profiles)
--  - admin   : tout (blog + podcasts + gestion des rôles)
--  - seo     : édition du blog
--  - podcast : édition des podcasts
--  Le domaine @bnjteammaker.fr est imposé À LA CRÉATION de compte (trigger).
--  Les comptes EXISTANTS sont backfillés en 'admin' (anti-lockout).
-- ═══════════════════════════════════════════════════════════════════
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  role       text not null default 'seo' check (role in ('admin', 'seo', 'podcast')),
  created_at timestamptz not null default now()
);

-- Rôle de l'utilisateur courant. SECURITY DEFINER → contourne la RLS de
-- profiles (évite toute récursion dans les policies qui l'appellent).
create or replace function public.app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- Provision automatique d'un profil à l'inscription, UNIQUEMENT pour les
-- adresses @bnjteammaker.fr (les autres n'obtiennent aucun profil → aucun accès).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email ilike '%@bnjteammaker.fr' then
    insert into public.profiles (id, email, role)
    values (new.id, new.email, 'seo')
    on conflict (id) do nothing;
  end if;
  return new;
end
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill anti-lockout : tous les comptes déjà existants deviennent admin.
insert into public.profiles (id, email, role)
select id, email, 'admin' from auth.users
on conflict (id) do nothing;

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated
  using (auth.uid() = id or public.app_role() = 'admin');

drop policy if exists "admin manage profiles" on public.profiles;
create policy "admin manage profiles" on public.profiles
  for all to authenticated
  using (public.app_role() = 'admin')
  with check (public.app_role() = 'admin');

-- ─── Écritures restreintes par rôle (remplacent « authenticated full ») ───
drop policy if exists "authenticated full blog" on public.blog_posts;
drop policy if exists "role write blog" on public.blog_posts;
create policy "role write blog" on public.blog_posts
  for all to authenticated
  using (public.app_role() in ('admin', 'seo'))
  with check (public.app_role() in ('admin', 'seo'));

drop policy if exists "authenticated full podcasts" on public.podcasts;
drop policy if exists "role write podcasts" on public.podcasts;
create policy "role write podcasts" on public.podcasts
  for all to authenticated
  using (public.app_role() in ('admin', 'podcast'))
  with check (public.app_role() in ('admin', 'podcast'));

-- Modération des commentaires : admin uniquement.
drop policy if exists "authenticated full comments" on public.comments;
drop policy if exists "admin manage comments" on public.comments;
create policy "admin manage comments" on public.comments
  for all to authenticated
  using (public.app_role() = 'admin')
  with check (public.app_role() = 'admin');

-- ═══════════════════════════════════════════════════════════════════
--  Comptes : crée tes utilisateurs depuis le Dashboard Supabase
--  Authentication → Users → Add user (email + mot de passe, « Auto Confirm »)
--  Garde le provider Email ACTIVÉ, mais désactive « Allow new users to sign up ».
--  Les comptes hors @bnjteammaker.fr n'obtiennent aucun profil (aucun accès) ;
--  ajuste les rôles dans la table public.profiles (role = admin/seo/podcast).
-- ═══════════════════════════════════════════════════════════════════
