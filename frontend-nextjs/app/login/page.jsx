
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";
import { login } from "../../services/api";
import { signInWithMetaMask } from "../../services/metamaskAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaMaskLoading, setMetaMaskLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const showToast = (message, type = "info") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowRegister(false);
    try {
      const res = await login(email, password);
      showToast("Login successful! Welcome back.", "success");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      if (err?.response?.status === 401) {
        setError(err?.response?.data?.error || "User not found or invalid credentials. Please register.");
        setShowRegister(true);
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
      setError("MetaMask login failed");
      showToast("MetaMask login failed", "error");
    } finally {
      setMetaMaskLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" mb={2}>Login</Typography>
      {toast.message && <Alert severity={toast.type} sx={{ mb: 2 }}>{toast.message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {showRegister && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          )}
        </Stack>
      </form>
      <Box display="flex" alignItems="center" my={3}>
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
