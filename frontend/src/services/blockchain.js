import { ethers } from "ethers";

const INFURA_KEY = import.meta.env.VITE_INFURA_KEY;

// Supported networks
export const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpc: `https://mainnet.infura.io/v3/${INFURA_KEY}`
  },
  sepolia: {
    chainId: 11155111,
    name: "Ethereum Sepolia Testnet",
    rpc: `https://sepolia.infura.io/v3/${INFURA_KEY}` // Replace with your real Infura key
  },
  bsc: {
    chainId: 56,
    name: "Binance Smart Chain",
    rpc: "https://bsc-dataseed.binance.org/"
  },
  polygon: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpc: "https://polygon-rpc.com/"
  }
};

export function getProvider(network = "sepolia") {
  const net = NETWORKS[network];
  return new ethers.JsonRpcProvider(net.rpc);
}

export async function getNativeBalance(address, network = "ethereum") {
  const provider = getProvider(network);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

// Example ERC20 ABI (balanceOf, decimals, symbol)
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export async function getTokenBalance(address, tokenAddress, network = "ethereum") {
  const provider = getProvider(network);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [balance, decimals, symbol] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals(),
    contract.symbol()
  ]);
  return {
    symbol,
    balance: Number(balance) / 10 ** decimals
  };
}
