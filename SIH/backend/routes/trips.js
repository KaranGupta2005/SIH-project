import express from "express";
import TripPlan from "../models/TripPlan.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/trips — get user's trips (protected)
router.get("/", protect, async (req, res) => {
  try {
    const trips = await TripPlan.find({ userId: req.user._id }).sort({ startDate: 1 });
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// POST /api/trips — create a trip (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { name, startDate, endDate, monasteries, notes } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({ error: "Name, start date, and end date are required" });
    }

    const trip = await TripPlan.create({
      userId: req.user._id,
      name,
      startDate,
      endDate,
      monasteries: monasteries || [],
      notes: notes || "",
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to create trip" });
  }
});

// PUT /api/trips/:id — update trip (protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const trip = await TripPlan.findOne({ _id: req.params.id, userId: req.user._id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const { name, startDate, endDate, monasteries, notes, status } = req.body;
    if (name) trip.name = name;
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    if (monasteries) trip.monasteries = monasteries;
    if (notes !== undefined) trip.notes = notes;
    if (status) trip.status = status;

    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to update trip" });
  }
});

// DELETE /api/trips/:id (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const trip = await TripPlan.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

export default router;
