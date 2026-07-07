import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import chatrouter from "./routes/chat.js";
import authRouter from "./routes/auth.js";
import monasteriesRouter from "./routes/monasteries.js";
import wikidataRouter from "./routes/wikidata.js";
import reviewsRouter from "./routes/reviews.js";
import tripsRouter from "./routes/trips.js";
import analyticsRouter from "./routes/analytics.js";
import adminRouter from "./routes/admin.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API Routes
app.use("/api/chat", chatrouter);
app.use("/api/auth", authRouter);
app.use("/api/monasteries", monasteriesRouter);
app.use("/api/wikidata", wikidataRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin", adminRouter);

// Serve frontend build in production
const frontendPath = join(__dirname, "../frontend/MysticSikkim/dist");
app.use(express.static(frontendPath));

// SPA fallback — serve index.html for all non-API routes
app.get("/{*splat}", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
