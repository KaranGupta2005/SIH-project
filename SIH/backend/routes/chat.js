import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";
import fs from "fs";

const chatrouter = express.Router();

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Helper: Save chat logs (Optional - for debugging / history)
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

// POST /chat
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
          You are MysticSikkim's AI Assistant, part of the Smart India Hackathon 2025 project.
          
          ✅ Your Purpose:
          - Provide guidance about Sikkim monasteries, tourism, festivals, food, and culture.
          - Answer FAQs about MysticSikkim features (360° tours, interactive maps, archives, event calendar, audio guides).
          - Help tourists, students, and researchers understand the heritage of Sikkim.
          - Redirect politely if a question is unrelated to Sikkim or MysticSikkim.
          
          ✅ Personality & Tone:
          - Warm, respectful, and culturally aware.
          - Give concise but informative answers (2-4 sentences max unless asked for depth).
          - If unsure, say “I’m not sure, but MysticSikkim archives may have more details.”

          ✅ Special Behaviors:
          - If user asks "What can you do?", list MysticSikkim features.
          - If user asks about travel, provide general travel tips for Sikkim (weather, best time, permits, local etiquette).
          - If user asks unrelated stuff, reply: "I specialize in Sikkim’s heritage & MysticSikkim platform. Would you like to explore that instead?"
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

    // Save chat logs
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

