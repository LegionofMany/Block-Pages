import React from 'react';
import FlaggedWallets from "../components/FlaggedWallets";

function FlaggedWallet({ showToast }) {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
      <h2 className="text-2xl font-bold mb-4">Flagged Wallets</h2>
      <FlaggedWallets showToast={showToast} />
    </div>
  );
}

export default FlaggedWallet;