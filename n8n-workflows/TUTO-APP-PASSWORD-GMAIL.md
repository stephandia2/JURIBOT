# 🔐 Tutoriel : Créer un App Password Gmail pour n8n

## Prérequis
- Un compte Gmail
- Accès à un téléphone (pour la vérification en 2 étapes)

---

## Étape 1 : Activer la Vérification en 2 Étapes

> ⚠️ **Obligatoire** : Sans cette étape, tu ne pourras pas créer d'App Password !

1. **Ouvre ce lien** : [myaccount.google.com/security](https://myaccount.google.com/security)

2. **Connecte-toi** avec ton compte Gmail

3. **Trouve la section** "Comment vous connecter à Google"

4. **Clique sur** "Validation en deux étapes"

5. **Clique sur** "Commencer"

6. **Entre ton numéro de téléphone** et choisis SMS ou Appel

7. **Entre le code** reçu par SMS

8. **Clique sur** "Activer"

✅ **Fait !** Tu as maintenant la 2FA activée.

---

## Étape 2 : Créer le Mot de Passe d'Application

1. **Ouvre ce lien** : [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

2. **Connecte-toi** si demandé (peut demander ton mot de passe + code 2FA)

3. **Tu verras** la page "Mots de passe des applications"

4. **Dans le champ** "Nom de l'application", tape :
   ```
   n8n JurisBot
   ```

5. **Clique sur** "Créer"

6. **COPIE LE MOT DE PASSE** affiché (16 caractères, format : `xxxx xxxx xxxx xxxx`)

> 🚨 **IMPORTANT** : Ce mot de passe ne sera affiché qu'UNE SEULE FOIS !
> Note-le immédiatement dans un endroit sécurisé.

7. **Clique sur** "OK" pour fermer

---

## Étape 3 : Configurer dans n8n

1. **Va dans n8n** → Menu → **Credentials**

2. **Clique sur** "Add Credential"

3. **Cherche** "SMTP" et sélectionne-le

4. **Remplis les champs** :

| Champ | Valeur |
|-------|--------|
| **Credential Name** | `Gmail JurisBot` |
| **User** | `ton.email@gmail.com` |
| **Password** | Le mot de passe de 16 caractères (sans espaces) |
| **Host** | `smtp.gmail.com` |
| **Port** | `465` |
| **SSL/TLS** | ✅ Activé |

5. **Clique sur** "Test Connection" (facultatif mais recommandé)

6. **Clique sur** "Save"

---

## ✅ Terminé !

Tu peux maintenant utiliser Gmail pour envoyer des emails depuis n8n.

**Dis-moi "OK" quand c'est fait et on continue avec la génération des workflows JSON !**
