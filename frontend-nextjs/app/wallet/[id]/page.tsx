'use client';
import React, { useEffect, useState } from "react";
import WalletCard from "../../../components/WalletCard";
import { fetchWalletAnalytics } from "../../../lib/analytics";
import { fetchAIRiskScore } from "../../../lib/ai";
import RatingFlagForm from "../../../components/RatingFlagForm";

export default function WalletProfilePage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [ai, setAI] = useState<any>(null);

  useEffect(() => {
    // Simulate wallet address
    const address = "0x123...abcd";
    fetchWalletAnalytics(address).then(setAnalytics);
    fetchAIRiskScore(address).then(setAI);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>Wallet Profile</h2>
      <WalletCard />
  <RatingFlagForm address="0x123...abcd" />
      {analytics && (
        <div style={{ marginTop: 24 }}>
          <h3>Analytics</h3>
          <div>Tx Count: {analytics.txCount}</div>
          <div>Flagged Count: {analytics.flaggedCount}</div>
          <div>Rating: {analytics.rating}</div>
          <div>History: {analytics.history.join(", ")}</div>
        </div>
      )}
      {ai && (
        <div style={{ marginTop: 24 }}>
          <h3>AI Risk Score</h3>
          <div>Score: {ai.score}</div>
          <div>Factors: {ai.factors.join(", ")}</div>
          <div>Insights: {ai.insights}</div>
        </div>
      )}
    </div>
  );
}
