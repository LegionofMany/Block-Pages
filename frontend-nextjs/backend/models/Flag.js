import mongoose from "mongoose";

const FlagSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  flaggedBy: { type: String, required: true }, // user or admin
  txHash: { type: String }, // on-chain tx hash
  reason: { type: String },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Flag", FlagSchema);
