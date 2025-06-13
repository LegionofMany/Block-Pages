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
      setAccount(accounts[0]);
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      setError(err.message || "Failed to connect wallet.");
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
