# JurisBot v2 - Spécifications Techniques

**Projet** : SaaS de Curation Juridique & Automatisation LinkedIn
**Version** : 2.0 (Architecture "No-Code Core, Full-Code Power")
**Date** : 11 Décembre 2025

---

## 🏗️ Architecture Globale

L'architecture repose sur un couplage fort entre **Supabase (Data & Auth)**, **Next.js (Frontend & API)** et **n8n (Orchestration & AI)**.

```mermaid
flowchart TB
    subgraph Frontend["🖥️ Frontend (Next.js - VPS)"]
        UI[Next.js App Router (TypeScript)]
        API[API Routes (Auth Callback)]
    end

    subgraph Supabase["☁️ Supabase"]
        DB[(PostgreSQL)]
        Auth[Supabase Auth]
        Vault[🔐 Vault (Secrets)]
        RLS[Row Level Security]
    end

    subgraph N8N["⚙️ n8n (VPS Docker)"]
        Cron[⏰ Cron 8h00]
        Scraper[📰 Scraping HTTP]
        LLM[🤖 Gemini API]
    end

    UI --> Auth
    Auth --> DB
    UI --> DB
    DB --> Vault
    Cron --> DB
    
    DB --> Scraper
    Scraper --> LLM
    LLM --> DB
```

---

## 🛠️ Stack Technique

| Composant | Technologie | Rôle |
|-----------|-------------|------|
| **Frontend** | **Next.js 14+ (App Router)** | Interface utilisateur réactive, SSR. |
| **Langage** | **TypeScript** | Robustesse et typage E2E avec Supabase. |
| **UI Library** | **Shadcn UI + Tailwind** | Design system pro et rapide. |
| **Database** | **Supabase (PostgreSQL)** | Stockage relationnel, RLS, Realtime. |
| **Auth** | **Supabase Auth** | Gestion utilisateurs (Email/Password). |
| **Secrets** | **Supabase Vault** | Stockage chiffré des tokens LinkedIn. |
| **Orchestrator** | **n8n (Self-hosted)** | Logique métier, Scraping, IA. |
| **AI Model** | **Google Gemini** | Génération de résumés et posts LinkedIn. |
| **Deploy** | **VPS Docker + Traefik** | Hébergement unifié (Frontend + n8n). |

---

## 🗄️ Schéma de Base de Données

### `public.profiles`
Extension de la table `auth.users`.
- `id` (UUID, PK, FK auth.users)
- `full_name` (Text)
- `avatar_url` (Text)
- `linkedin_user_id` (Text)
- `created_at` / `updated_at`

### `public.sources`
Flux à surveiller.
- `id` (UUID, PK)
- `user_id` (UUID, FK profiles)
- `name` (Text)
- `url` (Text)
- `source_type` (Enum: 'rss', 'website')
- `is_active` (Boolean)
- `last_checked_at` (Timestamp)

### `public.articles`
Contenu curé et généré.
- `id` (UUID, PK)
- `user_id` (UUID, FK profiles)
- `source_id` (UUID, FK sources)
- `source_url` (Text)
- `title` (Text)
- `original_content` (Text)
- `linkedin_draft` (Text) - **Généré par Gemini**
- `status` (Enum: 'to_process', 'processing', 'draft_ready', 'approved', 'published', 'error')
- `error_message` (Text)

---

## 🔒 Sécurité & Tokens

### LinkedIn OAuth
Le flux OAuth 2.0 est géré par **Next.js API Routes** pour sécuriser le `client_secret`.
1. User clique "Connecter LinkedIn".
2. Redirection vers LinkedIn Auth.
3. Callback vers `/api/auth/linkedin/callback`.
4. Échange Code → Tokens.
5. Stockage des tokens dans **Supabase Vault** via fonction RPC `store_linkedin_tokens`.

### RLS (Row Level Security)
Toutes les tables ont RLS activé.
- `auth.uid() = user_id` : Un utilisateur ne voit et ne modifie que SES données.

---

## 🚀 Stratégie de Déploiement

Déploiement sur VPS via Docker Compose, derrière Traefik (déjà en place sur le VPS).

```yaml
# docker-compose.yml
services:
  jurisbot-frontend:
    build: .
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=...
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=...
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.jurisbot.rule=Host(`jurisbot.ton-domaine.com`)"
```
