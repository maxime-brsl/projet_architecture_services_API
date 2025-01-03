import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
    type: { type: String, enum: ['simple', 'combiné'], required: true },
    stake: { type: Number, required: true },
    odds: { type: Number, required: true },
    status: { type: String, enum: ['en attente', 'gagné', 'perdu'], default: 'en attente' },
    winnings: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Bet', betSchema);
