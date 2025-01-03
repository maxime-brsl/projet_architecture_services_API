import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import oddRoutes from './routes/oddRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Service Odd lancé sur le port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});

app.use('/odds', oddRoutes);