import express from "express";
import { fetchGivingBlockCharities } from "../services/givingBlockService.js";

const router = express.Router();

// GET /api/charities/givingblock
router.get("/givingblock", async (req, res) => {
  try {
    const charities = await fetchGivingBlockCharities();
    res.json({ charities });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch charities from The Giving Block." });
  }
});

export default router;
