import express from 'express';
import jwt from 'jsonwebtoken';
import Bet from '../models/Bet.js';

const router = express.Router();

// Middleware d'authentification corrigé
const authenticate = (req, res, next) => {
    try {
        const header = req.headers['authorization']; // En minuscules
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        const token = header.split(' ')[1]; // Extraire le token après 'Bearer'
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

// Route pour placer un pari
router.post('/place', authenticate, async (req, res) => {
    try {
        const { matchId, type, stake, odds } = req.body;

        // Vérifie les entrées
        if (!matchId || !type || !stake || !odds) {
            return res.status(400).json({ message: 'Données incomplètes' });
        }

        // Création du pari
        const bet = new Bet({
            userId: req.user.id,
            matchId,
            type,
            stake,
            odds,
            status: 'en attente',
            winnings: 0
        });

        await bet.save();
        res.status(201).json({ message: 'Pari placé avec succès', bet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
// Route pour clôturer un pari
router.post('/close', authenticate, async (req, res) => {
});
*/


// Route pour récupérer les paris d'un utilisateur
router.get('/my-bets', authenticate, async (req, res) => {
    try {
        const bets = await Bet.find({ userId: req.user.id });
        res.status(200).json(bets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;