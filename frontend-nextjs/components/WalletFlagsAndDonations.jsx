import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardContent, Divider, Link, Alert } from "@mui/material";
import { getFlags } from "../services/flags";
import { getDonations } from "../services/donations";

export default function WalletFlagsAndDonations({ address }) {
  const [flags, setFlags] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError("");
    Promise.all([
      getFlags(address).catch(() => []),
      getDonations(address).catch(() => [])
    ]).then(([flags, donations]) => {
      setFlags(flags);
      setDonations(donations);
    }).catch(() => setError("Failed to load flag/donation data"))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <Card sx={{ mt: 4, mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>On-Chain Flags & Donations</Typography>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress size={28} /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Flag Events</Typography>
            <Divider sx={{ mb: 1 }} />
            {flags.length === 0 && <Typography variant="body2" color="text.secondary">No flags found.</Typography>}
            {flags.map(flag => (
              <Box key={flag._id} sx={{ mb: 1, pl: 1 }}>
                <Typography variant="body2">
                  {flag.txHash ? (
                    <Link href={`https://bscscan.com/tx/${flag.txHash}`} target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
                      {flag.txHash.slice(0, 10)}...{flag.txHash.slice(-6)}
                    </Link>
                  ) : <span style={{ color: '#888' }}>No tx hash</span>}
                  {flag.reason ? <span style={{ color: '#b71c1c' }}> — {flag.reason}</span> : ""}
                </Typography>
              </Box>
            ))}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>Donation Events</Typography>
            <Divider sx={{ mb: 1 }} />
            {donations.length === 0 && <Typography variant="body2" color="text.secondary">No donations found.</Typography>}
            {donations.map(donation => (
              <Box key={donation._id} sx={{ mb: 1, pl: 1 }}>
                <Typography variant="body2">
                  {donation.txHash ? (
                    <Link href={`https://bscscan.com/tx/${donation.txHash}`} target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
                      {donation.txHash.slice(0, 10)}...{donation.txHash.slice(-6)}
                    </Link>
                  ) : <span style={{ color: '#888' }}>No tx hash</span>}
                  {donation.amount ? <span style={{ color: '#388e3c' }}> — {donation.amount} BNB</span> : ""}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
