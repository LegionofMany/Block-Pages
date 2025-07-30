import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  donatedBy: { type: String, required: true }, // user or admin
  txHash: { type: String }, // on-chain tx hash
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Donation", DonationSchema);
