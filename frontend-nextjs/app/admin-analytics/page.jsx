"use client";
import React, { useEffect, useState } from "react";
import { getAnalyticsEvents } from "../../services/api";
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

  // ...existing code...
}
