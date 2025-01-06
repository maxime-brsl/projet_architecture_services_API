import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// Effectuer un paiement (dépôt ou retrait)
router.post('/pay', async (req, res) => {
    try {
        const { userId, amount, type } = req.body;

        if (!['deposit', 'withdrawal'].includes(type)) {
            return res.status(400).json({ error: 'Type invalide, doit être deposit (dépôt) ou withdrawal (retrait)' });
        }
        if (amount <= 10) {
            return res.status(400).json({ error: 'Le montant doit être supérieur ou égal à 10€' });
        }

        const payment = new Payment({ userId, amount, type });
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtenir l'historique des paiements d'un utilisateur
router.post('/history', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'userId est requis dans le body.' });
        }
        const payments = await Payment.find({ userId });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Mettre à jour le statut d'un paiement
router.patch('/update', async (req, res) => {
    try {
        const { id, status } = req.body;

        // Validation des entrées
        if (!id) {
            return res.status(400).json({ error: "L'id est requis dans le body." });
        }
        if (!status) {
            return res.status(400).json({ error: "Le statut est requis dans le body." });
        }

        // Mise à jour du paiement
        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        // Vérifie si le paiement existe
        if (!updatedPayment) {
            return res.status(404).json({ error: "Paiement non trouvé." });
        }

        res.json(updatedPayment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Paiement des gagnants
router.post('/pay-winnings', async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ error: 'Le montant doit être positif' });
        }

        const payment = new Payment({
            userId,
            amount,
            type: 'win_payment',
            status: 'completed'
        });
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;