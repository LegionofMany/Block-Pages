// ...existing code from frontend/src/pages/AdminAnalytics.jsx...

import React, { useEffect, useState } from "react";
import { getAnalyticsEvents } from "../services/api";
import { Box, Typography, Card, CardContent, CircularProgress, Alert, MenuItem, Select, InputLabel, FormControl, TextField, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { saveAs } from "file-saver";

const EVENT_TYPES = ["all", "phone_lookup", "wallet_flag", "wallet_rate", "directory_search", "411_question"];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

export default function AdminAnalytics() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (typeFilter !== "all") params.type = typeFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;
      const data = await getAnalyticsEvents(params);
      setEvents(data);
    } catch (e) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  // Chart data
  const eventTypeCounts = events.reduce((acc, ev) => {
    acc[ev.type] = (acc[ev.type] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(eventTypeCounts).map(([type, count]) => ({ type, count }));

  // Pie chart for user distribution (if user field exists)
  const userCounts = events.reduce((acc, ev) => {
    const user = ev.user || "Anonymous";
    acc[user] = (acc[user] || 0) + 1;
    return acc;
  }, {});
  const userChartData = Object.entries(userCounts).map(([user, count]) => ({ name: user, value: count }));

  // Time series data for events per day
  const eventsByDate = events.reduce((acc, ev) => {
    const date = new Date(ev.createdAt).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const timeSeriesData = Object.entries(eventsByDate).map(([date, count]) => ({ date, count }));

  // Top flagged wallets
  const flaggedWallets = events.filter(ev => ev.type === "wallet_flag");
  const flaggedCounts = flaggedWallets.reduce((acc, ev) => {
    const addr = ev.data?.walletAddress || "Unknown";
    acc[addr] = (acc[addr] || 0) + 1;
    return acc;
  }, {});
  const topFlagged = Object.entries(flaggedCounts)
    .map(([wallet, count]) => ({ wallet, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top rated wallets
  const ratedWallets = events.filter(ev => ev.type === "wallet_rate");
  const ratingCounts = ratedWallets.reduce((acc, ev) => {
    const addr = ev.data?.walletAddress || "Unknown";
    acc[addr] = (acc[addr] || 0) + 1;
    return acc;
  }, {});
  const topRated = Object.entries(ratingCounts)
    .map(([wallet, count]) => ({ wallet, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Export handlers
  const handleExportCSV = () => {
    const csv = [
      "Date,Type,User,Data",
      ...events.map(ev => `"${new Date(ev.createdAt).toISOString()}","${ev.type}","${ev.user || ''}","${JSON.stringify(ev.data).replace(/"/g, '""')}"`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `analytics_events_${Date.now()}.csv`);
  };
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    saveAs(blob, `analytics_events_${Date.now()}.json`);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Analytics Dashboard</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl size="small">
          <InputLabel>Event Type</InputLabel>
          <Select
            value={typeFilter}
            label="Event Type"
            onChange={e => setTypeFilter(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            {EVENT_TYPES.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="From"
          type="date"
          size="small"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To"
          type="date"
          size="small"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={fetchEvents} sx={{ minWidth: 120 }}>Apply Filters</Button>
        <Button variant="outlined" onClick={handleExportCSV}>Export CSV</Button>
        <Button variant="outlined" onClick={handleExportJSON}>Export JSON</Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <>
          <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 320, height: 300 }}>
              <Typography variant="h6">Event Type Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="type" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8">
                    {chartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ flex: 1, minWidth: 320, height: 300 }}>
              <Typography variant="h6">User Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {userChartData.map((entry, idx) => (
                      <Cell key={`cell-pie-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box sx={{ flex: 1, minWidth: 320, height: 300, mb: 4 }}>
            <Typography variant="h6">Events Over Time</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <Typography variant="h6">Top Flagged Wallets</Typography>
              <ul>
                {topFlagged.map(({ wallet, count }) => (
                  <li key={wallet}>{wallet}: {count} flags</li>
                ))}
              </ul>
            </Box>
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <Typography variant="h6">Top Rated Wallets</Typography>
              <ul>
                {topRated.map(({ wallet, count }) => (
                  <li key={wallet}>{wallet}: {count} ratings</li>
                ))}
              </ul>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>Recent Events</Typography>
          {events.map(ev => (
            <Card key={ev._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2">{new Date(ev.createdAt).toLocaleString()}</Typography>
                <Typography variant="body1">Type: {ev.type}</Typography>
                <Typography variant="body2">Data: {JSON.stringify(ev.data)}</Typography>
                <Typography variant="body2">User: {ev.user || "-"}</Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
}
