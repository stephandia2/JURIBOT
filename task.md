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

## 🛠️ Phase 3.5 : Améliorations & Localisation
- [x] **Internationalisation (i18n)** :
  - [x] Mettre en place le contexte de langue (Français/Anglais)
  - [x] Traduire les composants clés (Sidebar, Settings, etc.)
- [x] **Correctifs UI/UX** :
  - [x] `AccountDetails` : Afficher l'email depuis Auth (lecture seule)
  - [x] `AccountDetails` : Remplacer "Région/État" par "Ville"
  - [x] **RLS** : Corriger les politiques `public.profiles` pour l'update

## 🌟 Phase 4 : Nouvelles Fonctionnalités UI/UX
- [x] **Menu & Navigation** :
  - [x] Refondre la Sidebar (Sections: Veille, Éditeur, Outils, Config)
  - [x] Ajouter l'icône "Cloche" (Notifications) dans le Header
- [x] **Studio Editeur** (Nouvelle Page) :
  - [x] Split View : Resume IA (Gauche) vs Preview LinkedIn (Droite)
  - [x] Integration Editor : Choix du Ton (Pro/Fun...), Reformuler, Copier
  - [x] Planification : DatePicker + Suggestions
- [/] **Outils Avances** :
  - [x] Page "Archives" (tableau avec filtres)
  - [ ] Page "Statistiques LinkedIn" (Mockup ou Connecteur API)
  - [ ] Page "Moyen de Paiement / Billing" (Si requis plus tard)

## ⚙️ Phase 5 : Backend & Automatisation (n8n)
- [ ] **Setup n8n** : 
  - [ ] Déployer n8n (Docker)
  - [ ] Configurer les Credentials (Supabase, Google Gemini, Banana.dev)
- [ ] **Workflow 1 (Daily Digest)** :
  - [ ] Trigger (Cron 7h) -> Scraping -> Gemini Summary -> Email Send
- [ ] **Workflow 2 (Studio Média)** :
  - [ ] Webhook : Réception prompt image + Ton
  - [ ] Generation : Banana (Images) -> Merge PDF Node (Carrousel)
  - [ ] Callback : Mise à jour Supabase (`media_assets`)

## 🚀 Phase 6 : Déploiement
- [ ] **Docker** : Créer `Dockerfile` optimisé pour Next.js
- [ ] **VPS** : Configurer `docker-compose.yml` avec Traefik
- [ ] **Production** : Build & Deploy
