import express from 'express';
import { analyzeTransactions, getTransactionHistory, getScrapedWalletInfo } from '../controllers/aiController.js';
import { param } from 'express-validator';

const router = express.Router();

router.post('/analyze', analyzeTransactions);
router.get('/transaction-history/:walletAddress', getTransactionHistory);
router.get('/scrape/:wallet', param('wallet').isString().isLength({ min: 42, max: 42 }), getScrapedWalletInfo);

export default router;