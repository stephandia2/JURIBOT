# JurisBot v2 - Plan d'Implémentation Phase 3.5
**Objectif** : Fiabiliser l'expérience utilisateur (Correctifs) et préparer l'internationalisation (i18n).

## 1. Correctifs "AccountDetails" & RLS
### Problème
- L'email ne s'affiche pas dans le formulaire de profil car il réside dans `auth.users` et non `public.profiles`.
- La mise à jour du profil échoue souvent à cause de politiques RLS trop restrictives sur `public.profiles`.
- Le champ "Région/État" est inadapté, besoin de "Ville".

### Solution Technique
#### A. Affichage Email
- Récupérer l'objet `user` complet de `useAuth` (ou `supabase.auth.getUser()`).
- Passer cet email au composant `AccountDetails` ou le récupérer via un hook.
- Afficher le champ Email en `readOnly` et `disabled`.

#### B. RLS Policies (`public.profiles`)
Mettre à jour la politique PostgreSQL pour permettre l'update à l'utilisateur lui-même :
```sql
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);
```

#### C. Champs Formulaire
- Renommer le label "State/Region" en "Ville".
- S'assurer que le champ mappe vers `city` ou une colonne JSON appropriée dans la DB.

## 2. Internationalisation (i18n)
### Objectif
Permettre le switch Français 🇫🇷 / Anglais 🇬🇧.

### Architecture Technique
1. **Dictionnaires de traduction** :
   - Créer `src/i18n/locales/fr.ts` et `en.ts`.
   - Structure JSON : `{ sidebar: { dashboard: "Tableau de bord" }, account: { ... } }`

2. **Context Provider** :
   - Créer `LanguageContext.tsx`
   - État global `language` ('fr' | 'en').
   - Persistance dans `localStorage`.

3. **Custom Hook `useLanguage`** :
   - Expose la fonction `t(key)` pour traduire les textes.

### Étapes d'Implémentation
1.  Créer la structure de fichiers i18n.
2.  Implémenter le Provider et le Hook.
3.  Wrapper l'application (`_app.tsx` ou `layout.tsx`) avec `LanguageProvider`.
4.  Remplacer les textes "en dur" par `{t('key')}` dans :
    - `Sidebar` (Menu de gauche)
    - `AccountDetails` (Formulaires)

## 3. Plan de Vérification
### Vérification Manuelle
1.  **Login** : Se connecter avec un compte existant.
2.  **Profil** : Aller sur `/account-settings`.
    - Vérifier que l'email est visible et grisé.
    - Modifier "Nom" et "Ville" -> "Sauvegarder". -> Vérifier "Saved successfully" toast.
    - Recharger la page -> Vérifier persistence.
3.  **Langue** :
    - Changer un selector de langue (à créer dans le Header ou Settings).
    - Vérifier que le menu change instantanément de "Dashboard" à "Tableau de bord".
