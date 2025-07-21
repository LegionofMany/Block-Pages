import React, { useEffect, useState } from 'react';
import WalletChecker from "../components/WalletChecker";
import FlagWallet from "../components/FlagWallet";
import RateWallet from "../components/RateWallet";
import AIAnalyzer from "../components/AIAnalyzer";
import WalletRatingInfo from "../components/WalletRatingInfo";
import MetaMaskConnect from "../components/MetaMaskConnect";
import { flagWalletOnChain, rateWalletOnChain, getWalletInfoOnChain } from "../services/contractService";
import { Box } from '@mui/material';

const WalletSearch = ({ showToast }) => {
  const [wallet, setWallet] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [rating, setRating] = useState(1);
  const [onChainInfo, setOnChainInfo] = useState(null);
  const [onChainLoading, setOnChainLoading] = useState(false);
  const [onChainError, setOnChainError] = useState("");

  const handleFlagOnChain = async () => {
    setLoadingFlag(true);
    try {
      await flagWalletOnChain(wallet);
      showToast && showToast("Wallet flagged on-chain!", "success");
    } catch (err) {
      showToast && showToast(err.message || "Error flagging on-chain.", "error");
    } finally {
      setLoadingFlag(false);
    }
  };
  const handleRateOnChain = async () => {
    setLoadingRate(true);
    try {
      await rateWalletOnChain(wallet, rating);
      showToast && showToast("Wallet rated on-chain!", "success");
    } catch (err) {
      showToast && showToast(err.message || "Error rating on-chain.", "error");
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
    <Box className="blockchain-page-card">
      {/* ...existing UI code for WalletSearch page... */}
    </Box>
  );
};

export default WalletSearch;
