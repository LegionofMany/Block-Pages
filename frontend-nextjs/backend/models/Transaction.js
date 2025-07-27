import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    transactionHistory: { type: Array, required: true },
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);
