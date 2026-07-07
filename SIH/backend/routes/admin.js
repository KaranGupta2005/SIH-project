import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js";
import TripPlan from "../models/TripPlan.js";
import SearchAnalytic from "../models/SearchAnalytic.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Middleware: admin only
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// GET /api/admin/dashboard — admin overview
router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalReviews, totalTrips, totalSearches] = await Promise.all([
      User.countDocuments(),
      Review.countDocuments(),
      TripPlan.countDocuments(),
      SearchAnalytic.countDocuments(),
    ]);

    const recentUsers = await User.find()
      .select("name email createdAt role")
      .sort({ createdAt: -1 })
      .limit(10);

    const recentReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const topSearches = await SearchAnalytic.aggregate([
      { $group: { _id: "$query", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      stats: { totalUsers, totalReviews, totalTrips, totalSearches },
      recentUsers,
      recentReviews,
      topSearches: topSearches.map((t) => ({ query: t._id, count: t.count })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin data" });
  }
});

// GET /api/admin/users — list all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PUT /api/admin/users/:id/role — change user role
router.put("/users/:id/role", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

// DELETE /api/admin/reviews/:id — delete any review
router.delete("/reviews/:id", protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router;
