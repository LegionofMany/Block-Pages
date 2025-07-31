import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  donatedBy: { type: String, required: true },
  txHash: { type: String },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
