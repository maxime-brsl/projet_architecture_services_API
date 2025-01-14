import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
    outcome: { type: String, required: true },
    type: { type: String, enum: ['simple', 'combined'], required: true },
    stake: { type: Number, required: true },
    odd: { type: Number, required: true },
    status: { type: String, enum: ['waiting', 'win', 'loose'], default: 'waiting' },
}, { timestamps: true });

export default mongoose.model('Bet', betSchema);
