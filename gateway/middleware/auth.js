import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//On a mit la secret key ici car c'était la seule valeur qui n'arrivait pas à être lu
//Les autres nous avions bien la valeur qui s'affichait mais undefined pour secret key
//On a donc décidé de la mettre ici
const SECRET_KEY = "api_projet_pas_super_secure_le_secret_key_mais_bon";

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]; //permet de retirer le Bearer
    if (!token) return res.status(401).json({ message: 'Non autorisé' });

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        console.log("req.user", req.user)
        req.headers['Authorization'] = token;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
        next();
    };
};
