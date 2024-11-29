# Étape 1 : Utiliser une image officielle Node.js
FROM node:16

# Étape 2 : Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du code source
COPY . .

# Étape 6 : Exposer le port utilisé par l'application
EXPOSE 3001

# Étape 7 : Commande pour lancer l'application
CMD ["node", "app.js"]
