import express from "express";
import Donation from "../models/Donation";

const router = express.Router();

// Get all donations for a wallet
router.get("/:walletAddress", async (req, res) => {
  try {
    const donations = await Donation.find({ walletAddress: req.params.walletAddress }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new donation
router.post("/", async (req, res) => {
  try {
    const { walletAddress, donatedBy, txHash, amount } = req.body;
    const donation = new Donation({ walletAddress, donatedBy, txHash, amount });
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
