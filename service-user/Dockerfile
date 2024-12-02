# Utilisation de Node.js comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le reste du code source
COPY . .

# Exposer le port
EXPOSE 3001

# Lancer le serveur
CMD ["node", "server.js"]
