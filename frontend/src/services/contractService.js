import { ethers } from "ethers";
import contractArtifact from "../smart-contracts/BlockPages.json";
import { getContractAddress } from "./env";

function getContract(signerOrProvider) {
  return new ethers.Contract(getContractAddress(), contractArtifact.abi, signerOrProvider);
}

async function getProviderAndSigner() {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
}

export async function flagWalletOnChain(walletAddress) {
  const { signer } = await getProviderAndSigner();
  const contract = getContract(signer);
  const tx = await contract.flagWallet(walletAddress);
  return tx.wait();
}

export async function rateWalletOnChain(walletAddress, rating) {
  const { signer } = await getProviderAndSigner();
  const contract = getContract(signer);
  const tx = await contract.rateWallet(walletAddress, rating);
  return tx.wait();
}

export async function getWalletInfoOnChain(walletAddress) {
  const { provider } = await getProviderAndSigner();
  const contract = getContract(provider);
  return contract.getWalletInfo(walletAddress);
}

export async function getWalletRatingOnChain(walletAddress) {
  const { provider } = await getProviderAndSigner();
  const contract = getContract(provider);
  return contract.getWalletRating(walletAddress);
}

export async function getWalletFlaggedCountOnChain(walletAddress) {
  const { provider } = await getProviderAndSigner();
  const contract = getContract(provider);
  return contract.getWalletFlaggedCount(walletAddress);
}

export async function getOwner() {
  const { provider } = await getProviderAndSigner();
  const contract = getContract(provider);
  return contract.owner();
}

export async function getWalletStruct(walletAddress) {
  const { provider } = await getProviderAndSigner();
  const contract = getContract(provider);
  return contract.wallets(walletAddress);
}
