// ...existing code from frontend/src/components/GivingBlockCharities.jsx...

import React, { useEffect, useState } from "react";
import { getCharities } from "../services/givingBlockService";
import { Box, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, Button, TextField } from "@mui/material";
import DonateDialog from "./DonateDialog";

export default function GivingBlockCharities() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    getCharities()
      .then(setCharities)
      .catch(err => setError(err.message || "Failed to load charities."))
      .finally(() => setLoading(false));
  }, []);

  const filteredCharities = (charities || []).filter(charity =>
    charity.name.toLowerCase().includes(search.toLowerCase()) ||
    (charity.description && charity.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ textAlign: "center", mt: 6 }}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Crypto Charities (The Giving Block)</Typography>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <TextField
          label="Search Charities"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredCharities.map(charity => (
          <Grid item xs={12} sm={6} md={4} key={charity.id}>
            <Card sx={{ height: "100%" }}>
              {charity.logoUrl && (
                <CardMedia component="img" height="140" image={charity.logoUrl} alt={charity.name} />
              )}
              <CardContent>
                <Typography variant="h6">{charity.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{charity.description}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <b>Category:</b> {charity.category || "N/A"}<br/>
                  <b>Location:</b> {charity.location || "N/A"}
                </Typography>
                <Button href={charity.websiteUrl} target="_blank" rel="noopener" variant="outlined" size="small" sx={{ mr: 1 }}>Visit Website</Button>
                <Button variant="contained" size="small" onClick={() => { setSelectedCharity(charity); setDonateOpen(true); }}>Donate</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DonateDialog open={donateOpen} onClose={() => setDonateOpen(false)} charity={selectedCharity} />
    </Box>
  );
}
