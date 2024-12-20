import express from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Configuration des proxys
const userServiceProxy = httpProxy(USER_SERVICE_URL);

// Middleware pour parser les JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/users/register', userServiceProxy);
app.post('/users/login', userServiceProxy);
app.get('/users/me', userServiceProxy);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrer le serveur Gateway
app.listen(PORT, () => {
    console.log(`Gateway lancée sur le port ${PORT}`);
});

