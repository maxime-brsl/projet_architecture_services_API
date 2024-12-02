# Utilisation de Node.js comme base
FROM node:16

# Définir le répertoire de travail dans le container (le dossier de la Gateway)
WORKDIR /server

# Copier le package.json et package-lock.json depuis la racine du projet
COPY ../package*.json ./

# Installer les dépendances globales du projet
RUN npm install --legacy-peer-deps

# Copier le code source spécifique à la Gateway dans le répertoire de travail
COPY . .

# Exposer le port 3000 sur lequel l'application tournera
EXPOSE 3000

# Lancer l'application Gateway
CMD ["node", "server.js"]
