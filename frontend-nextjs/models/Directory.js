import mongoose from "mongoose";

const DirectorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  info: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Directory || mongoose.model("Directory", DirectorySchema);
