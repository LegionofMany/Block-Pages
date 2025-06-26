import React, { useState } from "react";
import { Box, Typography, TextField, Button, Select, MenuItem, Paper } from "@mui/material";
import { getWalletBalanceBackend, getWalletTransactionsBackend } from "../services/moralisBackend";

export default function MoralisDemo() {
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("eth");
  const [balance, setBalance] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setBalance(null);
    setTxs([]);
    try {
      const trimmedWallet = wallet.trim();
      const bal = await getWalletBalanceBackend(trimmedWallet, chain);
      setBalance(bal);
      const tx = await getWalletTransactionsBackend(trimmedWallet, chain);
      setTxs(tx.result || tx);
    } catch (e) {
      setError(e.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 600, mx: "auto", background: "rgba(36,59,85,0.7)", color: "#fff", borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Moralis Backend Demo</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField label="Wallet Address" value={wallet} onChange={e => setWallet(e.target.value)} fullWidth InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#b2c2d6' } }} />
        <Select value={chain} onChange={e => setChain(e.target.value)} sx={{ minWidth: 120, color: '#fff' }}>
          <MenuItem value="eth">Ethereum</MenuItem>
          <MenuItem value="bsc">BSC</MenuItem>
          <MenuItem value="polygon">Polygon</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleFetch} disabled={loading || !wallet}>Fetch</Button>
      </Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {balance && (
        <Typography sx={{ mt: 2 }}>Balance: <b>{balance.balance || JSON.stringify(balance)}</b></Typography>
      )}
      {txs && txs.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Recent Transactions:</Typography>
          <ul style={{ color: '#fff' }}>
            {txs.slice(0, 5).map((tx, i) => (
              <li key={tx.hash || i}>{tx.hash ? tx.hash.substring(0, 20) : ""}...</li>
            ))}
          </ul>
        </Box>
      )}
    </Paper>
  );
}
