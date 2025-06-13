import { ethers } from "ethers";
import contractArtifact from "../smart-contracts/BlockPages.json";
import { getContractAddress } from "./env";

export function getContract(signerOrProvider) {
  return new ethers.Contract(getContractAddress(), contractArtifact.abi, signerOrProvider);
}

// Example: flag a wallet (user must connect wallet and sign)
export async function flagWalletOnChain(walletAddress) {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = getContract(signer);
  const tx = await contract.flagWallet(walletAddress);
  return tx.wait();
}

export async function rateWalletOnChain(walletAddress, rating) {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = getContract(signer);
  const tx = await contract.rateWallet(walletAddress, rating);
  return tx.wait();
}

export async function getWalletInfoOnChain(walletAddress) {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = getContract(provider);
  return contract.getWalletInfo(walletAddress);
}
