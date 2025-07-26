"use client";
import React, { useEffect, useState } from 'react';
import WalletChecker from "../../components/WalletChecker";
import FlagWallet from "../../components/FlagWallet";
import RateWallet from "../../components/RateWallet";
import AIAnalyzer from "../../components/AIAnalyzer";
import WalletRatingInfo from "../../components/WalletRatingInfo";
import MetaMaskConnect from "../../components/MetaMaskConnect";
import { flagWalletOnChain, rateWalletOnChain, getWalletInfoOnChain } from "../../services/contractService";
import { Box } from '@mui/material';

export default function WalletSearchPage() {
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
      // Optionally show a toast
    } catch (err) {
      // Optionally show a toast
    } finally {
      setLoadingFlag(false);
    }
  };
  const handleRateOnChain = async () => {
    setLoadingRate(true);
    try {
      await rateWalletOnChain(wallet, rating);
      // Optionally show a toast
    } catch (err) {
      // Optionally show a toast
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
}
