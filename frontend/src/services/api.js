import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
// GET flagged wallets
export const getFlaggedWallets = async () => {
  try {
    const response = await api.get("/api/wallets/flagged");
    return response.data;
  } catch (error) {
    console.error("Error fetching flagged wallets:", error);
    throw error;
  }
};
// GET wallet info
export const getWalletInfo = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  
  try {
    const response = await api.get(`/api/wallets/${walletAddress}`); // Use the new route
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet info:", error);
    throw error;
  }
};
// POST flag wallet
export const flagWallet = async (walletAddress, reason) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  if (!reason) {
    throw new Error("Reason for flagging is required");
  }
  try {
    const response = await api.post("/api/wallets/flag", { walletAddress, reason });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error flagging wallet:", error);
    throw error;
  }
};