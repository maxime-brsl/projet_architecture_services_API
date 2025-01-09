import express from 'express';
import jwt from 'jsonwebtoken';
import Bet from '../models/Bet.js';

const router = express.Router();

// Route pour placer un pari
router.post('/place', async (req, res) => {
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
            status: 'waiting',
            winnings: 0
        });

        await bet.save();
        res.status(201).json({ message: 'Pari placé avec succès', bet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour récupérer les paris d'un utilisateur
router.get('/my-bets', async (req, res) => {
    try {
        const bets = await Bet.find({ userId: req.user.id });
        res.status(200).json(bets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;