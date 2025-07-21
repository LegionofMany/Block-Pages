// ...existing code from frontend/src/pages/AdminDirectory.jsx...

import React, { useState } from "react";
import { upsertDirectoryEntry, searchDirectory } from "../services/api";
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from "@mui/material";

export default function AdminDirectory() {
  const [form, setForm] = useState({ address: "", name: "", phone: "", info: "" });
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpsert = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await upsertDirectoryEntry(form);
      setSuccess("Entry saved.");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save entry");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await searchDirectory(search);
      setResults(res);
    } catch {
      setResults([]);
      setError("No results found.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Directory Management</Typography>
      <form onSubmit={handleUpsert} style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <TextField label="Wallet Address" name="address" value={form.address} onChange={handleChange} required sx={{ flex: 1 }} />
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} sx={{ flex: 1 }} />
        <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} sx={{ flex: 1 }} />
        <TextField label="Info" name="info" value={form.info} onChange={handleChange} sx={{ flex: 2 }} />
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} sx={{ flex: 1 }} />
        <Button type="submit" variant="outlined">Search</Button>
      </form>
      {results.map(entry => (
        <Card key={entry.address} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{entry.name || "No Name"}</Typography>
            <Typography>Wallet: {entry.address}</Typography>
            <Typography>Phone: {entry.phone || "-"}</Typography>
            <Typography>Info: {entry.info || "-"}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
