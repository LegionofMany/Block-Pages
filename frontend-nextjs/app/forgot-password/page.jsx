"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send reset link.");
      } else {
        setMessage(data.message || "Password reset link sent to your email.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Forgot password frontend error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" mb={2}>Forgot Password</Typography>
      <Typography variant="body1" mb={3}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
                              onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => router.push("/login")}
          sx={{ mt: 1 }}
        >
          Back to Login
        </Button>
      </form>
    </Box>
  );
}
