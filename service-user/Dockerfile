# Étape 1 : Installer les dépendances globales depuis le package.json racine
FROM node:16 AS base
WORKDIR /app

# Copier le package.json et package-lock.json globaux (racine)
COPY package.json package-lock.json ./

# Installer les dépendances globales
RUN npm install --legacy-peer-deps

# Étape 2 : Préparer l'environnement spécifique au microservice
FROM node:16 AS service-user
WORKDIR /app/service-user

# Copier le package.json et package-lock.json spécifiques au microservice
COPY service-user/package.json service-user/package-lock.json ./

# Copier les dépendances globales installées précédemment
COPY --from=base /app/node_modules ../node_modules

# Installer les dépendances spécifiques au microservice
RUN npm install --legacy-peer-deps

# Copier le code source du microservice
COPY service-user/ ./

# Exposer le port du service
EXPOSE 3001

# Lancer l'application
CMD ["node", "app.js"]
