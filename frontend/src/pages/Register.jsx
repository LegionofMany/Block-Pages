import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { register } from "../services/api";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "", walletAddress: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      onRegister && onRegister();
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Wallet Address" name="walletAddress" value={form.walletAddress} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}
