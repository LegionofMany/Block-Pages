import express from "express";
import { register, login, me, metamaskLogin } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/metamask", metamaskLogin);
router.get("/me", auth, me);

export default router;
