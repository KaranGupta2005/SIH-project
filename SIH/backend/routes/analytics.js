import express from "express";
import SearchAnalytic from "../models/SearchAnalytic.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST /api/analytics/search — log a search query
router.post("/search", async (req, res) => {
  try {
    const { query, resultCount } = req.body;
    if (!query || query.trim().length < 2) return res.status(400).json({ error: "Query too short" });

    await SearchAnalytic.create({ query: query.toLowerCase().trim(), resultCount: resultCount || 0 });
    res.status(201).json({ message: "Logged" });
  } catch (err) {
    res.status(500).json({ error: "Failed to log search" });
  }
});

// GET /api/analytics/trending — get most searched monasteries (admin or public)
router.get("/trending", async (req, res) => {
  try {
    const trending = await SearchAnalytic.aggregate([
      { $match: { timestamp: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: "$query", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({ trending: trending.map((t) => ({ query: t._id, count: t.count })) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending" });
  }
});

// GET /api/analytics/stats — overall stats (admin)
router.get("/stats", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const totalSearches = await SearchAnalytic.countDocuments();
    const todaySearches = await SearchAnalytic.countDocuments({
      timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });
    const trending = await SearchAnalytic.aggregate([
      { $group: { _id: "$query", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({ totalSearches, todaySearches, topSearches: trending });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
