
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useAuth } from "../../context/AuthContext";
import MetaMaskConnect from "../../components/MetaMaskConnect";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const router = useRouter();
  const { register, metamaskLogin } = useAuth();

  const showToast = (message, type = "info") => setToast({ message, type });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await register(form.name, form.email, form.password);
      if (result.success) {
        showToast("Registration successful! Redirecting...", "success");
      } else {
        const errorMessage = result.message || "Registration failed";
        setError(errorMessage);
        showToast(errorMessage, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskConnect = async (account) => {
    setError("");
    try {
      const result = await metamaskLogin(account);
      if (result.success) {
        showToast(`Welcome! Logged in with MetaMask account: ${account.substring(0, 6)}...`, "success");
      } else {
        setError(result.message || "MetaMask registration failed.");
        showToast("MetaMask registration failed", "error");
      }
    } catch (err) {
      setError("An unexpected error occurred during MetaMask registration.");
      showToast("MetaMask registration failed", "error");
    }
  };

  return (
    <Box maxWidth={420} mx="auto" mt={8} p={0}>
      <Box sx={{ boxShadow: 4, borderRadius: 3, bgcolor: 'background.paper', p: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <PersonAddAltIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h4" fontWeight={700} letterSpacing={1} mb={1}>Register</Typography>
          <Typography variant="body2" color="grey.700" align="center">
            Welcome to BlockPages 411! Create your account to access the global Web3 wallet directory and assistance tools. You can register with email or instantly with MetaMask.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required autoComplete="name" />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" type="email" autoComplete="email" required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" autoComplete="new-password" required />
          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, fontWeight: 600 }} startIcon={<LockOpenIcon />}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
          <Typography sx={{ mx: 2, color: 'grey.600', fontWeight: 500 }}>or</Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
        </Box>
        {/* Integrate MetaMaskConnect component */}
        <MetaMaskConnect onConnect={handleMetaMaskConnect} />
        {toast.message && (
          <Alert severity={toast.type} sx={{ mt: 2 }} onClose={() => setToast({ message: "", type: "info" })}>
            {toast.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
