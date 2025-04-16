import Moralis from "moralis";

Moralis.start({
  apiKey: import.meta.env.VITE_MORALIS_API_KEY,
});

// Get wallet balance
export const getWalletBalance = async (walletAddress) => {
  try {
    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address: walletAddress,
      chain: "0x38", // BSC Mainnet or any chain ID
    });
    return response.toJSON();
  } catch (error) {
    console.error("Error fetching wallet balance:", error); // Added error logging
    throw error;
  }
};

// Get wallet transactions
export const getWalletTransactions = async (walletAddress) => {
  try {
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: walletAddress,
      chain: "0x38",
    });
    return response.toJSON();
  } catch (error) {
    console.error("Error fetching wallet transactions:", error); // Added error logging
    throw error;
  }
};