// Analytics
export async function getAnalyticsEvents(params) {
  return [];
}

// Directory
export async function upsertDirectoryEntry(form) {
  return { success: true };
}

// FAQ
export async function getFaqs() {
  return [];
}
export async function updateFaq(id, form) {
  return { success: true };
}
export async function addFaq(form) {
  return { success: true };
}
export async function deleteFaq(id) {
  return { success: true };
}

// Assistance 411
export async function ask411(question) {
  return { answer: "Demo answer" };
}

// AI/Wallet
export async function analyzeTransactions(walletAddress) {
  return { analysis: "Demo analysis" };
}
export async function rateWallet(walletAddress, rating) {
  return { success: true };
}
export async function getWalletInfo(address) {
  return { address, info: "Demo info" };
}
export async function getWalletRating(address) {
  return { address, rating: 5 };
}
export async function getWalletFlaggedCount(address) {
  return { address, flaggedCount: 1 };
}
export async function register(form) {
  return { success: true };
}
export async function getFlaggedWallets() {
  // Implement flagged wallets fetch logic here
  return [
    { address: "0x000...", reason: "Demo reason", flaggedCount: 1, rating: 5 },
  ];
}
// Stub for missing API functions
export async function login(email, password) {
  // Implement login logic here
  return { user: { email, username: "demo" } };
}

export async function signInWithMetaMask() {
  // Implement MetaMask login logic here
  return { user: { username: "demo", wallet: "0x000..." } };
}

export async function lookupByPhone(phone) {
  // Implement phone lookup logic here
  return { name: "Demo", address: "0x000...", phone, info: "Demo info" };
}
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export async function searchDirectory(query) {
  const res = await axios.get(`${BACKEND_URL}/directory/search`, { params: { q: query } });
  return res.data;
}

export async function scrapeWalletInfo(address) {
  const res = await axios.get(`${BACKEND_URL}/directory/scrape`, { params: { address } });
  return res.data;
}

export async function logAnalyticsEvent(event) {
  const res = await axios.post(`${BACKEND_URL}/analytics/log`, event);
  return res.data;
}
