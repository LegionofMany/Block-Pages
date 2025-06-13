import React, { useEffect, useState } from 'react';
import WalletChecker from "../components/WalletChecker";
import FlagWallet from "../components/FlagWallet";
import RateWallet from "../components/RateWallet";
import AIAnalyzer from "../components/AIAnalyzer";
import WalletRatingInfo from "../components/WalletRatingInfo";
import MetaMaskConnect from "../components/MetaMaskConnect";
import { flagWalletOnChain, rateWalletOnChain, getWalletInfoOnChain } from "../services/contractService";

function WalletSearch({ showToast }) {
  const [wallet, setWallet] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [rating, setRating] = useState(1);
  const [onChainInfo, setOnChainInfo] = useState(null);
  const [onChainLoading, setOnChainLoading] = useState(false);
  const [onChainError, setOnChainError] = useState("");

  // Handlers for direct contract actions
  const handleFlagOnChain = async () => {
    setLoadingFlag(true);
    try {
      await flagWalletOnChain(wallet);
      showToast("Wallet flagged on-chain!", "success");
    } catch (err) {
      showToast(err.message || "Error flagging on-chain.", "error");
    } finally {
      setLoadingFlag(false);
    }
  };
  const handleRateOnChain = async () => {
    setLoadingRate(true);
    try {
      await rateWalletOnChain(wallet, rating);
      showToast("Wallet rated on-chain!", "success");
    } catch (err) {
      showToast(err.message || "Error rating on-chain.", "error");
    } finally {
      setLoadingRate(false);
    }
  };

  useEffect(() => {
    if (userAddress && wallet) {
      setOnChainLoading(true);
      setOnChainError("");
      getWalletInfoOnChain(wallet)
        .then((info) => setOnChainInfo(info))
        .catch((err) => setOnChainError(err.message || "Failed to fetch on-chain info."))
        .finally(() => setOnChainLoading(false));
    } else {
      setOnChainInfo(null);
      setOnChainError("");
    }
  }, [userAddress, wallet]);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Search Wallets</h2>
      <MetaMaskConnect onConnect={setUserAddress} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mb-4"
      >
        <input
          type="text"
          placeholder="Enter Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </form>

      {wallet && <WalletChecker walletAddress={wallet} showToast={showToast} />}
      {wallet && <FlagWallet walletAddress={wallet} showToast={showToast} />}
      {wallet && <WalletRatingInfo walletAddress={wallet} showToast={showToast} />}
      {wallet && <RateWallet walletAddress={wallet} showToast={showToast} />}
      {wallet && <AIAnalyzer walletAddress={wallet} showToast={showToast} />}

      {/* Direct contract actions if MetaMask connected */}
      {userAddress && wallet && (
        <div className="my-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2 text-purple-700">On-Chain Actions</h3>
          <div className="mb-2">
            {onChainLoading ? (
              <span className="text-gray-500">Loading on-chain info...</span>
            ) : onChainError ? (
              <span className="text-red-600">{onChainError}</span>
            ) : onChainInfo ? (
              <div className="text-sm text-gray-800">
                <b>On-Chain Flagged Count:</b> {onChainInfo.flaggedCount?.toString?.() ?? "-"} <br />
                <b>On-Chain Rating:</b> {onChainInfo.rating?.toString?.() ?? "-"}
              </div>
            ) : null}
          </div>
          <button
            onClick={handleFlagOnChain}
            disabled={loadingFlag}
            className="bg-purple-600 text-white px-3 py-1 rounded mr-2 disabled:opacity-50 hover:bg-purple-700 transition"
          >
            {loadingFlag ? "Flagging..." : "Flag Wallet On-Chain"}
          </button>
          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="mx-2 border rounded px-2 py-1"
            aria-label="Wallet rating on-chain"
          >
            <option value={1}>1 (Low)</option>
            <option value={2}>2 (Medium)</option>
            <option value={3}>3 (High)</option>
          </select>
          <button
            onClick={handleRateOnChain}
            disabled={loadingRate}
            className="bg-purple-600 text-white px-3 py-1 rounded disabled:opacity-50 hover:bg-purple-700 transition"
          >
            {loadingRate ? "Rating..." : "Rate Wallet On-Chain"}
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletSearch;