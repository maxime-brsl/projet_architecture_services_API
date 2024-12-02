import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur User lancé sur le port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});

app.use('/users', userRoutes);
