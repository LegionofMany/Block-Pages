export async function getNativeBalance(address) {
  return { address, balance: 0 };
}
export async function getTokenBalance(address, token) {
  return { address, token, balance: 0 };
}
// Stub for blockchain service
export const NETWORKS = {
  ethereum: {},
  bsc: {},
  polygon: {}
};
