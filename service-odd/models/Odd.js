import { Schema, model } from 'mongoose';

const OddSchema = new Schema({
    matchId: { type: String, required: true, unique: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    odds: {
        homeWin: { type: Number, required: true },
        draw: { type: Number, required: true },
        awayWin: { type: Number, required: true }
    },
    updatedAt: { type: Date, default: Date.now }
});

export default model('Odd', OddSchema);