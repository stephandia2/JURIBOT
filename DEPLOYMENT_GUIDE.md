# Guide de Déploiement JURIBOT sur VPS avec Docker

Ce guide vous explique étape par étape comment déployer votre application JURIBOT sur votre serveur VPS en utilisant Docker.

## Prérequis

1.  Un **VPS** (Debian/Ubuntu recommandé).
2.  Un **Nom de domaine** pointant vers l'IP de votre VPS (ex: `app.juribot.com`).
3.  **Accès SSH** à votre VPS.
4.  **Docker** et **Docker Compose** installés sur votre VPS.

## 1. Préparer le VPS (Si ce n'est pas déjà fait)

Connectez-vous à votre VPS :

```bash
ssh user@votre-ip-vps
```

Installez Docker et Docker Compose :

```bash
# Mise à jour
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter l'utilisateur courant au groupe docker (pour éviter sudo à chaque fois)
sudo usermod -aG docker $USER
newgrp docker
```

## 2. Transférer les fichiers sur le VPS

Vous devez envoyer les fichiers de votre projet sur le VPS. Vous pouvez utiliser `git` (recommandé) ou `scp`/`rsync`.

### Méthode Git (Recommandée)

Sur le VPS :

```bash
# Clonez votre repo (remplacez l'URL par la vôtre)
git clone https://github.com/votre-username/juribot.git
cd juribot
```

### Méthode Manuelle (SCP)

Si vous n'utilisez pas Git, copiez les fichiers depuis votre ordinateur :

```bash
# Depuis votre ordinateur local
scp -r ./* user@votre-ip-vps:~/juribot/
```

## 3. Configuration de l'environnement

Sur le VPS, dans le dossier `juribot`, créez ou modifiez votre fichier `.env.local` (ou `.env.production`) avec vos clés de production.

```bash
nano .env.local
```

Collez vos variables d'environnement (Supabase, etc.) :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
```

_Note : Assurez-vous que ces variables sont également passées au conteneur si elles sont requises au build time, ou utilisez `docker-compose.yml` pour les injecter._

## 4. Lancer l'Application avec Docker Compose

L'application est configurée pour écouter sur le port `3000`.

```bash
docker compose up -d --build
```

- `up` : Démarre les conteneurs.
- `-d` : Mode "détaché" (en arrière-plan).
- `--build` : Force la reconstruction de l'image (utile lors des mises à jour).

Vérifiez que tout tourne bien :

```bash
docker compose logs -f
```

À ce stade, votre application est accessible via `http://VOTRE_IP_VPS:3000`.

## 5. Configuration Nginx & HTTPS (Reverse Proxy)

Pour accéder à votre site via votre nom de domaine (ex: `juribot.com`) et en HTTPS, utilisez Nginx.

### Installer Nginx

```bash
sudo apt install nginx -y
```

### Configurer le site

Créez un fichier de conf Nginx :

```bash
sudo nano /etc/nginx/sites-available/juribot
```

Collez ceci (remplacez `votredomaine.com` par votre vrai domaine) :

```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activez le site :

```bash
sudo ln -s /etc/nginx/sites-available/juribot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Activer HTTPS avec Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com
```

Suivez les instructions. Certbot va configurer le HTTPS automatiquement.

## 6. Mettre à jour l'application

Quand vous faites des modifications sur votre code :

1.  Poussez les modifs sur Git : `git push`
2.  Sur le VPS, récupérez les modifs : `git pull`
3.  Reconstruisez le conteneur :
    ```bash
    docker compose up -d --build
    ```
