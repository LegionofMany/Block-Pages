import React, { useState, useEffect } from "react";
import { NETWORKS, getNativeBalance, getTokenBalance } from "../services/blockchain";
import { Box, Typography, Select, MenuItem, TextField, Button, CircularProgress } from "@mui/material";

const COMMON_TOKENS = {
  ethereum: [
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
    { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" }
  ],
  bsc: [
    { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955" },
    { symbol: "BUSD", address: "0xe9e7cea3dedca5984780bafc599bd69add087d56" }
  ],
  polygon: [
    { symbol: "USDT", address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803" },
    { symbol: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" }
  ]
};

export default function WalletBalances({ address }) {
  const [network, setNetwork] = useState("ethereum");
  const [nativeBalance, setNativeBalance] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customToken, setCustomToken] = useState("");
  const [customTokenResult, setCustomTokenResult] = useState(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setNativeBalance(null);
    setTokenBalances([]);
    Promise.all([
      getNativeBalance(address, network),
      ...COMMON_TOKENS[network].map(t => getTokenBalance(address, t.address, network))
    ]).then(([native, ...tokens]) => {
      setNativeBalance(native);
      setTokenBalances(tokens);
    }).finally(() => setLoading(false));
  }, [address, network]);

  const handleCustomToken = async () => {
    setCustomTokenResult(null);
    if (!customToken) return;
    try {
      const result = await getTokenBalance(address, customToken, network);
      setCustomTokenResult(result);
    } catch {
      setCustomTokenResult({ error: "Invalid token address or no balance." });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Wallet Balances</Typography>
      <Box sx={{ mb: 2 }}>
        <Select value={network} onChange={e => setNetwork(e.target.value)}>
          {Object.keys(NETWORKS).map(net => (
            <MenuItem key={net} value={net}>{NETWORKS[net].name}</MenuItem>
          ))}
        </Select>
      </Box>
      {loading ? <CircularProgress /> : (
        <>
          <Typography>Native Balance: {nativeBalance} {network === "ethereum" ? "ETH" : network === "bsc" ? "BNB" : "MATIC"}</Typography>
          {tokenBalances.map((t, i) => (
            <Typography key={i}>{COMMON_TOKENS[network][i].symbol}: {t.balance}</Typography>
          ))}
        </>
      )}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Check Custom Token</Typography>
        <TextField size="small" label="Token Address" value={customToken} onChange={e => setCustomToken(e.target.value)} sx={{ mr: 1 }} />
        <Button variant="outlined" onClick={handleCustomToken}>Check</Button>
        {customTokenResult && (
          <Typography sx={{ mt: 1 }} color={customTokenResult.error ? "error" : "inherit"}>
            {customTokenResult.error ? customTokenResult.error : `${customTokenResult.symbol}: ${customTokenResult.balance}`}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
