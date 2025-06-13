import { validationResult } from "express-validator";
import { getWalletInfoFromContract, getAllFlaggedWalletsOnChain } from "../services/contractService.js";
import Wallet from "../models/Wallet.js";

/**
 * Controller for wallet-related API endpoints.
 * Handles flagged wallets, wallet info, flagging, rating, and contract integration.
 * Uses express-validator for input validation.
 */

/**
 * Get all flagged wallets, including contract info.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getFlaggedWallets = async (req, res) => {
  try {
    // Fetch flagged wallets from MongoDB
    const dbWallets = await Wallet.find({ isFlagged: true });
    const dbWalletsMap = new Map(dbWallets.map(w => [w.address.toLowerCase(), w.toObject()]));

    // Fetch flagged wallets from the smart contract
    let onChainWallets = [];
    try {
      onChainWallets = await getAllFlaggedWalletsOnChain();
    } catch (err) {
      console.error("Error fetching on-chain flagged wallets:", err);
    }
    // Merge, removing duplicates (prefer DB info, add on-chain info if not in DB)
    const merged = [
      ...dbWallets.map(w => ({ ...w.toObject(), source: "db" })),
      ...onChainWallets.filter(w => !dbWalletsMap.has(w.address.toLowerCase())).map(w => ({ ...w, source: "onchain" }))
    ];
    res.json(merged);
  } catch (err) {
    console.error("Error fetching flagged wallets:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get wallet info from DB and contract.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getWalletInfoWithContract = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  try {
    const walletAddress = req.params.wallet;
    // Fetch wallet info from MongoDB
    const wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    // Fetch additional info from the smart contract
    try {
      const walletInfo = await getWalletInfoFromContract(walletAddress);
      const walletWithInfo = {
        ...wallet.toObject(),
        flaggedCount: walletInfo.flaggedCount,
        rating: walletInfo.rating,
      };
      res.json(walletWithInfo);
    } catch (error) {
      console.error(`Error fetching smart contract info for ${walletAddress}:`, error);
      // Return wallet data even if smart contract fetch fails
      res.json(wallet.toObject());
    }
  } catch (err) {
    console.error("Error fetching wallet info:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Flag a wallet in DB and contract.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const flagWalletInDatabaseAndContract = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const { walletAddress, reason } = req.body;
  try {
    // Flag wallet in MongoDB
    let wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      wallet = new Wallet({ address: walletAddress, isFlagged: true, reason });
      await wallet.save();
    } else {
      wallet.isFlagged = true;
      wallet.reason = reason;
      await wallet.save();
    }
    // Flag wallet in the smart contract
    try {
      await flagWalletInContract(walletAddress);
    } catch (error) {
      console.error("Error flagging wallet in smart contract:", error);
      // Optionally handle this failure scenario
      // Uncomment the following line if you want to revert the MongoDB change
      // await Wallet.deleteOne({ address: walletAddress });
    }
    res.json(wallet);
  } catch (err) {
    console.error("Error flagging wallet:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Rate a wallet in the contract.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const rateWalletInContract = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const { walletAddress, rating } = req.body;
  try {
    // Rate wallet in the smart contract
    await rateWalletInContractService(walletAddress, rating); // Use the renamed service function
    res.json({ message: `Wallet ${walletAddress} rated successfully.` });
  } catch (err) {
    console.error("Error rating wallet:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Fetch wallet rating from contract.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const fetchWalletRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const walletAddress = req.params.wallet;
  try {
    // Get wallet rating from the smart contract
    const rating = await getWalletRatingFromContract(walletAddress);
    res.json({ rating });
  } catch (error) {
    console.error(`Error fetching wallet rating from smart contract for ${walletAddress}:`, error);
    // Return default rating if smart contract fetch fails
    res.json({ rating: 0 });
  }
};

/**
 * Fetch wallet flagged count from contract.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const fetchWalletFlaggedCount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
  }
  const walletAddress = req.params.wallet;
  try {
    // Get wallet flagged count from the smart contract
    const flaggedCount = await getWalletFlaggedCountFromContract(walletAddress);
    res.json({ flaggedCount });
  } catch (error) {
    console.error(`Error fetching wallet flagged count from smart contract for ${walletAddress}:`, error);
    // Return default flagged count if smart contract fetch fails
    res.json({ flaggedCount: 0 });
  }
};