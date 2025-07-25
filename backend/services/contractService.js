import { config } from "dotenv";
import { ethers } from "ethers";
import { createRequire } from "module";
config();
const require = createRequire(import.meta.url);
const CONTRACT_ADDRESS = "0x82208A94D5f3cE2d7ef48B2c463E8865CBfcCc54";

async function main() {
  const ABI = require("../artifacts/contracts/BlockPages.sol/BlockPages.json").abi;
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing RPC_URL or PRIVATE_KEY in environment variables.");
  }
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const walletAddress = "0x96Dd430B665b244677b5c357c959AFC9884bB2C7";
  try {
    const result = await flagWallet(contract, walletAddress);
    console.log(result);
    const walletInfo = await getWalletInfo(contract, walletAddress);
    console.log(walletInfo);
    const rating = await rateWallet(contract, walletAddress, 2);
    console.log(rating);
    const walletRating = await getWalletRating(contract, walletAddress);
    console.log(walletRating);
    const flaggedCount = await getWalletFlaggedCount(contract, walletAddress);
    console.log(flaggedCount);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

export async function flagWallet(contract, walletAddress) {
  try {
    const tx = await contract.flagWallet(walletAddress);
    await tx.wait();
    return `Wallet ${walletAddress} flagged successfully.`;
  } catch (error) {
    console.error("Error in flagWallet:", error);
    throw error;
  }
}

export async function rateWallet(contract, walletAddress, rating) {
  try {
    const tx = await contract.rateWallet(walletAddress, rating);
    await tx.wait();
    return `Wallet ${walletAddress} rated successfully.`;
  } catch (error) {
    console.error("Error in rateWallet:", error);
    throw error;
  }
}

export async function getWalletInfo(contract, walletAddress) {
  try {
    const walletInfo = await contract.getWalletInfo(walletAddress);
    return {
      walletAddress: walletInfo.walletAddress,
      flaggedCount: walletInfo.flaggedCount.toNumber(),
      rating: walletInfo.rating,
    };
  } catch (error) {
    console.error("Error in getWalletInfo:", error);
    return { walletAddress: walletAddress, flaggedCount: 0, rating: 0 };
  }
}

export async function getWalletRating(contract, walletAddress) {
  try {
    const rating = await contract.getWalletRating(walletAddress);
    return rating;
  } catch (error) {
    console.error("Error in getWalletRating:", error);
    return 0;
  }
}

export async function getWalletFlaggedCount(contract, walletAddress) {
  try {
    const flaggedCount = await contract.getWalletFlaggedCount(walletAddress);
    return flaggedCount;
  } catch (error) {
    console.error("Error in getWalletFlaggedCount:", error);
    return 0;
  }
}

// Add this function to allow controllers to fetch wallet info from the contract
export async function getWalletInfoFromContract(walletAddress) {
  const ABI = require("../artifacts/contracts/BlockPages.sol/BlockPages.json").abi;
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing RPC_URL or PRIVATE_KEY in environment variables.");
  }
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
  return await getWalletInfo(contract, walletAddress);
}

// Fetch all flagged wallets from the smart contract by scanning a range of addresses (for demo purposes)
export async function getAllFlaggedWalletsOnChain() {
  const ABI = require("../artifacts/contracts/BlockPages.sol/BlockPages.json").abi;
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing RPC_URL or PRIVATE_KEY in environment variables.");
  }
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  // NOTE: This demo assumes you have a way to enumerate wallet addresses. In production, use events or an indexer.
  // Here, we scan the last 1000 flagged events for unique addresses.
  const filter = contract.filters.WalletFlagged();
  const events = await contract.queryFilter(filter, -10000); // last 10,000 blocks
  const flaggedAddresses = [...new Set(events.map(e => e.args.wallet.toLowerCase()))];
  // Fetch info for each flagged wallet
  const flaggedWallets = await Promise.all(flaggedAddresses.map(async (address) => {
    const info = await getWalletInfo(contract, address);
    return { address, ...info };
  }));
  return flaggedWallets;
}

main().catch(console.error);