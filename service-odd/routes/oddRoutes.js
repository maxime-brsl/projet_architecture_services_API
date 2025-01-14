import express from 'express';
import Odd from '../models/Odd.js';

const router = express.Router();

// Route POST /create
router.post('/create', async (req, res) => {
    try {
        const { matchId, outcome, odd } = req.body;

        // Validation
        if (!matchId || !outcome || typeof odd !== 'number') {
            return res.status(400).json({ error: 'matchId, outcome et odd sont requis et doivent être valides.' });
        }

        // Vérification des limites de la cote
        if (odd < 1 ) {
            return res.status(400).json({ error: 'La cote doit être supérieur à 1.' });
        }

        // Vérifie si le match existe
        let existingOdd = await Odd.findOne({ matchId });

        if (!existingOdd) {
            // Si aucun match trouvé, crée un nouvel objet Odd avec des valeurs par défaut
            existingOdd = new Odd({
                matchId,
                odds: {
                    homeTeam: outcome === 'homeTeam' ? odd : 0,
                    draw: outcome === 'draw' ? odd : 0,
                    awayTeam: outcome === 'awayTeam' ? odd : 0,
                },
            });
        } else {
            // Met à jour uniquement la cote concernée
            const updatedOdds = {
                homeTeam: existingOdd.odds.homeTeam ?? 0,
                draw: existingOdd.odds.draw ?? 0,
                awayTeam: existingOdd.odds.awayTeam ?? 0,
            };

            if (outcome === 'homeTeam') {
                updatedOdds.homeTeam = odd;
            } else if (outcome === 'draw') {
                updatedOdds.draw = odd;
            } else if (outcome === 'awayTeam') {
                updatedOdds.awayTeam = odd;
            } else {
                return res.status(400).json({ error: `Outcome invalide : ${outcome}` });
            }

            existingOdd.odds = updatedOdds; // Remplace les cotes par l'objet mis à jour
        }

        // Sauvegarde dans la base de données
        const updatedOdd = await existingOdd.save();

        // Retourne l'objet mis à jour
        res.status(201).json(updatedOdd);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:matchId', async (req, res) => {
    try {
        const { matchId } = req.params;

        if (!matchId) {
            return res.status(400).json({ error: 'matchId est requis.' });
        }

        const odd = await Odd.findOne({ matchId });

        if (!odd) {
            return res.status(404).json({ error: 'Cote non trouvée pour ce matchId.' });
        }

        res.json(odd);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;