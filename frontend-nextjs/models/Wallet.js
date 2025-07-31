import mongoose from "mongoose";
const WalletSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    isFlagged: { type: Boolean, default: false },
    rating: { type: String, enum: ["Poor", "Good", "Qualified"], default: "Good" },
    reason: { type: String },
    name: { type: String },
    phone: { type: String, unique: true, sparse: true },
    info: { type: String },
    region: {
      country: { type: String },
      continent: { type: String },
      state: { type: String },
      city: { type: String }
    },
  },
  {
    timestamps: true,
  }
);
WalletSchema.pre("save", function(next) {
  next();
});
export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
