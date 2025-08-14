"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import MetaMaskConnect from "../../components/MetaMaskConnect"; // Import MetaMaskConnect component
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook


export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Keep local loading for form submission
  const [toast, setToast] = useState({ message: "", type: "info" });
  const router = useRouter();
  const { register, metamaskLogin } = useAuth(); // Use auth context functions

  const showToast = (message, type = "info") => setToast({ message, type });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log("Registering with form:", form);
      const result = await register(form.email, form.password); // Use register from AuthContext

      if (result.success) {
        showToast("Registration successful! Redirecting to login...", "success");
        console.log("Attempting redirect to login page...");
        router.push("/login");
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
    // This function is called when MetaMaskConnect successfully connects
    // Now, use metamaskLogin from AuthContext to authenticate/register
    setError("");
    try {
      const result = await metamaskLogin(account); // Use metamaskLogin from AuthContext

      if (result.success) {
        showToast(`MetaMask connected and registered/logged in with account: ${account}`, "success");
        console.log("Attempting redirect to login page...");
        router.push("/login");
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
      {/* Integrate MetaMaskConnect component */}
      <MetaMaskConnect onConnect={handleMetaMaskConnect} />
      {toast.message && (
        <Alert severity={toast.type} sx={{ mt: 2 }} onClose={() => setToast({ message: "", type: "info" })}>
          {toast.message}
        </Alert>
      )}
    </Box>
  );
}
