import express from "express";
import { getFaqs, addFaq, updateFaq, deleteFaq } from "../controllers/faqController.js";
import { auth, requireAdmin } from "../middleware/auth.js";
import { body } from "express-validator";
const router = express.Router();

router.get("/", getFaqs);
router.post("/", auth, requireAdmin, body("question").isString(), body("answer").isString(), addFaq);
router.put("/:id", auth, requireAdmin, body("question").isString(), body("answer").isString(), updateFaq);
router.delete("/:id", auth, requireAdmin, deleteFaq);

export default router;
