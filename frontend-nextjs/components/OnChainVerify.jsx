// ...existing code from frontend/src/components/OnChainVerify.jsx...

import React, { useState } from "react";
import { getWalletInfoOnChain } from "../services/contractService";
import { Button, Typography, Box, Alert } from "@mui/material";

export default function OnChainVerify({ walletAddress }) {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getWalletInfoOnChain(walletAddress);
      setInfo(res);
    } catch (err) {
      setError("On-chain verification failed");
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Button variant="outlined" onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify On-Chain"}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      {info && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">On-Chain Info:</Typography>
          <Typography>Flagged Count: {info.flaggedCount?.toString?.() ?? "-"}</Typography>
          <Typography>Rating: {info.rating?.toString?.() ?? "-"}</Typography>
        </Box>
      )}
    </Box>
  );
}
