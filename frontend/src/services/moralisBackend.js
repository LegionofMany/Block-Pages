import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";

export const getWalletBalanceBackend = async (walletAddress, chain = "eth") => {
  const res = await axios.get(`${API_URL}/api/moralis/balance/${walletAddress}?chain=${chain}`);
  return res.data;
};

export const getWalletTransactionsBackend = async (walletAddress, chain = "eth") => {
  const res = await axios.get(`${API_URL}/api/moralis/transactions/${walletAddress}?chain=${chain}`);
  return res.data;
};

export const getGasPriceBackend = async (chain = "eth") => {
  const res = await axios.get(`${API_URL}/api/moralis/gas-price?chain=${chain}`);
  return res.data;
};

export const estimateTransactionFeeBackend = async (from, to, amount, chain = "eth") => {
  const res = await axios.get(`${API_URL}/api/moralis/estimate-fee?from=${from}&to=${to}&amount=${amount}&chain=${chain}`);
  return res.data;
};

export const getBlockDataBackend = async (blockNumber, chain = "eth") => {
  const res = await axios.get(`${API_URL}/api/moralis/block/${blockNumber}?chain=${chain}`);
  return res.data;
};
