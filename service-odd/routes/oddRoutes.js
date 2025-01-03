import express from 'express';
import Odd from '../models/Odd.js';

const router = express.Router();

// Créer ou mettre à jour une cote
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const odds = await Odd.find();
        res.json(odds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une cote
router.delete('/:id', async (req, res) => {
    try {
        await Odd.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cote supprimée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;