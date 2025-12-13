# 📘 JurisBot v2 - Tutoriel de Développement Pas à Pas

Ce guide t'accompagne dans la construction de l'application JurisBot.
**Stack** : Next.js (TypeScript), Supabase, n8n.

---

## 🏁 Étape 1 : Préparation de l'Environnement

### 1.1 Installation des dépendances
Dans ton terminal (dossier `JURIBOT`), lance :
```bash
npm install
```
Cela va installer Next.js, Shadcn UI, Supabase Client, etc.

### 1.2 Configuration Supabase
Crée un fichier `.env.local` à la racine :
```env
NEXT_PUBLIC_SUPABASE_URL=https://kcoslhkhxuugknjcpwzi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ton_anon_key_ici
```
*(Récupère la `anon_key` dans Supabase > Project Settings > API)*

---

## 🗄️ Étape 2 : Création de la Base de Données

Va dans l'éditeur SQL de Supabase et exécute ce script pour créer tes tables :

```sql
-- 1. Table PROFILES
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 2. Table SOURCES
create type source_type as enum ('rss', 'website');
create table public.sources (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  name text not null,
  url text not null,
  type source_type default 'rss',
  created_at timestamptz default now()
);
alter table sources enable row level security;
create policy "Users manage own sources" on sources for all using (auth.uid() = user_id);

-- 3. Table ARTICLES
create type article_status as enum ('to_process', 'draft_ready', 'published', 'error');
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  source_id uuid references public.sources(id),
  title text,
  original_content text,
  linkedin_draft text,
  status article_status default 'to_process',
  created_at timestamptz default now()
);
alter table articles enable row level security;
create policy "Users manage own articles" on articles for all using (auth.uid() = user_id);
```

---

## 🖥️ Étape 3 : Développement Frontend

### 3.1 Authentification
Utilise les composants du template (ou Shadcn) pour créer une page Login qui appelle :
```ts
const { error } = await supabase.auth.signInWithPassword({ email, password })
```

### 3.2 Page Sources
Crée `/app/dashboard/sources/page.tsx` :
- Un formulaire simple (Nom, URL) -> `supabase.from('sources').insert(...)`
- Une liste qui affiche les sources existantes -> `supabase.from('sources').select('*')`

### 3.3 Page Articles (Le Cœur)
Crée `/app/dashboard/articles/page.tsx` :
- Fetch les articles : `supabase.from('articles').select('*').order('created_at', { ascending: false })`
- **Affichage conditionnel** :
  - Si `status === 'to_process'` : Afficher un badge "En cours d'analyse..."
  - Si `status === 'draft_ready'` : Afficher le texte généré par Gemini dans un `Textarea`.
- **Action** : Bouton "Publier" qui change le status en `published` (ou envoie vers l'API LinkedIn en Phase 2).

---

## ⚙️ Étape 4 : Workflow n8n

1. **Trigger** : Cron (tous les matins) ou Webhook.
2. **Supabase Node** : "Get All Sources".
3. **HTTP Request** : Scrape l'URL de la source.
4. **Gemini Node** : "Résume ce texte pour un post LinkedIn professionnel...".
5. **Supabase Node** : Insert dans la table `articles` avec `status = 'draft_ready'` et le texte généré.

---

## 🚀 Étape 5 : Lancement

Pour tester en local :
```bash
npm run dev
```
Ouvre `http://localhost:3000`.

Bon code ! 🤓
