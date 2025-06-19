import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { login } from "../services/api";
import { signInWithMetaMask } from "../services/metamaskAuth";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin, showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      onLogin(res);
      showToast && showToast("Login successful! Welcome back.", "success");
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err?.response?.data?.error || "User not found or invalid credentials. Please register.");
      } else {
        setError(err?.response?.data?.error || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskLogin = async () => {
    setMetaMaskLoading(true);
    setError("");
    try {
      const res = await signInWithMetaMask();
      onLogin(res);
      showToast && showToast("MetaMask login successful! Welcome back.", "success");
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      setError(err.message || "MetaMask login failed");
    } finally {
      setMetaMaskLoading(false);
    }
  };

  return (
    <Box className="blockchain-auth-card" sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleMetaMaskLogin}
        disabled={metaMaskLoading}
      >
        {metaMaskLoading ? "Connecting..." : "Sign in with MetaMask"}
      </Button>
      {error && error.includes("register") && (
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      )}
      {error && error.toLowerCase().includes("metamask") && (
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Trouble with MetaMask? Register with Email
        </Button>
      )}
    </Box>
  );
}
