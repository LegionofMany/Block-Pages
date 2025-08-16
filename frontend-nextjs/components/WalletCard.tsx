import React, { useState, useEffect } from "react";

export default function WalletCard() {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setWalletData({ address: "0x123...abcd", balance: "2.5 ETH" });
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <div style={{ padding: 16, background: "#eee" }}>Loading wallet...</div>;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
      <b>Address:</b> {walletData.address}<br />
      <b>Balance:</b> {walletData.balance}
    </div>
  );
}
