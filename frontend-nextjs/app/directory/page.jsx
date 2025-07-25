"use client";
import React, { useState } from "react";
import { searchDirectory, scrapeWalletInfo, logAnalyticsEvent } from "../../services/api";
import { TextField, Button, Card, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import OnChainVerify from "../../components/OnChainVerify";

const Directory = () => {
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

  const handleRegionChange = (field) => (e) => {
    setRegion({ ...region, [field]: e.target.value });
  };

  const filteredResults = results.filter(entry => {
    if (region.continent && entry.region?.continent !== region.continent) return false;
    if (region.country && entry.region?.country !== region.country) return false;
    if (region.state && entry.region?.state !== region.state) return false;
    if (region.city && entry.region?.city !== region.city) return false;
    return true;
  });

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
    <Box className="blockchain-page-card">
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Directory
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Continent</InputLabel>
            <Select
              value={region.continent}
              onChange={handleRegionChange("continent")}
              label="Continent"
            >
              {/* Continent options */}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={region.country}
              onChange={handleRegionChange("country")}
              label="Country"
            >
              {/* Country options */}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>State</InputLabel>
            <Select
              value={region.state}
              onChange={handleRegionChange("state")}
              label="State"
            >
              {/* State options */}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>City</InputLabel>
            <Select
              value={region.city}
              onChange={handleRegionChange("city")}
              label="City"
            >
              {/* City options */}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {filteredResults.length > 0 && (
          <Box sx={{ mt: 4 }}>
            {filteredResults.map((entry) => (
              <Card key={entry.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{entry.name}</Typography>
                  <Typography color="textSecondary">
                    {entry.region?.continent}, {entry.region?.country}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleScrape(entry.address)}
                    disabled={scrapeLoading === entry.address}
                    sx={{ mt: 2 }}
                  >
                    {scrapeLoading === entry.address ? <CircularProgress size={24} /> : "Scrape Wallet Info"}
                  </Button>
                  {scraped[entry.address] && (
                    <OnChainVerify data={scraped[entry.address]} sx={{ mt: 2 }} />
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Directory;
