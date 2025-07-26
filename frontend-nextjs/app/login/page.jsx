
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { login } from "../../services/api";
import { signInWithMetaMask } from "../../services/metamaskAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const router = useRouter();

  const showToast = (message, type = "info") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      showToast("Login successful! Welcome back.", "success");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err?.response?.data?.error || "User not found or invalid credentials. Please register.");
      } else {
        setError(err?.response?.data?.error || "Login failed");
      }
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskLogin = async () => {
    setMetaMaskLoading(true);
    setError("");
    try {
      const res = await signInWithMetaMask();
      if (res && res.user) {
        showToast("MetaMask login successful! Welcome back.", "success");
        setTimeout(() => router.push("/"), 1000);
      } else {
        setError("MetaMask login failed: No user returned from backend.");
        showToast("MetaMask login failed", "error");
      }
    } catch (err) {
      setError(err.message || "MetaMask login failed");
      showToast("MetaMask login failed", "error");
    } finally {
      setMetaMaskLoading(false);
    }
  };

  return (
    <Box className="blockchain-auth-card" sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'background.paper', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center">Login</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="current-password"
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
        <Typography sx={{ mx: 2, color: 'grey.600', fontWeight: 500 }}>or</Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mb: 1, fontWeight: 600 }}
        onClick={handleMetaMaskLogin}
        disabled={metaMaskLoading}
      >
        {metaMaskLoading ? "Connecting..." : "Sign in with MetaMask"}
      </Button>
      {toast.message && (
        <Alert severity={toast.type} sx={{ mt: 2 }} onClose={() => setToast({ message: "", type: "info" })}>
          {toast.message}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
