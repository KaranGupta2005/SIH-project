import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";

const chatrouter = express.Router();

// Initialize Groq with API key from environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
          content:
            "You are an assistant that ONLY answers questions related to Sikkim. " +
            "If a question is unrelated, politely redirect to Sikkim-related info.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Error contacting assistant" });
  }
});

export default chatrouter;
