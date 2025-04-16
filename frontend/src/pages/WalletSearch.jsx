import React, { useState } from 'react';
import WalletChecker from "../components/WalletChecker";
import FlagWallet from "../components/FlagWallet";

function WalletSearch() {
  const [wallet, setWallet] = useState("");

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Search Wallets</h2> {/* Tailwind heading styles */}
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind input styles
        />
      </form>

      {wallet && <WalletChecker walletAddress={wallet} />}
      {wallet && <FlagWallet walletAddress={wallet} />}
    </div>
  );
}

export default WalletSearch;