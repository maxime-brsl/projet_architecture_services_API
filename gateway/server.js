import express from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyToken, authorizeRole } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

const userServiceProxy = httpProxy(USER_SERVICE_URL);

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes publiques
app.post('/users/register', userServiceProxy);
app.post('/users/login', userServiceProxy);

// Routes parieur
app.get('/parieur/data', verifyToken, authorizeRole('parieur'), (req, res) => {
    userServiceProxy(req, res);
});

// Routes bookmaker
app.get('/bookmarker/data', verifyToken, authorizeRole('bookmarker'), (req, res) => {
    userServiceProxy(req, res);
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrer le serveur Gateway
app.listen(PORT, () => {
    console.log(`Gateway lancée sur le port ${PORT}`);
});
