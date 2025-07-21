import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export async function getWalletBalanceBackend(address, chain) {
  const res = await axios.get(`${BACKEND_URL}/api/moralis/balance/${address}?chain=${chain}`);
  return res.data;
}

export async function getWalletTransactionsBackend(address, chain) {
  const res = await axios.get(`${BACKEND_URL}/api/moralis/transactions/${address}?chain=${chain}`);
  return res.data;
}
