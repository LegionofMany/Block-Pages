import express from "express";
import Flag from "../models/Flag";

const router = express.Router();

// Get all flags for a wallet
router.get("/:walletAddress", async (req, res) => {
  try {
    const flags = await Flag.find({ walletAddress: req.params.walletAddress }).sort({ createdAt: -1 });
    res.json(flags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new flag
router.post("/", async (req, res) => {
  try {
    const { walletAddress, flaggedBy, txHash, reason } = req.body;
    const flag = new Flag({ walletAddress, flaggedBy, txHash, reason });
    await flag.save();
    res.status(201).json(flag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
