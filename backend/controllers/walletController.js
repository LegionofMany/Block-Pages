import Wallet from "../models/Wallet.js";
import {
  flagWallet as flagWalletInContract,
  rateWallet as rateWalletInContractService, // Renamed to avoid conflict
  getWalletInfo as getWalletInfoFromContract,
  getWalletRating as getWalletRatingFromContract,
  getWalletFlaggedCount as getWalletFlaggedCountFromContract,
} from "../services/contractService.js";
export const getFlaggedWallets = async (req, res) => {
  try {
    // Fetch flagged wallets from MongoDB
    const wallets = await Wallet.find({ isFlagged: true });
    // Enhance with data from the smart contract
    const flaggedWalletsWithInfo = await Promise.all(
      wallets.map(async (wallet) => {
        try {
          const walletInfo = await getWalletInfoFromContract(wallet.address);
          return {
            ...wallet.toObject(),
            flaggedCount: walletInfo.flaggedCount,
            rating: walletInfo.rating,
          };
        } catch (error) {
          console.error(`Error fetching smart contract info for ${wallet.address}:`, error);
          // Return wallet data even if smart contract fetch fails
          return wallet.toObject();
        }
      })
    );
    res.json(flaggedWalletsWithInfo);
  } catch (err) {
    console.error("Error fetching flagged wallets:", err);
    res.status(500).json({ error: err.message });
  }
};
export const getWalletInfoWithContract = async (req, res) => {
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
export const flagWalletInDatabaseAndContract = async (req, res) => {
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
export const rateWalletInContract = async (req, res) => {
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
export const fetchWalletRating = async (req, res) => {
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
export const fetchWalletFlaggedCount = async (req, res) => {
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