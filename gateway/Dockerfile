# Utilisation de Node.js comme base
FROM node:16

# Définir le répertoire de travail dans le container (le dossier de la Gateway)
WORKDIR /server

COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source spécifique à la Gateway dans le répertoire de travail
COPY . .

# Exposer le port 3000 sur lequel l'application tournera
EXPOSE 3000

# Lancer l'application Gateway
CMD ["node", "server.js"]
