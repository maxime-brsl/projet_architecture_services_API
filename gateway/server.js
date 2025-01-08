import express from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyToken, authorizeRole } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const BET_SERVICE_URL = process.env.BET_SERVICE_URL;
const ODD_SERVICE_URL = process.env.ODD_SERVICE_URL;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL;
const MATCH_SERVICE_URL = process.env.MATCH_SERVICE_URL;

const userServiceProxy = httpProxy(USER_SERVICE_URL);
const betServiceProxy = httpProxy(BET_SERVICE_URL);
const oddServiceProxy = httpProxy(ODD_SERVICE_URL);
const paymentServiceProxy = httpProxy(PAYMENT_SERVICE_URL, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers['x-user-id'] = srcReq.user.id;
        return proxyReqOpts;
    },
});
const matchServiceProxy = httpProxy(MATCH_SERVICE_URL);

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes publiques
app.post('/users/register', userServiceProxy);
app.post('/users/login', userServiceProxy);
app.get('/users/me', verifyToken, httpProxy(USER_SERVICE_URL, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            // Ajouter l'ID utilisateur et d'autres données dans les en-têtes
            proxyReqOpts.headers['x-user-id'] = srcReq.user.id;
            proxyReqOpts.headers['x-user-role'] = srcReq.user.role;
            return proxyReqOpts;
        },
    })
);

app.get('/matches/:competitionId', matchServiceProxy);

// Routes parieur
app.post('/payments/pay', verifyToken, authorizeRole('parieur'), paymentServiceProxy);
app.get('/payments/wallet', verifyToken, authorizeRole('parieur'), paymentServiceProxy);

app.post('/bets/place', betServiceProxy);
app.get('/bets/my-bets', betServiceProxy);
app.post('/payments/history', paymentServiceProxy);

// Routes bookmaker
app.post('/odds/create', verifyToken, authorizeRole('bookmaker'), oddServiceProxy);
app.patch('/odds/update', verifyToken, authorizeRole('bookmaker'), oddServiceProxy);

// Gestion des erreurs
app.use((err, req, res) => {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrer le serveur Gateway
app.listen(PORT, () => {
    console.log(`Gateway lancée sur le port ${PORT}`);
});
