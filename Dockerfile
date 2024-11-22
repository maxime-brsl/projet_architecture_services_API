# Base image compatible avec Java 21
FROM eclipse-temurin:21-jdk

# Définir le répertoire de travail
WORKDIR /src

# Copier l'application (générée par Gradle/Maven)
COPY ./target/*.jar app.jar

# Exposer le port 8080 (port par défaut de Spring Boot)
EXPOSE 8080

# Commande de démarrage
ENTRYPOINT ["java", "-jar", "app.jar"]
