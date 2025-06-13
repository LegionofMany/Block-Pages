import express from "express";
import { logEvent, getEvents } from "../controllers/analyticsController.js";
import { auth, requireAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/log", auth, logEvent);
router.get("/", auth, requireAdmin, getEvents);

export default router;
