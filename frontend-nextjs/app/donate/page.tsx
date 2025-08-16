"use client";
import React, { useEffect, useState } from "react";

export default function DonateLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/donations/leaderboard")
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaderboard);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load leaderboard.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Donation Leaderboard</h2>
      <div style={{ marginTop: 24 }}>
        <h3>Top Donors</h3>
        <div style={{ background: "#f6ffed", border: "1px solid #b7eb8f", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : (
            <ul>
              {leaderboard.map((entry, i) => (
                <li key={i}>
                  {entry.address}: {entry.amount} USDC
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Donation History</h3>
        <div style={{ background: "#fff0f6", border: "1px solid #ffadd2", borderRadius: 8, padding: 16 }}>
          <span style={{ color: "#888" }}>Donation History Placeholder</span>
        </div>
      </div>
    </div>
  );
}
