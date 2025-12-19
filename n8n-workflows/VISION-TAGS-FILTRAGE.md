# 🎯 Vision : Système de Tags & Mots-Clés Personnalisés

## 🤔 Le Problème à Résoudre

Tu veux que chaque utilisateur puisse :
1. **Choisir ses thèmes** (ex: "Droit du travail", "Droit fiscal")
2. **Définir ses mots-clés** (ex: "contrat", "licenciement", "TVA")
3. **Recevoir uniquement les articles** qui correspondent à ses choix

---

## 💡 Ma Proposition : 2 Niveaux de Filtrage

```
┌─────────────────────────────────────────────────────────────────────┐
│                     NIVEAU 1 : LES SOURCES                          │
│  L'utilisateur choisit SES sources RSS (sites web qu'il suit)       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Exemple: Marie a configuré 3 sources                               │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │ Legifrance  │  │ Dalloz      │  │  URSSAF     │                 │
│  │ (actif ✅)   │  │ (actif ✅)   │  │ (inactif ❌)│                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
│  → n8n récupère uniquement Legifrance + Dalloz                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     NIVEAU 2 : LES TAGS & MOTS-CLÉS                 │
│  L'IA analyse chaque article et le classe par thème                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Article récupéré : "Nouvelle jurisprudence sur les congés payés"   │
│                                                                     │
│  🤖 Gemini analyse → Tag détecté: "Droit du travail"               │
│                                                                     │
│  Marie a configuré ses tags préférés:                               │
│  ┌───────────────────┐  ┌───────────────────┐                      │
│  │ ✅ Droit du travail│  │ ❌ Droit fiscal    │                      │
│  └───────────────────┘  └───────────────────┘                      │
│                                                                     │
│  → L'article "congés payés" MATCH ✅ → Visible pour Marie          │
│  → Un article sur la TVA NE MATCH PAS ❌ → Pas visible             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Structure de la Base de Données

Je propose d'ajouter 2 tables :

### Table 1 : `tags` (Liste globale des tags disponibles)
| id | name | color |
|----|------|-------|
| 1 | Droit du travail | #3B82F6 |
| 2 | Droit fiscal | #10B981 |
| 3 | Droit des sociétés | #F59E0B |
| 4 | Droit pénal | #EF4444 |

### Table 2 : `user_tags` (Tags choisis par chaque utilisateur)
| user_id | tag_id | keywords |
|---------|--------|----------|
| user-marie | 1 | ["contrat", "licenciement", "CDI"] |
| user-marie | 3 | ["SARL", "statuts"] |
| user-jean | 2 | ["TVA", "impôts", "plus-value"] |

### Modification : `articles` (ajout du tag détecté)
| id | title | ... | detected_tag_id |
|----|-------|-----|-----------------|
| a1 | Congés payés... | ... | 1 (Droit travail) |
| a2 | TVA immobilière | ... | 2 (Droit fiscal) |

---

## 🔄 Le Nouveau Flux de Veille

```
1️⃣ n8n récupère les articles RSS
           │
           ▼
2️⃣ Gemini ANALYSE chaque article
   → Détecte le TAG principal
   → Extrait les mots-clés
           │
           ▼
3️⃣ FILTRE : L'article correspond aux préférences de l'utilisateur ?
   → Vérifie si le tag détecté est dans user_tags
   → Vérifie si des mots-clés matchent
           │
      ┌────┴────┐
      │         │
    MATCH    NO MATCH
      │         │
      ▼         ▼
4️⃣ INSERT    IGNORÉ
   visible    pas stocké
```

---

## ❓ Questions pour Affiner

1. **Qui crée les tags ?**
   - [ ] Toi (admin) → liste fixe de tags prédéfinis
   - [ ] Les utilisateurs → chacun crée ses propres tags
   - [ ] Les deux → tags par défaut + possibilité d'en créer

2. **Mots-clés : obligatoires ou optionnels ?**
   - [ ] Chaque tag DOIT avoir des mots-clés associés
   - [ ] Les mots-clés sont optionnels (le tag suffit)

3. **Que faire si un article ne match aucun tag ?**
   - [ ] L'ignorer (pas stocké)
   - [ ] Le stocker avec tag "Autre" ou "Non classé"
   - [ ] Le montrer quand même à l'utilisateur (catégorie "Divers")

---

**Réponds à ces 3 questions et je mets à jour le plan final !**
