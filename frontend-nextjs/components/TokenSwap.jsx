"use client";
// ...existing code from frontend/src/components/TokenSwap.jsx...
import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, TextField, Button, CircularProgress } from "@mui/material";
import { NETWORKS } from "../services/blockchain";

const ONEINCH_API = {
  ethereum: "https://api.1inch.io/v5.0/1",
  bsc: "https://api.1inch.io/v5.0/56",
  polygon: "https://api.1inch.io/v5.0/137"
};

export default function TokenSwap({ address }) {
  const [network, setNetwork] = useState("ethereum");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    setQuote(null);
    try {
      const url = `${ONEINCH_API[network]}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.description || "Quote error");
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async () => {
    setError("");
    setTxHash("");
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");
      // Get swap tx data from 1inch
      const url = `${ONEINCH_API[network]}/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&fromAddress=${address}&slippage=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.description || "Swap error");
      // Send tx via MetaMask
      const txParams = data.tx;
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams]
      });
      setTxHash(txHash);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Token Swap</Typography>
      <Box sx={{ mb: 2 }}>
        <Select value={network} onChange={e => setNetwork(e.target.value)}>
          {Object.keys(NETWORKS).map(net => (
            <MenuItem key={net} value={net}>{NETWORKS[net].name}</MenuItem>
          ))}
        </Select>
      </Box>
      <TextField label="From Token Address" value={fromToken} onChange={e => setFromToken(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="To Token Address" value={toToken} onChange={e => setToToken(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Amount (in wei)" value={amount} onChange={e => setAmount(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" onClick={fetchQuote} disabled={loading}>Get Quote</Button>
      {loading && <CircularProgress sx={{ ml: 2 }} />}
      {quote && (
        <Box sx={{ mt: 2 }}>
          <Typography>Estimated: {quote.toTokenAmount / 10 ** quote.toToken.decimals} {quote.toToken.symbol}</Typography>
          <Button variant="outlined" onClick={executeSwap} sx={{ mt: 1 }}>Swap via MetaMask</Button>
        </Box>
      )}
      {txHash && <Typography sx={{ mt: 2, color: "green" }}>Swap sent! Tx: {txHash}</Typography>}
      {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
    </Box>
  );
}
