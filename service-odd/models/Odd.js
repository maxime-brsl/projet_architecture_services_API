import { Schema, model } from 'mongoose';

const OddSchema = new Schema({
    matchId: { type: String, required: true, unique: true },
    odds: {
        homeWin: { type: Number, required: true },
        draw: { type: Number, required: true },
        awayWin: { type: Number, required: true }
    },
});

export default model('Odd', OddSchema);