import mongoose from "mongoose";

const searchAnalyticSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    resultCount: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for aggregation queries
searchAnalyticSchema.index({ query: 1 });
searchAnalyticSchema.index({ timestamp: -1 });

export default mongoose.model("SearchAnalytic", searchAnalyticSchema);
