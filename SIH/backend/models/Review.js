import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    monasteryName: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 500 },
    visitDate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
