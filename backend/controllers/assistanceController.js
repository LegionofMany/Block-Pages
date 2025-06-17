import OpenAI from "openai";
import { validationResult } from "express-validator";
import Faq from "../models/Faq.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const ask411 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { question } = req.body;
  // Try FAQ first
  const faqs = await Faq.find();
  const match = faqs.find(f => question.toLowerCase().includes(f.question.toLowerCase().split(" ")[0]));
  if (match) return res.json({ answer: match.answer, source: "faq" });
  // Fallback to OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful web3/crypto assistant for BlockPages 411." },
        { role: "user", content: question }
      ]
    });
    const answer = completion.choices[0].message.content;
    res.json({ answer, source: "ai" });
  } catch (err) {
    res.status(500).json({ error: "AI unavailable. Please try again later." });
  }
};
