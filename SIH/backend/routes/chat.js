// backend/chatRouter.js
import express from "express";
import Groq from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const chatRouter = express.Router();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Middleware to parse JSON body
chatRouter.use(express.json());

chatRouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // System instruction to keep responses about Sikkim
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

    const reply =
      completion.choices?.[0]?.message?.content || "No response from assistant.";
    res.json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err.message);
    res.status(500).json({ error: "Error contacting assistant" });
  }
});

export default chatRouter;
