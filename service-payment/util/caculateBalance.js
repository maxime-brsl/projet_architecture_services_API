import Payment from "../models/Payment.js";

export const calculateBalance = async (userId) => {
    const payments = await Payment.find({ userId });
    return payments.reduce((acc, payment) => {
        if (payment.type === 'deposit' || payment.type === 'win_payment') {
            return acc + payment.amount;
        } else if (payment.type === 'withdrawal') {
            return acc - payment.amount;
        }
        return acc;
    }, 0);
};