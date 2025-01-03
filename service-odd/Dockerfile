# Utilisation de Node.js comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source
COPY . .

# Exposer le port
EXPOSE 3002

# Lancer le serveur
CMD ["node", "app.js"]