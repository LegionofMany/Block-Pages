// ...existing code from frontend/src/pages/PhoneLookup.jsx...

import React, { useState } from "react";
import { lookupByPhone, logAnalyticsEvent } from "../services/api";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

export default function PhoneLookup() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await lookupByPhone(phone);
      setResult(res);
      logAnalyticsEvent("phone_lookup", { phone });
    } catch (err) {
      setError("Not found.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="blockchain-page-card">
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>Phone Number Lookup</Typography>
        <form onSubmit={handleLookup} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <TextField
            label="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Lookup
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {result && (
          <Card>
            <CardContent>
              <Typography variant="h6">{result.name || "No Name"}</Typography>
              <Typography>Wallet: {result.address}</Typography>
              <Typography>Phone: {result.phone || "-"}</Typography>
              <Typography>Info: {result.info || "-"}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
