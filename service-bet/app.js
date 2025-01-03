import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import betRoutes from './routes/betRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Service Bet lancé sur le port ${PORT}`);
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});

// Route pour gérer les paris
app.use('/bets', betRoutes);
