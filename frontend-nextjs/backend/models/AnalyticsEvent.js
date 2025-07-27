import mongoose from "mongoose";
const AnalyticsEventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("AnalyticsEvent", AnalyticsEventSchema);
