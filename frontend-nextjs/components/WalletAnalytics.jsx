import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getWalletTransactionsBackend } from "../services/moralisBackend";

export default function WalletAnalytics({ address }) {
  const [loading, setLoading] = useState(true);
  const [txs, setTxs] = useState([]);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, received: 0, sent: 0 });

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError("");
    getWalletTransactionsBackend(address, "bsc")
      .then((data) => {
        const txList = data.result || data;
        setTxs(txList);
        let received = 0, sent = 0;
        txList.forEach(tx => {
          if (tx.to && tx.to.toLowerCase() === address.toLowerCase()) received++;
          if (tx.from && tx.from.toLowerCase() === address.toLowerCase()) sent++;
        });
        setStats({ total: txList.length, received, sent });
      })
      .catch(() => setError("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6">Wallet Analytics</Typography>
      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <>
          <Typography>Total Transactions: {stats.total}</Typography>
          <Typography>Received: {stats.received}</Typography>
          <Typography>Sent: {stats.sent}</Typography>
          {/* Simple bar chart */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Box sx={{ width: 40, height: stats.received * 3, bgcolor: 'primary.main' }} title="Received" />
            <Box sx={{ width: 40, height: stats.sent * 3, bgcolor: 'secondary.main' }} title="Sent" />
          </Box>
          <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
            <Typography variant="caption">Received</Typography>
            <Typography variant="caption">Sent</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
