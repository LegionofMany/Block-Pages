import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { register } from "../services/api";
import { signInWithMetaMask } from "../services/metamaskAuth";
import { useNavigate } from "react-router-dom";
import MetaMaskIcon from '../assets/react.svg'; // Replace with actual MetaMask icon if available

export default function Register({ onRegister, showToast }) {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "", walletAddress: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      showToast && showToast("Registration successful! You can now log in.", "success");
      onRegister && onRegister();
      navigate("/login");
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
      const res = await signInWithMetaMask();
      showToast && showToast("MetaMask registration successful! You can now log in.", "success");
      onRegister && onRegister(res);
      navigate("/login"); // Always redirect to login after registration
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("This wallet is already registered. Redirecting to login...");
        navigate("/login"); // Immediately redirect to login if already registered
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
    <Box className="blockchain-auth-card" sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 1 }}>Register</Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2, color: 'grey.700' }}>
        Welcome to BlockPages 411! Create your account to access the global Web3 wallet directory and assistance tools. You can register with email or instantly with MetaMask.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Wallet Address" name="walletAddress" value={form.walletAddress} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
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
      {error && metaMaskLoading && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}
      {error && error.toLowerCase().includes("metamask") && (
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Trouble with MetaMask? Login with Email
        </Button>
      )}
    </Box>
  );
}
