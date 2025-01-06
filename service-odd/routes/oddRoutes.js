import express from 'express';
import Odd from '../models/Odd.js';

const router = express.Router();

// Créer une cote (réservé aux bookmakers)
router.post('/create', async (req, res) => {
    try {
        const { matchId, homeTeam, awayTeam, odds } = req.body;
        const updatedOdd = await Odd.findOneAndUpdate(
            { matchId },
            { homeTeam, awayTeam, odds, updatedAt: new Date() },
            { new: true, upsert: true }
        );
        res.status(201).json(updatedOdd);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtenir toutes les cotes
router.get('/list', async (req, res) => {
    try {
        const odds = await Odd.find();
        res.json(odds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Modifier une cote (réservé aux bookmakers)
router.patch('/update', async (req, res) => {
    try {
        const { matchId, odds } = req.body;

        if (!matchId || !odds) {
            return res.status(400).json({ error: 'matchId et odds sont requis.' });
        }

        const updatedOdd = await Odd.findOneAndUpdate(
            { matchId },
            { odds, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedOdd) {
            return res.status(404).json({ error: 'Cote non trouvée pour ce matchId.' });
        }

        res.json(updatedOdd);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;