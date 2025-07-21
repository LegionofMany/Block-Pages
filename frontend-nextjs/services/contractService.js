import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export async function flagWalletOnChain(address) {
  const res = await axios.post(`${BACKEND_URL}/api/wallet/flag`, { address });
  return res.data;
}

export async function rateWalletOnChain(address, rating) {
  const res = await axios.post(`${BACKEND_URL}/api/wallet/rate`, { address, rating });
  return res.data;
}

export async function getWalletInfoOnChain(address) {
  const res = await axios.get(`${BACKEND_URL}/api/wallet/info/${address}`);
  return res.data;
}

export async function getWalletRatingOnChain(address) {
  const res = await axios.get(`${BACKEND_URL}/api/wallet/rating/${address}`);
  return res.data;
}

export async function getWalletFlaggedCountOnChain(address) {
  const res = await axios.get(`${BACKEND_URL}/api/wallet/flagged-count/${address}`);
  return res.data;
}

export async function getOwner() {
  const res = await axios.get(`${BACKEND_URL}/api/wallet/owner`);
  return res.data;
}

export async function getWalletStruct(address) {
  const res = await axios.get(`${BACKEND_URL}/api/wallet/struct/${address}`);
  return res.data;
}
