import express from 'express';
import {getMatch, getMatches} from "../service/footballService.js";

const app = express.Router();

app.get('/:competitionId', async (req, res) => {
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

app.get('/match/:id', async (req, res) => {
    const matchId = req.params.id;
    try {
        const match = await getMatch(matchId);
        return res.json(match);
    } catch (error) {
        res.status(500).json({ message: 'Impossible de récupérer le match.' });
    }
});

export default app;