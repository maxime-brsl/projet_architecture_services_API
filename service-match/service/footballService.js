import axios from 'axios';

//Souci d'accès au .env même en mettant le dot config le plus haut, donc on a mis directement la clé ici (meme si ce n'est pas bien)
const apiKey = "e82f1fffb787450ea8dba9a387e219ad";
const baseUrl = 'https://api.football-data.org/v4';

const getMatches = async (competitionId) => {
    try {
        const response = await axios.get(`${baseUrl}/competitions/${competitionId}/matches`, {
            headers: { 'X-Auth-Token': apiKey },
        });
        return response.data.matches;
    } catch (error) {
        console.error('Erreur lors de la récupération des matchs :', error.message);
        throw error;
    }
};

export { getMatches };
