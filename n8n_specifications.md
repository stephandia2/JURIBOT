# JurisBot v2 - Spécifications Techniques n8n & Automatisation

Ce document détaille l'ensemble des workflows d'automatisation n8n nécessaires pour supporter les fonctionnalités de JurisBot v2 (Veille, Édition Studio, Notification).

## 1. Liste des Workflows (n8n)

Nous aurons besoin de 2 Workflows distincts pour séparer la logique de veille (batch quotidien) de la logique de création (à la demande).

### 🔄 Workflow 1 : "Daily Digest & Veille" (Quotidien)
*   **Objectif** : Scanner les sources, résumer les nouveaux articles, et notifier l'utilisateur par email pour qu'il commence sa journée.
*   **Fréquence** : Tous les jours à 7h00 (Cron).

### 🔄 Workflow 2 : "Studio Création" (À la demande)
*   **Objectif** : Générer le contenu final (Post LinkedIn + Média) lorsque l'utilisateur le demande depuis l'interface "Studio".
*   **Déclencheur** : Webhook (Appel API depuis le Frontend Next.js).

---

## 2. Détail Technique des Workflows

### 🔄 Workflow 1 : "Daily Digest & Veille"

#### 1. Déclencheur (Trigger)
*   **Type** : `Schedule Trigger` (Cron).
*   **Expression** : `0 7 * * *` (Tous les jours à 7h00).

#### 2. Récupération & Scraping
*   **Supabase** : `SELECT url FROM sources WHERE is_active = true`.
*   **Loop (Boucle)** : Pour chaque URL.
    *   **HTTP Request / RSS Read** : Récupération du flux.
    *   **Dédoublonnage** : Vérification vs table `articles` (si URL existe déjà).
    *   **Scraping** : Extraction titre/contenu (si nouvel article).

#### 3. Enrichissement Léger (Gemini)
*   **Prompt** : "Fais un résumé très court (1 phrase) de cet article juridique."
*   **Output** : Résumé stocké dans l'objet.

#### 4. Notification (Email Digest)
*   **Agrégation** : Regrouper tous les nouveaux articles du jour.
*   **Email Send** (Gmail ou SMTP) :
    *   **Sujet** : "⚖️ Votre Veille Juridique du [Date]"
    *   **Corps** : Liste des articles avec Titre + Résumé court + Lien "Traiter dans JurisBot".

---

### 🔄 Workflow 2 : "Studio Création"

Ce workflow est appelé quand l'utilisateur clique sur "Générer Post" ou "Générer Média".

#### 1. webhook (Entrée)
*   **Méthode** : POST
*   **Payload attendu** :
    ```json
    {
      "action": "draft_post" | "generate_media",
      "article_content": "...",
      "tone": "Professionnel" | "Humoristique" | "Polémique",
      "media_type": "image" | "carousel",
      "prompt_media": "Marteau de justice..."
    }
    ```

#### 2. Branchement (Switch)

**Branche A : Rédaction Post (Action: `draft_post`)**
*   **Gemini Node** :
    *   **Prompt** : "Rédige un post LinkedIn sur ce sujet : [Article]. Ton : [Tone]. Structure : Accroche virale, Corps structuré, 3 Hashtags."
*   **Response** : Renvoie le texte généré au Frontend.

**Branche B : Média (Action: `generate_media`)**
*   **Si Type = Image** :
    *   **Banana.dev / Gemini Nano** : Génération de l'image (1024x1024).
    *   **Response** : URL de l'image.
*   **Si Type = Carrousel** :
    *   **Banana.dev** : Génération de 5 images séquentielles (Slide 1 à 5).
    *   **PDF Merge (Community Node)** : Fusion des 5 images en un fichier PDF unique.
    *   **Upload** : Stockage du PDF sur Supabase Storage.
    *   **Response** : URL du PDF.

---

## 3. Configuration Requise (Credentials)

Pour que ces workflows fonctionnent, l'utilisateur devra configurer dans n8n :
1.  **Supabase** : URL + Service Role Key.
2.  **Google Gemini** : API Key.
3.  **Banana.dev** : API Key (pour la génération d'images).
4.  **Email** : Configuration SMTP ou Gmail OAuth.
