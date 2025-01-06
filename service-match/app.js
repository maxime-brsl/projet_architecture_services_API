import dotenv from 'dotenv';
import express from 'express';
import { getMatches } from './service/footballService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get('/matches/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
        const matches = await getMatches(competitionId);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Impossible de récupérer les matchs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
