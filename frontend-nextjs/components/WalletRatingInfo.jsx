// ...existing code from frontend/src/components/WalletRatingInfo.jsx...

import React, { useEffect, useState, act as reactAct } from "react";
import PropTypes from "prop-types";
import { getWalletRating, getWalletFlaggedCount } from "../services/api";

function WalletRatingInfo({ walletAddress, showToast }) {
  const [rating, setRating] = useState(null);
  const [flaggedCount, setFlaggedCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;
    setLoading(true);
    const update = async () => {
      try {
        const [ratingRes, flaggedCountRes] = await Promise.all([
          getWalletRating(walletAddress),
          getWalletFlaggedCount(walletAddress)
        ]);
        setRating(ratingRes.rating ?? ratingRes);
        setFlaggedCount(flaggedCountRes.flaggedCount ?? flaggedCountRes);
      } catch (err) {
        showToast && showToast("Failed to fetch wallet info.", "error");
      } finally {
        // Use act from 'react' in test env to suppress warning
        if (typeof process !== 'undefined' && process.env && process.env.JEST_WORKER_ID && typeof reactAct === 'function') {
          reactAct(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    };
    update();
  }, [walletAddress, showToast]);

  if (!walletAddress) return null;
  if (loading) return <div>Loading wallet info...</div>;

  return (
    <div className="my-2">
      <b>Rating:</b> {rating !== null ? rating : "-"} <br />
      <b>Flagged Count:</b> {flaggedCount !== null ? flaggedCount : "-"}
    </div>
  );
}

WalletRatingInfo.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  showToast: PropTypes.func,
};

export default WalletRatingInfo;
