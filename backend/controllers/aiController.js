import aiService from '../services/aiService.js';
import Transaction from '../models/Transaction.js';
import responseHelper from '../utils/responseHelper.js';
import { scrapeWalletInfo } from "../services/aiService.js";
import { validationResult } from "express-validator";

export const analyzeTransactions = async (req, res) => {
    try {
        const { walletAddress } = req.body;
        const transactionHistory = await aiService.analyze(walletAddress);
        const transaction = new Transaction({
            walletAddress,
            transactionHistory,
        });
        await transaction.save();
        res.json(responseHelper.success('Analysis complete', transaction));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error analyzing transactions'));
    }
};

export const getTransactionHistory = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const transactionHistory = await Transaction.findOne({ walletAddress });
        res.json(responseHelper.success('Transaction history retrieved', transactionHistory));
    } catch (error) {
        res.status(500).json(responseHelper.error('Error retrieving transaction history'));
    }
};

export const getScrapedWalletInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const { wallet } = req.params;
  try {
    const info = await scrapeWalletInfo(wallet);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};