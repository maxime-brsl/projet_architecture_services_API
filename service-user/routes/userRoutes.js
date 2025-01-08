import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

//On a mit la secret key ici car c'était la seule valeur qui n'arrivait pas à être lu
//Les autres nous avions bien la valeur qui s'affichait mais undefined pour secret key
//On a donc décidé de la mettre ici
const SECRET_KEY = "api_projet_pas_super_secure_le_secret_key_mais_bon";

const router = express.Router();

// Route pour créer un compte utilisateur
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour l’authentification
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        // Inclure l'ID et le rôle dans le token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY
        );

        const userConnect = { token : token, role: user.role };
        res.status(200).json(userConnect);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route pour obtenir les informations utilisateur
router.get('/me', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const user = await User.findById(userId, "-password", null);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
