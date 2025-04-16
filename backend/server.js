import express from 'express';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import moralis from 'moralis';
import cors from 'cors';
import responseHelper from './utils/responseHelper.js';
import db from './utils/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db()
  .then(() => {
    console.log('Database connected successfully');

    // Moralis Initialization
    moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })
    .then(() => console.log('Moralis Initialized'));

    // Rate Limiting Middleware
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: responseHelper.error('Too many requests, please try again later.')
    });

    const chain = new EvmChain({
      id: 1,
      name: 'Ethereum Testnet',
      network: 'Testnet',
    });

    console.log(chain); // Output: { id: 1, name: 'Ethereum Mainnet', network: 'mainnet' }

    app.use(cors());
    app.use(express.json());
    app.use(limiter);

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/ai', aiRoutes);
    app.use('/api/wallets', walletRoutes);

    // Global Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json(responseHelper.error('Internal Server Error'));
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    // Handle the error here
  });