"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { register } from "../../services/api";
import { signInWithMetaMask } from "../../services/metamaskAuth";
import MetaMaskIcon from '../../assets/react.svg';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      // Optionally show a toast or redirect
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskRegister = async () => {
    setMetaMaskLoading(true);
    setError("");
    try {
      await signInWithMetaMask();
      // Optionally show a toast or redirect
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("This wallet is already registered. Redirecting to login...");
      } else if (err.response && err.response.data && err.response.data.error) {
        setError("MetaMask registration failed: " + err.response.data.error);
      } else {
        setError(err.message || "MetaMask registration failed");
      }
    } finally {
      setMetaMaskLoading(false);
    }
  };

  return (
    <Box className="blockchain-auth-card" sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 1 }}>Register</Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2, color: 'grey.700' }}>
        Welcome to BlockPages 411! Create your account to access the global Web3 wallet directory and assistance tools. You can register with email or instantly with MetaMask.
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" type="email" autoComplete="email" />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" autoComplete="new-password" />
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, fontWeight: 600 }}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
        <Typography sx={{ mx: 2, color: 'grey.600', fontWeight: 500 }}>or</Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
      </Box>
      <Button onClick={handleMetaMaskRegister} variant="outlined" color="secondary" fullWidth disabled={metaMaskLoading} sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={MetaMaskIcon} alt="MetaMask" style={{ width: 24, height: 24 }} />
        {metaMaskLoading ? "Connecting..." : "Register with MetaMask"}
      </Button>
    </Box>
  );
}
