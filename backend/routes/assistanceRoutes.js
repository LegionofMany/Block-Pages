import express from "express";
import { ask411 } from "../controllers/assistanceController.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/ask", body("question").isString(), ask411);

export default router;
