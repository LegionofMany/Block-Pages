import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";

export default function ConnectButton() {
  const { provider, address, error, connect, disconnect } = useWallet();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string>("");

  const handleConnect = async (type: any) => {
    setLoading(true);
    try {
      await connect(type);
      setToast(`Connected with ${type}`);
    } catch (err: any) {
      setToast("Connection failed");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div>
      {address ? (
        <>
          <span>Connected: {address} ({provider})</span>
          <button onClick={disconnect} style={{ marginLeft: 8 }}>Disconnect</button>
        </>
      ) : (
        <>
          <button onClick={() => handleConnect("metamask")} disabled={loading}>Connect MetaMask</button>
          <button onClick={() => handleConnect("coinbase")} disabled={loading}>Connect Coinbase</button>
          <button onClick={() => handleConnect("walletconnect")} disabled={loading}>Connect WalletConnect</button>
        </>
      )}
      {loading && <span style={{ marginLeft: 8 }}>Connecting...</span>}
      {toast && <div style={{ marginTop: 8, color: "green" }}>{toast}</div>}
      {error && <div style={{ marginTop: 8, color: "red" }}>{error}</div>}
    </div>
  );
}
