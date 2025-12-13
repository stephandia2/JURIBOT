# JurisBot v2 - Plan d'Action Tâches

**Projet Supabase** : `JURIBOT` (kcoslhkhxuugknjcpwzi)

## 📌 Phase 1 : Initialisation & Setup
- [x] Initialiser le Workspace (fichiers template copiés)
- [x] **Dépendances** : Installer les paquets (`npm install`)
- [x] **Environment** : Configurer `.env.local` avec URL/Keys Supabase
- [x] **Nettoyage** : Supprimer les fichiers démo inutiles du template

## 🗄️ Phase 2 : Base de Données (Supabase)
- [x] **Migrations SQL** : Créer les tables (`profiles`, `sources`, `articles`)
- [x] **Sécurité** : Appliquer les politiques RLS
- [x] **Types** : Générer les types TypeScript (`supabase gen types`)

## 🖥️ Phase 3 : Frontend (Next.js)
- [x] **Auth** : Configurer Supabase Auth (Login/Register/Logout)
- [x] **Dashboard** : Créer le layout avec Sidebar
  - [x] Pages utilisateur : Profil, Paramètres, Tarifs, FAQ
  - [x] Menu utilisateur : Avatar sync, Logout
- [x] **Gestion Sources** : Page pour ajouter/lister les URL RSS
- [x] **Flux Articles** :
  - [x] Page "À traiter" (Status: to_process)
  - [x] Page "Brouillons" (Status: draft_ready) avec Éditeur
  - [x] Action "Valider / Publier"

## ⚙️ Phase 4 : Backend Orchestration (n8n)
- [ ] **Workflow Scraping** : HTTP Request sur `sources`
- [ ] **Workflow IA** : Connecter Gemini pour résumer/drafter
- [ ] **Boucle** : Mettre à jour Supabase (`draft_ready`)

## 🚀 Phase 5 : Déploiement
- [ ] **Docker** : Créer `Dockerfile` optimisé pour Next.js
- [ ] **VPS** : Configurer `docker-compose.yml` avec Traefik
- [ ] **Production** : Build & Deploy
