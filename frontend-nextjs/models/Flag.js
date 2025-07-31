import mongoose from "mongoose";

const FlagSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  flaggedBy: { type: String, required: true },
  txHash: { type: String },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Flag || mongoose.model("Flag", FlagSchema);
