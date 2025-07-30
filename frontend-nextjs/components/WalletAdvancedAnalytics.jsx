import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getWalletTransactionsBackend } from "../services/moralisBackend";

// Helper to group transactions by day
function groupByDay(txs) {
  const days = {};
  txs.forEach(tx => {
    const date = new Date(tx.block_timestamp).toLocaleDateString();
    days[date] = (days[date] || 0) + 1;
  });
  return days;
}

export default function WalletAdvancedAnalytics({ address }) {
  const [loading, setLoading] = useState(true);
  const [txs, setTxs] = useState([]);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState({});
  const [largestTx, setLargestTx] = useState(null);
  const [counterparties, setCounterparties] = useState({});

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError("");
    getWalletTransactionsBackend(address, "bsc")
      .then((data) => {
        const txList = data.result || data;
        setTxs(txList);
        // Group by day
        setActivity(groupByDay(txList));
        // Find largest transaction
        let maxTx = null;
        txList.forEach(tx => {
          if (!maxTx || Number(tx.value) > Number(maxTx.value)) maxTx = tx;
        });
        setLargestTx(maxTx);
        // Counterparties
        const cp = {};
        txList.forEach(tx => {
          const other = tx.from.toLowerCase() === address.toLowerCase() ? tx.to : tx.from;
          cp[other] = (cp[other] || 0) + 1;
        });
        setCounterparties(cp);
      })
      .catch(() => setError("Failed to load advanced analytics"))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6">Advanced Wallet Analytics</Typography>
      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <>
          <Typography variant="subtitle2">Activity (Txs per Day):</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'end', mt: 1 }}>
            {Object.entries(activity).map(([day, count]) => (
              <Box key={day} sx={{ width: 18, height: count * 6, bgcolor: 'primary.main' }} title={day} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            {Object.keys(activity).map(day => (
              <Typography key={day} variant="caption">{day.slice(0,5)}</Typography>
            ))}
          </Box>
          {largestTx && (
            <Typography sx={{ mt: 2 }}>Largest Tx: {Number(largestTx.value) / 1e18} BNB (Hash: <a href={`https://bscscan.com/tx/${largestTx.hash}`} target="_blank" rel="noopener noreferrer">{largestTx.hash.slice(0, 10)}...{largestTx.hash.slice(-6)}</a>)</Typography>
          )}
          <Typography sx={{ mt: 2 }} variant="subtitle2">Top Counterparties:</Typography>
          <Box>
            {Object.entries(counterparties).sort((a,b) => b[1]-a[1]).slice(0,5).map(([addr, count]) => (
              <Typography key={addr} variant="body2">{addr.slice(0,8)}...{addr.slice(-6)}: {count} txs</Typography>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
