"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { token } = params; // Get the token from the URL

  useEffect(() => {
    if (!token) {
      setError("No reset token provided.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setMessage(data.message || "Your password has been reset successfully.");
        setTimeout(() => router.push("/login"), 2000); // Redirect to login after success
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Reset password frontend error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" mb={2}>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={loading || !token}
          sx={{ mt: 2 }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Box>
  );
}
