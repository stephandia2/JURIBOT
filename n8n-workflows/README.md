# 🚀 Guide d'Installation n8n - JurisBot

## 📁 Fichiers de Workflows

| Fichier | Description |
|---------|-------------|
| `workflow-1-veille-quotidienne.json` | Veille automatique + email HTML |
| `workflow-2-generation-post.json` | Génération post LinkedIn via webhook |

---

## 🔧 Étape 1 : Configurer les Credentials n8n

### 1.1 Supabase
1. **n8n** → **Credentials** → **New**
2. Type : **Supabase**
3. Configuration :
   - **Host** : `https://kcoslhkhxuugknjcpwzi.supabase.co`
   - **Service Key** : (Dashboard Supabase → Settings → API → service_role)

### 1.2 Google Gemini
1. **New Credential** → **Google Gemini**
2. **API Key** : Votre clé Gemini

### 1.3 Gmail SMTP
1. **New Credential** → **SMTP**
2. Configuration :
   - **User** : `votre.email@gmail.com`
   - **Password** : App Password (16 caractères)
   - **Host** : `smtp.gmail.com`
   - **Port** : `465`
   - **SSL/TLS** : ✅ Activé

> 📖 Voir `TUTO-APP-PASSWORD-GMAIL.md` pour créer un App Password

---

## 📥 Étape 2 : Importer les Workflows

### Workflow 1 : Veille Quotidienne
1. **n8n** → **Workflows** → **Import from File**
2. Sélectionner : `workflow-1-veille-quotidienne.json`
3. **Remplacer** les credentials :
   - `VOTRE_CREDENTIAL_SUPABASE` → Votre credential Supabase
   - `VOTRE_CREDENTIAL_GEMINI` → Votre credential Gemini
   - `VOTRE_CREDENTIAL_GMAIL_SMTP` → Votre credential Gmail SMTP
4. **Activer** le workflow

### Workflow 2 : Génération de Post
1. Importer : `workflow-2-generation-post.json`
2. Mettre à jour les credentials
3. **Copier l'URL du Webhook** (clic sur le node Webhook)

---

## ✅ Étape 3 : Tests

### Test Workflow 1 (Veille)
1. Ajouter une source RSS active dans Supabase (table `sources`)
2. Configurer vos préférences (table `user_preferences`)
3. Cliquer **Execute Workflow** dans n8n
4. Vérifier :
   - [ ] Sources récupérées
   - [ ] Articles insérés dans table `articles`
   - [ ] Email reçu (si `email_digest_enabled = true`)

### Test Workflow 2 (Génération Post)
```bash
curl -X POST https://votre-n8n.com/webhook/generate-post \
  -H "Content-Type: application/json" \
  -d '{"article_id": "UUID_ARTICLE", "tone": "professionnel"}'
```

**Tons disponibles :**
- `professionnel` (défaut)
- `pedagogique`
- `humoristique`
- `polemique`

---

## 🗄️ Tables Supabase Créées

| Table | Description |
|-------|-------------|
| `tags` | Tags juridiques disponibles |
| `user_tags` | Tags choisis par utilisateur + mots-clés |

### Tags par défaut :
- Droit du travail
- Droit fiscal
- Droit des sociétés
- Droit pénal
- Droit civil
- Droit immobilier
- Droit de la famille
- Propriété intellectuelle
- Divers

---

## 📂 Autres Fichiers

- `TUTO-APP-PASSWORD-GMAIL.md` - Guide App Password Gmail
- `VISION-TAGS-FILTRAGE.md` - Documentation système de tags
- `DISCUSSION-N8N.md` - Notes de discussion
