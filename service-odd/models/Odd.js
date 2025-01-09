import { Schema, model } from 'mongoose';

const OddSchema = new Schema({
    matchId: { type: String, required: true, unique: true },
    odds: {
        homeTeam: { type: Number, required: true },
        draw: { type: Number, required: true },
        awayTeam: { type: Number, required: true }
    },
});

export default model('Odd', OddSchema);