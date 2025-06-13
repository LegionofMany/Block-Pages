import React, { useEffect, useState } from "react";
import { getFlaggedWallets } from "../services/api";
import PropTypes from "prop-types";
import RateWallet from "./RateWallet";
import AIAnalyzer from "./AIAnalyzer";

function FlaggedWallets({ showToast }) {
  const [flaggedWallets, setFlaggedWallets] = useState([]);

  useEffect(() => {
    fetchFlaggedWallets();
    // eslint-disable-next-line
  }, []);

  const fetchFlaggedWallets = async () => {
    try {
      const wallets = await getFlaggedWallets();
      setFlaggedWallets(wallets);
    } catch (error) {
      console.error("Error fetching flagged wallets:", error);
      if (showToast) showToast("Failed to fetch flagged wallets.", "error");
      else alert("Failed to fetch flagged wallets.");
    }
  };

  return (
    <div className="p-4" role="region" aria-live="polite">
      <h3 className="text-xl font-bold">Flagged Wallets</h3>
      {flaggedWallets.length === 0 ? (
        <p>No flagged wallets yet.</p>
      ) : (
        <ul>
          {flaggedWallets.map((wallet) => (
            <li key={wallet.address} className="border p-2 my-2 rounded shadow-sm">
              <b>Address:</b> {wallet.address}
              <br />
              <b>Reason:</b> {wallet.reason || "No reason provided"}
              <br />
              <b>Flagged Count:</b> {wallet.flaggedCount}
              <br />
              <b>Rating:</b> {wallet.rating}
              <RateWallet walletAddress={wallet.address} showToast={showToast} />
              <AIAnalyzer walletAddress={wallet.address} showToast={showToast} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FlaggedWallets.propTypes = {
  showToast: PropTypes.func,
};

export default FlaggedWallets;