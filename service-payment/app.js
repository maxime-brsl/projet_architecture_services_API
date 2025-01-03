import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import paymentRoutes from './routes/paymentRoutes.js';

// Charger les variables d'environnement
dotenv.config();

// Créer une instance d'Express
const app = express();

// Middleware pour parser le JSON et les requêtes URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des routes
app.use('/payments', paymentRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB pour le service de paiements');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Quitter l'application en cas d'échec
});

// Gestion des erreurs
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Service Payment lancé sur le port ${PORT}`);
});
