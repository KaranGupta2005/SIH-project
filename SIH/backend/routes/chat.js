import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";

const chatrouter = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are MysticSikkim AI Assistant — a helpful, warm, and knowledgeable guide for Sikkim's monasteries, culture, festivals, food, and tourism.

Your role:
- Guide visitors about Sikkim's monasteries (Rumtek, Enchey, Phodong, Dubdi, Gonjang, Pemayangtse, Tashiding, Ralang, Samdruptse, Labrang, Sanghak, Lingdim)
- Share details about festivals, culture, food, travel tips, and etiquette
- Explain MysticSikkim platform features: 360° virtual tours, interactive maps, digital archives, cultural calendar, audio guides
- Be concise (2-4 sentences) unless the user asks for detail
- If asked about unrelated topics, politely redirect: "I specialize in Sikkim's heritage. Would you like to explore that instead?"
- Be culturally respectful and factually accurate

Important facts:
- Best time to visit: March-June, September-November
- Always dress modestly at monasteries, avoid photography where restricted
- Sikkim requires an Inner Line Permit for some areas
- The platform supports offline access for remote monastery visits`;

chatrouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.6,
      max_tokens: 500,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err.message);
    res.status(500).json({
      error: "Error contacting assistant. Please try again later.",
    });
  }
});

export default chatrouter;
