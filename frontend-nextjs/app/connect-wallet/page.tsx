"use client";
import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/navigation";
import { useWallet } from "../../context/WalletContext";

const wallets = [
  { name: "MetaMask", provider: "metamask", icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#f6851b' }} /> },
  { name: "Coinbase Wallet", provider: "coinbase", icon: <CurrencyBitcoinIcon sx={{ fontSize: 40, color: '#0052ff' }} /> },
  { name: "WalletConnect", provider: "walletconnect", icon: <WalletIcon sx={{ fontSize: 40, color: '#3b99fc' }} /> },
];

export default function ConnectWalletPage() {
  const router = useRouter();
  const { connect, error, address } = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = async (provider: string) => {
    setLoading(true);
    setSelected(provider);
    await connect(provider as any);
    setLoading(false);
  };

  React.useEffect(() => {
    if (address) {
      router.push("/account"); // Redirect after successful connection
    }
  }, [address, router]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 420, width: '100%', p: 4, boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Select Your Wallet
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={3}>
            Choose a wallet provider to continue. You can connect with MetaMask, Coinbase Wallet, or WalletConnect.
          </Typography>
          <Grid container columns={3} spacing={2} justifyContent="center" mb={2}>
            {wallets.map(w => (
              <Grid key={w.name}>
                <Button
                  variant={selected === w.provider ? "contained" : "outlined"}
                  fullWidth
                  startIcon={w.icon}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 2, fontWeight: 600, fontSize: 18, borderRadius: 2, borderColor: '#00e1ff', color: '#181f2a', background: selected === w.provider ? 'rgba(0,225,255,0.18)' : 'rgba(0,225,255,0.08)', mb: 1 }}
                  onClick={() => handleSelect(w.provider)}
                  disabled={loading}
                >
                  {w.name}
                </Button>
              </Grid>
            ))}
          </Grid>
          {error && (
            <Typography color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
          <Button
            variant="text"
            color="secondary"
            fullWidth
            sx={{ mt: 2, fontWeight: 600, fontSize: 16 }}
            onClick={() => router.push("/register")}
            disabled={loading}
          >
            I don't have a wallet
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
