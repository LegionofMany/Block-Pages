"use client";
import React, { useState } from "react";
import { searchDirectory, scrapeWalletInfo, logAnalyticsEvent } from "../../services/api";
import { TextField, Button, Card, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress, Divider, Link, Alert } from "@mui/material";
import OnChainVerify from "../../components/OnChainVerify";
import { getFlags } from "../../services/flags";

const Directory = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [region, setRegion] = useState({ continent: "", country: "", state: "", city: "" });
  const [scraped, setScraped] = useState({});
  const [scrapeLoading, setScrapeLoading] = useState("");
  const [flags, setFlags] = useState({});

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

  // Fetch flags for all filtered results
  React.useEffect(() => {
    async function fetchFlags() {
      const flagMap = {};
      await Promise.all(filteredResults.map(async entry => {
        try {
          const res = await getFlags(entry.address);
          flagMap[entry.address] = res;
        } catch {
          flagMap[entry.address] = [];
        }
      }));
      setFlags(flagMap);
    }
    if (filteredResults.length > 0) fetchFlags();
  }, [filteredResults]);

  return (
    <Box className="blockchain-page-card">
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Directory
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Name, Phone, or Wallet"
            value={query}
            onChange={e => setQuery(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </form>
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
        {/* End of search/filter form and region filter */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {filteredResults.length === 0 && !loading && !error && (
          <Alert severity="info" sx={{ mt: 4 }}>No results found. Try a different search or filter.</Alert>
        )}
        {filteredResults.map(entry => (
          <Card key={entry.address} sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{entry.name || "No Name"}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2"><b>Wallet:</b> <span style={{ color: '#1976d2' }}>{entry.address}</span></Typography>
              <Typography variant="body2"><b>Phone:</b> {entry.phone || <span style={{ color: '#888' }}>-</span>}</Typography>
              <Typography variant="body2"><b>Info:</b> {entry.info || <span style={{ color: '#888' }}>-</span>}</Typography>
              <Typography variant="body2"><b>Region:</b> {entry.region ? `${entry.region.continent || ""} ${entry.region.country || ""} ${entry.region.state || ""} ${entry.region.city || ""}`.trim() : <span style={{ color: '#888' }}>-</span>}</Typography>
              <Button variant="outlined" size="small" onClick={() => handleScrape(entry.address)} disabled={scrapeLoading === entry.address} sx={{ mt: 1 }}>
                {scrapeLoading === entry.address ? <CircularProgress size={18} /> : "Scrape Wallet Info"}
              </Button>
              {scraped[entry.address] && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  {scraped[entry.address].error ? (
                    <Alert severity="error">{scraped[entry.address].error}</Alert>
                  ) : (
                    <>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Scraped Info</Typography>
                      <Typography variant="body2">Balance: <b>{scraped[entry.address].balance}</b></Typography>
                      <Typography variant="body2">Tx Count: <b>{scraped[entry.address].txCount}</b></Typography>
                      <Typography variant="body2">
                        Last Tx Hash: {scraped[entry.address].lastTx?.hash ? (
                          <Link href={`https://bscscan.com/tx/${scraped[entry.address].lastTx.hash}`} target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
                            {scraped[entry.address].lastTx.hash.slice(0, 10)}...{scraped[entry.address].lastTx.hash.slice(-6)}
                          </Link>
                        ) : <span style={{ color: '#888' }}>-</span>}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              <Divider sx={{ my: 1 }} />
              {/* On-chain verification for this wallet */}
              <OnChainVerify walletAddress={entry.address} />
              {/* On-chain flag proofs */}
              {flags[entry.address] && flags[entry.address].length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Flag Events (on-chain):</Typography>
                  {flags[entry.address].map(flag => (
                    <Typography key={flag._id} variant="body2">
                      {flag.txHash ? (
                        <Link href={`https://bscscan.com/tx/${flag.txHash}`} target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
                          {flag.txHash.slice(0, 10)}...{flag.txHash.slice(-6)}
                        </Link>
                      ) : <span style={{ color: '#888' }}>No tx hash</span>}
                      {flag.reason ? <span style={{ color: '#b71c1c' }}> — {flag.reason}</span> : ""}
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Directory;
