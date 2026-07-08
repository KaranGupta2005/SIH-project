import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// Serve monasteries data from the frontend's JSON for now
// In production, this would come from MongoDB
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let monasteriesData = [];
try {
  const filePath = join(__dirname, "../../frontend/MysticSikkim/public/info/monasteries.json");
  const raw = readFileSync(filePath, "utf-8");
  monasteriesData = JSON.parse(raw).monasteries || [];
} catch (err) {
  console.warn("Could not load monasteries.json:", err.message);
}

// GET /api/monasteries
router.get("/", (req, res) => {
  const { search, region } = req.query;
  let results = monasteriesData;

  if (search) {
    results = results.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (region) {
    // Could add region field to monasteries.json later
    results = results.filter((m) =>
      m.name.toLowerCase().includes(region.toLowerCase())
    );
  }

  res.json({ monasteries: results, total: results.length });
});

// GET /api/monasteries/:name
router.get("/:name", (req, res) => {
  const monastery = monasteriesData.find(
    (m) => m.name.toLowerCase().replace(/\s+/g, "-") === req.params.name.toLowerCase()
  );

  if (!monastery) {
    return res.status(404).json({ error: "Monastery not found" });
  }

  res.json(monastery);
});

export default router;
