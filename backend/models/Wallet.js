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
    }, // <-- add comma here to fix lint error
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);
// Optionally, you can add a pre-save hook if you need custom logic
WalletSchema.pre("save", function(next) {
  // Any custom logic can be added here
  next();
});
export default mongoose.model("Wallet", WalletSchema);