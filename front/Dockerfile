# Utiliser une image Node.js
FROM node:20-alpine

# Définir le répertoire de travail dans le container
WORKDIR /src

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le container
COPY . .

# Exposer le port 4200
EXPOSE 4200

# Commande pour lancer le serveur Angular
CMD ["npm", "run", "start"]
