import React, { useState } from "react";

export default function RatingFlagForm({ address }: { address: string }) {
  const [rating, setRating] = useState(1);
  const [flagReason, setFlagReason] = useState("");
  const [auditLog, setAuditLog] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/wallet/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, rating }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Error rating wallet.");
      } else {
        setMessage("Wallet rated.");
        setAuditLog(log => [...log, `Rated wallet: ${rating} (${new Date().toLocaleString()})`]);
      }
    } catch {
      setError("Error rating wallet.");
    }
    setLoading(false);
  };

  const handleFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!flagReason || flagReason.length < 3) {
      setError("Flag reason must be at least 3 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/wallet/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, reason: flagReason }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Error flagging wallet.");
      } else {
        setMessage("Wallet flagged.");
        setAuditLog(log => [...log, `Flagged wallet: ${flagReason} (${new Date().toLocaleString()})`]);
      }
    } catch {
      setError("Error flagging wallet.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
      <form onSubmit={handleRate} style={{ marginBottom: 16 }}>
        <label>Rate Wallet:</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} disabled={loading}>
          <option value={1}>1 (Low)</option>
          <option value={2}>2 (Medium)</option>
          <option value={3}>3 (High)</option>
          <option value={4}>4</option>
          <option value={5}>5 (Excellent)</option>
        </select>
        <button type="submit" style={{ marginLeft: 8 }} disabled={loading}>Rate</button>
      </form>
      <form onSubmit={handleFlag}>
        <label>Flag Wallet:</label>
        <input
          type="text"
          placeholder="Reason"
          value={flagReason}
          onChange={e => setFlagReason(e.target.value)}
          style={{ marginLeft: 8 }}
          disabled={loading}
        />
        <button type="submit" style={{ marginLeft: 8 }} disabled={loading}>Flag</button>
      </form>
      {error && <div style={{ marginTop: 8, color: "red" }}>{error}</div>}
      {message && <div style={{ marginTop: 8, color: "green" }}>{message}</div>}
      <div style={{ marginTop: 16 }}>
        <b>Audit Log:</b>
        <ul>
          {auditLog.map((log, i) => <li key={i}>{log}</li>)}
        </ul>
      </div>
    </div>
  );
}
