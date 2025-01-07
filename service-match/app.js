import dotenv from 'dotenv';
import express from 'express';
import { getMatches } from './service/footballService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/matches/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
        const matches = await getMatches(competitionId);
        res.json(matches.map(match => {
            return {
                id: match.id,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                date: match.utcDate,
                status: match.status,
                odds: null, // Initialement null, sera mis à jour via le service odd
            }}));
    } catch (error) {
        res.status(500).json({ message: 'Impossible de récupérer les matchs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
