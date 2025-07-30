"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import WalletBalances from "../../components/WalletBalances";
import TokenSwap from "../../components/TokenSwap";
import WalletChecker from "../../components/WalletChecker";
import WalletAnalytics from "../../components/WalletAnalytics";
import WalletAdvancedAnalytics from "../../components/WalletAdvancedAnalytics";
import WalletFlagsAndDonations from "../../components/WalletFlagsAndDonations";

 
const Account = () => {
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user info
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    fetchUser();
    // Check for connected wallet
    if (typeof window !== "undefined" && window.ethereum && window.ethereum.selectedAddress) {
      setWallet(window.ethereum.selectedAddress);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handler = (accounts) => setWallet(accounts[0] || null);
      window.ethereum.on("accountsChanged", handler);
      return () => window.ethereum.removeListener("accountsChanged", handler);
    }
  }, []);

  const handleConnectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask not found. Please install MetaMask.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed");
    }
  };

  const handleDisconnectWallet = () => {
    setWallet(null);
  };

  return (
    <Box className="blockchain-page-card" sx={{ px: { xs: 1, sm: 2, md: 4 }, py: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: { xs: 2, sm: 4 } }}>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 2, p: { xs: 2, sm: 3 }, mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 32 } }}>My Account</Typography>
          {user && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>Username: <b>{user.username}</b></Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>Email: <b>{user.email}</b></Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>Role: <b>{user.role}</b></Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            {wallet ? (
              <Button variant="outlined" color="primary" onClick={handleDisconnectWallet} fullWidth={true} sx={{ fontWeight: 600 }}>
                Disconnect Wallet ({wallet.slice(0, 6)}...{wallet.slice(-4)})
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleConnectWallet} fullWidth={true} sx={{ fontWeight: 600 }}>
                Connect Wallet
              </Button>
            )}
          </Box>
        </Box>
        {wallet && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <WalletBalances address={wallet} />
            <WalletAnalytics address={wallet} />
            <WalletAdvancedAnalytics address={wallet} />
            <WalletFlagsAndDonations address={wallet} />
            <WalletChecker walletAddress={wallet} />
            <TokenSwap address={wallet} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Account;
