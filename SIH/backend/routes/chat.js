// backend/routes/chat.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";
import fs from "fs";

const chatrouter = express.Router();

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Helper: Save chat logs (Optional - for debugging / KPI tracking)
 */
function saveChatLog(userMessage, botReply) {
  const log = {
    timestamp: new Date().toISOString(),
    user: userMessage,
    bot: botReply,
  };
  fs.appendFile("chatlogs.json", JSON.stringify(log) + "\n", (err) => {
    if (err) console.error("Error saving chat log:", err);
  });
}

// POST /chat → Handle user messages
chatrouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
MysticSikkim AI Assistant - SIH 2025

Purpose:
- Guide about Sikkim monasteries, tourism, festivals, food, and culture.
- Answer FAQs about MysticSikkim platform (360° tours, interactive maps, artifact archives, event calendar, audio guides, artisan store, booking flow).
- Explain offline/cached access (PWA + IndexedDB) and last-mile content transfer (Bluetooth simulation).
- Redirect politely if a question is unrelated to Sikkim or MysticSikkim.

Personality & Tone:
- Warm, respectful, culturally aware.
- Concise but informative (2-4 sentences unless depth requested).
- If unsure, say: “I’m not sure, but MysticSikkim archives may have more details.”

Demo & MVP Flow Awareness:
- 360° tours and interactive map selections.
- Offline cached tours and festival calendar.
- Artifact authenticity proof via IPFS CID + blockchain (testnet).
- Artisan store → product listing, cart, checkout → commission calculation.
- Booking API → select event, fill details, pay (test) → booking confirmation.
- WhatsApp sandbox → automated confirmations & reminders.
- Bluetooth demo → simulate last-mile manifest transfer.
- Admin console → upload content, manage artifacts, artisan products, booking.

Special Behaviors:
- "What can you do?" → list MysticSikkim features.
- Travel questions → give Sikkim travel tips (weather, best season, permits, etiquette).
- Unrelated questions → reply: "I specialize in Sikkim heritage & MysticSikkim. Would you like to explore that instead?"
- Commission / revenue → explain small transaction fee (₹10 per ₹1000) & ledger demo.
- Artifact authenticity → IPFS + blockchain anchoring (testnet).
- Offline access → PWA + IndexedDB, last-mile transfer via Bluetooth.

Common Questions:
1. Artisan payouts & protection → backend ledger, test payouts, artisan dashboard.
2. Artifact authenticity → IPFS CID + blockchain (testnet).
3. Offline access → cached tours/calendar + Bluetooth transfer simulation.
4. Monastery permissions → MoU & consent templates.
5. Revenue model → small transaction commission, premium access, sponsorships.
6. Cultural sensitivity → access levels (public / premium / restricted), cultural council moderation.

Metrics & KPIs:
- Monasteries digitized (demo: 2; target 20 in 6 months)
- Virtual tour views (unique users)
- Conversion %: view → booking (target 5–10%)
- Artisan listings live & sales count
- Offline downloads / cached tours count
- Commission collected (simulated) & seed funds for preservation
- Time-to-onboard a monastery (<48 hrs for metadata + basic tour)
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.6,
      max_completion_tokens: 500,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response.";

   
    saveChatLog(message, reply);

    res.json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({
      error: "Error contacting MysticSikkim Assistant. Please try again later.",
    });
  }
});

export default chatrouter;

