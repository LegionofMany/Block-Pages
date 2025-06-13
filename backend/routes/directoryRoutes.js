import express from "express";
import { searchDirectory, lookupByPhone, upsertDirectoryEntry } from "../controllers/directoryController.js";
import { auth, requireAdmin } from "../middleware/auth.js";
import { body } from "express-validator";
const router = express.Router();

router.get("/search", searchDirectory);
router.get("/phone/:phone", lookupByPhone);
router.post(
  "/upsert",
  auth,
  requireAdmin,
  body("address").isString().isLength({ min: 42, max: 42 }),
  body("phone").optional().isString(),
  upsertDirectoryEntry
);

export default router;
