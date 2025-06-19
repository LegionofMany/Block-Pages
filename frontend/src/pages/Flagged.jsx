import React from 'react';
import FlaggedWallets from "../components/FlaggedWallets";
import { Box } from '@mui/material';

function FlaggedWallet({ showToast }) {
  return (
    <Box className="blockchain-page-card">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <h2 className="text-2xl font-bold mb-4">Flagged Wallets</h2>
        <FlaggedWallets showToast={showToast} />
      </div>
    </Box>
  );
}

export default FlaggedWallet;