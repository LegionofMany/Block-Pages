"use client";
import React, { useEffect, useState } from 'react';
import WalletChecker from "../../components/WalletChecker";
import FlagWallet from "../../components/FlagWallet";
import RateWallet from "../../components/RateWallet";
import AIAnalyzer from "../../components/AIAnalyzer";
import WalletRatingInfo from "../../components/WalletRatingInfo";
import MetaMaskConnect from "../../components/MetaMaskConnect";
// All wallet actions now use Next.js API routes
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
      const res = await fetch("/api/wallet/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet, reason: "Flagged from WalletSearch" })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error flagging wallet");
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
      const res = await fetch("/api/wallet/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet, rating })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error rating wallet");
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
      fetch(`/api/wallet/${wallet}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch on-chain info.");
          return res.json();
        })
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
