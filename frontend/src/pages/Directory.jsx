import React, { useState } from "react";
import { searchDirectory, scrapeWalletInfo, logAnalyticsEvent } from "../services/api";
import { TextField, Button, Card, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import OnChainVerify from "../components/OnChainVerify";

export default function Directory() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [region, setRegion] = useState({ continent: "", country: "", state: "", city: "" });
  const [scraped, setScraped] = useState({});
  const [scrapeLoading, setScrapeLoading] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await searchDirectory(query);
      setResults(res);
      logAnalyticsEvent("directory_search", { query, region });
    } catch (err) {
      setError("No results found.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Region filter handler
  const handleRegionChange = (field) => (e) => {
    setRegion({ ...region, [field]: e.target.value });
  };

  // Filter results by region
  const filteredResults = results.filter(entry => {
    if (region.continent && entry.region?.continent !== region.continent) return false;
    if (region.country && entry.region?.country !== region.country) return false;
    if (region.state && entry.region?.state !== region.state) return false;
    if (region.city && entry.region?.city !== region.city) return false;
    return true;
  });

  // Scrape wallet info handler
  const handleScrape = async (address) => {
    setScrapeLoading(address);
    try {
      const info = await scrapeWalletInfo(address);
      setScraped((prev) => ({ ...prev, [address]: info }));
    } catch {
      setScraped((prev) => ({ ...prev, [address]: { error: "Failed to fetch" } }));
    } finally {
      setScrapeLoading("");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Directory Search</Typography>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          label="Name, Phone, or Wallet"
          value={query}
          onChange={e => setQuery(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Search
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Continent</InputLabel>
          <Select value={region.continent} label="Continent" onChange={handleRegionChange("continent")}> 
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="America">America</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Country" value={region.country} onChange={handleRegionChange("country")}/>
        <TextField label="State" value={region.state} onChange={handleRegionChange("state")}/>
        <TextField label="City" value={region.city} onChange={handleRegionChange("city")}/>
      </Box>
      {filteredResults.map(entry => (
        <Card key={entry.address} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{entry.name || "No Name"}</Typography>
            <Typography>Wallet: {entry.address}</Typography>
            <Typography>Phone: {entry.phone || "-"}</Typography>
            <Typography>Info: {entry.info || "-"}</Typography>
            <Typography>Region: {entry.region ? `${entry.region.continent || ""} ${entry.region.country || ""} ${entry.region.state || ""} ${entry.region.city || ""}`.trim() : "-"}</Typography>
            <Button variant="outlined" size="small" onClick={() => handleScrape(entry.address)} disabled={scrapeLoading === entry.address} sx={{ mt: 1 }}>
              {scrapeLoading === entry.address ? <CircularProgress size={18} /> : "Scrape Wallet Info"}
            </Button>
            {scraped[entry.address] && (
              <Box sx={{ mt: 1 }}>
                {scraped[entry.address].error ? (
                  <Typography color="error">{scraped[entry.address].error}</Typography>
                ) : (
                  <>
                    <Typography variant="subtitle2">Scraped Info:</Typography>
                    <Typography>Balance: {scraped[entry.address].balance}</Typography>
                    <Typography>Tx Count: {scraped[entry.address].txCount}</Typography>
                    <Typography>Last Tx Hash: {scraped[entry.address].lastTx?.hash || "-"}</Typography>
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
