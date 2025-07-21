// ...existing code from frontend/src/components/RateWallet.jsx...

import React, { useState } from "react";
import PropTypes from "prop-types";
import { rateWallet, logAnalyticsEvent } from "../services/api";

function RateWallet({ walletAddress, showToast }) {
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRate = async () => {
    setLoading(true);
    try {
      await rateWallet(walletAddress, rating);
      logAnalyticsEvent("wallet_rate", { walletAddress, rating });
      showToast("Wallet rated successfully!", "success");
    } catch (error) {
      showToast(error.message || "Error rating wallet.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2">
      <label htmlFor="wallet-rating">Rate this wallet:</label>
      <select
        id="wallet-rating"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        className="mx-2 border rounded px-2 py-1"
        aria-label="Wallet rating"
      >
        <option value={1}>1 (Low)</option>
        <option value={2}>2 (Medium)</option>
        <option value={3}>3 (High)</option>
      </select>
      <button
        onClick={handleRate}
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Rating..." : "Rate"}
      </button>
    </div>
  );
}

RateWallet.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default RateWallet;
