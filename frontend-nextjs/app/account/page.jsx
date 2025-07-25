import React from "react";
import { Box, Typography } from "@mui/material";
import WalletBalances from "../../components/WalletBalances";
import TokenSwap from "../../components/TokenSwap";

const Account = ({ user }) => {
  if (!user) return null;
  return (
    <Box className="blockchain-page-card">
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>My Account</Typography>
        <Typography variant="body1">Username: {user.username}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Role: {user.role}</Typography>
        {user.walletAddress && (
          <>
            <WalletBalances address={user.walletAddress} />
            <TokenSwap address={user.walletAddress} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Account;
