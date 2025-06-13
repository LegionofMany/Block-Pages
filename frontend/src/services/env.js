// src/services/env.js
export function getContractAddress() {
  return import.meta.env.VITE_CONTRACT_ADDRESS;
}
export function getMoralisApiKey() {
  return import.meta.env.VITE_MORALIS_API_KEY;
}
