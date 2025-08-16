"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type WalletProviderType = "metamask" | "coinbase" | "walletconnect";

interface WalletContextProps {
  provider: WalletProviderType | null;
  address: string | null;
  error: string | null;
  connect: (provider: WalletProviderType) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<WalletProviderType | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  const connect = async (providerType: WalletProviderType) => {
    setProvider(providerType);
    setError(null);
    try {
      // MetaMask SIWE flow
      if (providerType === "metamask" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        // Fetch nonce from backend
        const nonceRes = await fetch("/api/auth/nonce");
        const { nonce } = await nonceRes.json();
        // Sign nonce
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [nonce, address],
        });
        // Verify signature with backend
        const verifyRes = await fetch("/api/auth/siwe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, signature, nonce }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setAddress(address);
          // Call AuthContext metamaskLogin to set auth.user
          await auth.metamaskLogin(address);
        } else {
          setError("SIWE verification failed: " + (verifyData.error || "Unknown error"));
        }
      }
      // Coinbase Wallet integration (stub)
      else if (providerType === "coinbase") {
        // TODO: Integrate Coinbase Wallet SDK
        setError("Coinbase Wallet integration coming soon.");
      }
      // WalletConnect integration (stub)
      else if (providerType === "walletconnect") {
        // TODO: Integrate WalletConnect SDK
        setError("WalletConnect integration coming soon.");
      }
      else {
        setError("Unsupported wallet provider");
      }
    } catch (err: any) {
      setError(err.message || "Wallet connection failed");
    }
  };

  const disconnect = () => {
    setProvider(null);
    setAddress(null);
    setError(null);
  };

  return (
    <WalletContext.Provider value={{ provider, address, error, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
}
