import express from "express";
import { body, param } from "express-validator";
import {
  getFlaggedWallets,
  flagWalletInDatabaseAndContract, // Updated to match the new function name
  getWalletInfoWithContract,
  rateWalletInContract, // Updated to match the new function name
  fetchWalletRating, // Updated to match the new function name
  fetchWalletFlaggedCount, // Updated to match the new function name
} from "../controllers/walletController.js";
const router = express.Router();
// Route to get all flagged wallets
router.get("/flagged", getFlaggedWallets);
// Route to get wallet info along with contract data
router.get(
  "/:wallet",
  param("wallet").isString().isLength({ min: 42, max: 42 }).withMessage("Invalid wallet address"),
  getWalletInfoWithContract
);
// Route to flag a wallet in the database and the smart contract
router.post(
  "/flag",
  body("walletAddress").isString().isLength({ min: 42, max: 42 }).withMessage("Invalid wallet address"),
  body("reason").isString().isLength({ min: 3 }).withMessage("Reason is required"),
  flagWalletInDatabaseAndContract
);
// Route to rate a wallet in the smart contract
router.post(
  "/rate",
  body("walletAddress").isString().isLength({ min: 42, max: 42 }).withMessage("Invalid wallet address"),
  body("rating").isInt({ min: 1, max: 3 }).withMessage("Rating must be 1, 2, or 3"),
  rateWalletInContract
);
// Route to get the rating of a specific wallet
router.get(
  "/:wallet/rating",
  param("wallet").isString().isLength({ min: 42, max: 42 }).withMessage("Invalid wallet address"),
  fetchWalletRating
);
// Route to get the flagged count of a specific wallet
router.get(
  "/:wallet/flagged-count",
  param("wallet").isString().isLength({ min: 42, max: 42 }).withMessage("Invalid wallet address"),
  fetchWalletFlaggedCount
);
export default router;