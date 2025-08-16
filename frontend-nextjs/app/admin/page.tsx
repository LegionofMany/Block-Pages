"use client";
import React, { useEffect, useState } from "react";
import { fetchAdminAnalytics } from "../../lib/analytics";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminAnalytics()
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginTop: 24 }}>
        <h3>Analytics Charts</h3>
        <div style={{ height: 200, background: "#f5f5f5", borderRadius: 8, marginBottom: 24 }}>
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : analytics ? (
            <div>
              <div>Event Types: {analytics.eventTypes.join(", ")}</div>
              <div>Event Counts: {analytics.eventCounts.join(", ")}</div>
              <div>Top Wallets: {analytics.topWallets.join(", ")}</div>
            </div>
          ) : (
            <span style={{ color: "#888" }}>Chart Placeholder</span>
          )}
        </div>
        <h3>Moderation Queue</h3>
        <div style={{ background: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 8, padding: 16 }}>
          {/* List flagged wallets for review */}
          <span style={{ color: "#888" }}>Moderation Queue Placeholder</span>
        </div>
        <h3>FAQ Management</h3>
        <div style={{ background: "#e6f7ff", border: "1px solid #91d5ff", borderRadius: 8, padding: 16 }}>
          {/* FAQ CRUD UI here */}
          <span style={{ color: "#888" }}>FAQ Management Placeholder</span>
        </div>
      </div>
    </div>
  );
}
