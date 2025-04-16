import express from 'express';
import { analyzeTransactions, getTransactionHistory } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeTransactions);
router.get('/transaction-history/:walletAddress', getTransactionHistory);

export default router;