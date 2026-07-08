import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    monasteries: [{ type: String }], // monastery names
    notes: { type: String, default: "" },
    status: { type: String, enum: ["planned", "ongoing", "completed"], default: "planned" },
  },
  { timestamps: true }
);

export default mongoose.model("TripPlan", tripPlanSchema);
