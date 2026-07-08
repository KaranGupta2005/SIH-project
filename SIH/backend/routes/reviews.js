import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/reviews/:monasteryName — get reviews for a monastery
router.get("/:monasteryName", async (req, res) => {
  try {
    const reviews = await Review.find({ monasteryName: req.params.monasteryName })
      .sort({ createdAt: -1 })
      .limit(20);

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.json({ reviews, avgRating: parseFloat(avgRating), total: reviews.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// POST /api/reviews — add a review (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { monasteryName, rating, comment, visitDate } = req.body;

    if (!monasteryName || !rating || !comment) {
      return res.status(400).json({ error: "Monastery name, rating, and comment are required" });
    }

    const review = await Review.create({
      monasteryName,
      userName: req.user.name,
      userId: req.user._id,
      rating: Math.min(5, Math.max(1, rating)),
      comment: comment.substring(0, 500),
      visitDate,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

// DELETE /api/reviews/:id — delete own review (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router;
