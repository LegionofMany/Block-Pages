import Wallet from "../models/Wallet.js";
import { validationResult } from "express-validator";

// Search directory by name, phone, or wallet
export const searchDirectory = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });
  const regex = new RegExp(q, "i");
  const results = await Wallet.find({ $or: [
    { name: regex },
    { phone: regex },
    { address: regex }
  ] });
  res.json(results);
};

// Lookup by phone number
export const lookupByPhone = async (req, res) => {
  const { phone } = req.params;
  const entry = await Wallet.findOne({ phone });
  if (!entry) return res.status(404).json({ error: "Not found" });
  res.json(entry);
};

// Add or update directory entry (admin only)
export const upsertDirectoryEntry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const { address, name, phone, info } = req.body;
  let entry = await Wallet.findOne({ address });
  if (!entry) {
    entry = new Wallet({ address, name, phone, info });
  } else {
    if (name) entry.name = name;
    if (phone) entry.phone = phone;
    if (info) entry.info = info;
  }
  await entry.save();
  res.json(entry);
};
