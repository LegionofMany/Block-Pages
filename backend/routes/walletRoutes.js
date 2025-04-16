import express from "express";
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
router.get("/:wallet", getWalletInfoWithContract);
// Route to flag a wallet in the database and the smart contract
router.post("/flag", flagWalletInDatabaseAndContract); // Updated to match the new function name
// Route to rate a wallet in the smart contract
router.post("/rate", rateWalletInContract); // Updated to match the new function name
// Route to get the rating of a specific wallet
router.get("/:wallet/rating", fetchWalletRating); // Updated to match the new function name
// Route to get the flagged count of a specific wallet
router.get("/:wallet/flagged-count", fetchWalletFlaggedCount); // Updated to match the new function name
export default router;