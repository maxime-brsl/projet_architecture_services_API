require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exemple route de base
app.get('/', (req, res) => {
    res.send('Microservice Utilisateurs en ligne !');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur User lancé sur le port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
