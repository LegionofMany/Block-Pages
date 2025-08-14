"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";
import MetaMaskConnect from "../../components/MetaMaskConnect"; // Import MetaMaskConnect component
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Keep local loading for form submission
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();
  const { login, metamaskLogin } = useAuth(); // Use auth context functions

  const showToast = (message, type = "info") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowRegister(false);
    try {
      const result = await login(email, password); // Use login from AuthContext

      if (result.success) {
        showToast("Login successful! Welcome back.", "success");
        console.log("Attempting redirect to home page...");
        router.push("/");
      } else {
        const errorMessage = result.message || "Login failed";
        setError(errorMessage);
        if (errorMessage.includes("not found") || errorMessage.includes("credentials")) {
          setShowRegister(true);
        }
        showToast("Login failed", "error");
      }
    } catch (err) {
      setError("An unexpected error occurred during login.");
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskConnect = async (account) => {
    // This function is called when MetaMaskConnect successfully connects
    // Now, use metamaskLogin from AuthContext to authenticate
    setError("");
    try {
      const result = await metamaskLogin(account); // Use metamaskLogin from AuthContext

      if (result.success) {
        showToast(`MetaMask connected and logged in with account: ${account}`, "success");
        console.log("Attempting redirect to home page...");
        router.push("/");
      } else {
        setError(result.message || "MetaMask login failed.");
        showToast("MetaMask login failed", "error");
      }
    } catch (err) {
      setError("An unexpected error occurred during MetaMask login.");
      showToast("MetaMask login failed", "error");
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
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => router.push("/forgot-password")}
          sx={{ mt: 1 }}
        >
          Forgot Password?
        </Button>
      </form>
      <Box display="flex" alignItems="center" my={3}>
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
};

export default Login;
