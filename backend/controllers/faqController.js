import Faq from "../models/Faq.js";
import { validationResult } from "express-validator";

export const getFaqs = async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
};

export const addFaq = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { question, answer } = req.body;
  const faq = new Faq({ question, answer, createdBy: req.user.id });
  await faq.save();
  res.status(201).json(faq);
};

export const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const faq = await Faq.findByIdAndUpdate(id, { question, answer, updatedAt: Date.now() }, { new: true });
  if (!faq) return res.status(404).json({ error: "FAQ not found" });
  res.json(faq);
};

export const deleteFaq = async (req, res) => {
  const { id } = req.params;
  const faq = await Faq.findByIdAndDelete(id);
  if (!faq) return res.status(404).json({ error: "FAQ not found" });
  res.json({ message: "FAQ deleted" });
};
