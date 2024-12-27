import express from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';
import cors from 'cors'; // Importer le middleware CORS

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Configuration des proxys
const userServiceProxy = httpProxy(USER_SERVICE_URL);

// Middleware pour activer CORS
app.use(cors({
    origin: 'http://localhost:4200',  // Frontend Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser les JSON et les URL-encoded
app.use(express.json()); // Pour les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour les formulaires URL-encoded

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
