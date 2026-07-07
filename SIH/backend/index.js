import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();

import chatrouter from "./routes/chat.js";
import authRouter from "./routes/auth.js";
import monasteriesRouter from "./routes/monasteries.js";
import wikidataRouter from "./routes/wikidata.js";

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

app.get("/", (req, res) => {
  res.send("Monastery360 Backend is running 🚀");
});

// Routes
app.use("/api/chat", chatrouter);
app.use("/api/auth", authRouter);
app.use("/api/monasteries", monasteriesRouter);
app.use("/api/wikidata", wikidataRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
