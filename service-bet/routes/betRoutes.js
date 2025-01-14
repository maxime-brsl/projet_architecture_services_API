import express from 'express';
import Bet from '../models/Bet.js';
import axios from 'axios';

const router = express.Router();

// Route pour placer un pari
router.post('/place', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        const { matchId, type, outcome, stake } = req.body;
        if (!matchId || !type || !outcome || !stake || stake < 0.1) {
            return res.status(400).json({ message: 'Données incomplètes ou erronées' });
        }

        const oddsResponse =
            await axios.get(`http://service-odd:3002/odds/${matchId}`);

        const odd = oddsResponse.data.odds[outcome];

        const walletResponse =
            await axios.get(`http://service-payment:3005/payments/wallet`, {
                headers: { 'x-user-id': userId }
            });

        await axios.post(`http://service-payment:3005/payments/pay`, {amount: stake, type: 'bet'}, {
            headers: { 'x-user-id': userId }
        });

        if (walletResponse.data.wallet < stake) {
            return res.status(405).json({ message: 'Solde insuffisant' });
        }

        const bet = new Bet({
            userId: userId,
            matchId,
            outcome,
            type,
            stake,
            odd,
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
        const userId = req.headers['x-user-id'];
        const bets = await Bet.find({ userId });
        res.status(200).json(bets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;