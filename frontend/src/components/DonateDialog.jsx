import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Alert } from "@mui/material";

export default function DonateDialog({ open, onClose, charity }) {
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    setError("");
    setTxHash("");
    try {
      // TODO: Integrate with The Giving Block or your own smart contract for donation
      // For now, just simulate a successful donation
      setTimeout(() => {
        setTxHash("0x1234...fakehash");
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Donation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Donate to {charity?.name}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{charity?.description}</Typography>
        <TextField
          label="Donation Amount (USD)"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        {txHash && <Alert severity="success">Donation successful! Tx Hash: {txHash}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleDonate} variant="contained" disabled={loading || !amount}>{loading ? "Processing..." : "Donate"}</Button>
      </DialogActions>
    </Dialog>
  );
}
