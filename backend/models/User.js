import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String }, // Not required for MetaMask
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for MetaMask
    walletAddress: { type: String, unique: true, sparse: true },
    username: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  // Only hash password if present and modified
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  if (!this.password) return false; // No password set (MetaMask user)
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);