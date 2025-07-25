"use client";
import React from 'react';
import FlaggedWallets from "../../components/FlaggedWallets";
import { Box } from '@mui/material';


const FlaggedWallet = () => {
  // Optionally, you can implement a local toast handler here if needed
  return (
    <Box className="blockchain-page-card">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
        <h2 className="text-2xl font-bold mb-4">Flagged Wallets</h2>
        <FlaggedWallets />
      </div>
    </Box>
  );
};

export default FlaggedWallet;
