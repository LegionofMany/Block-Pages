// ...existing code from frontend/src/components/MetaMaskConnect.jsx...

import React, { useState } from "react";

function MetaMaskConnect({ onConnect }) {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    setError("");
    if (!window.ethereum) {
      setError("MetaMask is not installed.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const connectedAccount = accounts[0];
      setAccount(connectedAccount);

      // Call the new API route for MetaMask login
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'metamask-login', walletAddress: connectedAccount }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("MetaMask login successful:", data.message);
        if (onConnect) onConnect(connectedAccount); // Pass the connected account to the parent
      } else {
        setError(data.message || "MetaMask login failed.");
        console.error("MetaMask login failed:", data.message);
      }

    } catch (err) {
      setError(err.message || "Failed to connect wallet or login.");
    }
  };

  return (
    <div className="mb-4">
      {account ? (
        <span className="text-green-700 font-mono">Connected: {account}</span>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Connect MetaMask
        </button>
      )}
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}

export default MetaMaskConnect;
