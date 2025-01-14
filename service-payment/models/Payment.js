import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'bet'], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model('Payment', PaymentSchema);