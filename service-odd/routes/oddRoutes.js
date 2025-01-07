import express from 'express';
import Odd from '../models/Odd.js';

const router = express.Router();

// Créer une cote (réservé aux bookmakers)
router.post('/create', async (req, res) => {
    try {
        const { matchId, odds } = req.body;
        if (!matchId || !odds) {
            return res.status(400).json({ error: 'matchId et odds sont requis.' });
        }

        const existingOdd = await Odd.findOne({ matchId });

        let updatedOdds;
        if (existingOdd) {
            // Fusionner les nouvelles cotes avec les cotes existantes
            updatedOdds = {
                ...existingOdd.odds, // Les cotes existantes
                ...odds,             // Les nouvelles cotes
            };
        } else {
            updatedOdds = odds;
        }

        // Mettre à jour ou insérer la cote
        const updatedOdd = await Odd.findOneAndUpdate(
            { matchId },
            { odds: updatedOdds },
            { new: true, upsert: true }  // 'new: true' renvoie le document mis à jour
        );

        // Retourner l'objet mis à jour avec les cotes
        res.status(201).json(updatedOdd);  // Inclut les cotes dans la réponse
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