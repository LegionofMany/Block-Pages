import express from "express";
import moralisController from "../controllers/moralisController.js";

const router = express.Router();

// Get wallet balance
router.get("/balance/:wallet", moralisController.getBalance);
// Get wallet transaction history
router.get("/transactions/:wallet", moralisController.getTransactionHistory);
// Get gas price
router.get("/gas-price", moralisController.getGasPrice);
// Estimate transaction fee
router.get("/estimate-fee", moralisController.estimateTransactionFee);
// Get block data
router.get("/block/:blockNumber", moralisController.getBlockData);

export default router;
