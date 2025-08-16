"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";
import MetaMaskConnect from "../../components/MetaMaskConnect"; // Import MetaMaskConnect component
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook



import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();
  const { login, metamaskLogin, user } = useAuth();

  React.useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const showToast = (message, type = "info") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowRegister(false);
    try {
      const result = await login(email, password);
      if (result.success) {
        showToast("Login successful! Welcome back.", "success");
        // router.push("/"); // Now handled by useEffect
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
    setError("");
    try {
      const result = await metamaskLogin(account);
      if (result.success) {
        showToast(`MetaMask connected and logged in with account: ${account}`, "success");
        // router.push("/"); // Now handled by useEffect
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
    <Box maxWidth={420} mx="auto" mt={8} p={0}>
      <Box sx={{ boxShadow: 4, borderRadius: 3, bgcolor: 'background.paper', p: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <LockOutlinedIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h4" fontWeight={700} letterSpacing={1} mb={1}>Login</Typography>
          <Typography variant="body2" color="grey.700" align="center">
            Welcome back! Sign in to access your BlockPages 411 account and Web3 tools.
          </Typography>
        </Box>
        {toast.message && <Alert severity={toast.type} sx={{ mb: 2 }}>{toast.message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoComplete="current-password"
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              startIcon={<LockOutlinedIcon />}
              sx={{ fontWeight: 600 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {showRegister && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<PersonAddAltIcon />}
                onClick={() => router.push("/register")}
                sx={{ fontWeight: 600 }}
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
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => router.push("/register")}
            sx={{ mt: 1, fontWeight: 600 }}
            startIcon={<PersonAddAltIcon />}
          >
            Register
          </Button>
        </form>
        <Box display="flex" alignItems="center" my={3}>
          <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
          <Typography sx={{ mx: 2, color: 'grey.600', fontWeight: 500 }}>or</Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: 'grey.300' }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, fontWeight: 600 }}
          onClick={() => router.push("/connect-wallet")}
        >
          Connect Wallet
        </Button>
        {toast.message && (
          <Alert severity={toast.type} sx={{ mt: 2 }} onClose={() => setToast({ message: "", type: "info" })}>
            {toast.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Login;
