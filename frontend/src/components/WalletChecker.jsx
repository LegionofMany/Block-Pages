import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getWalletBalance, getWalletTransactions } from "../services/moralisService";
import { getWalletInfo } from "../services/api"; // Import getWalletInfo [cite: 3, 47]

function WalletChecker({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(null); // New state for wallet data

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      setError(null);
      try {
        const walletBalance = await getWalletBalance(walletAddress);
        const walletTx = await getWalletTransactions(walletAddress);
        const walletInfo = await getWalletInfo(walletAddress); // Fetch wallet info [cite: 3, 47]

        setBalance(walletBalance.balance / 1e18);
        setTransactions(walletTx.result);
        setWalletData(walletInfo); // Set wallet data [cite: 4]
      } catch (error) {
        setError("Error fetching wallet data.");
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchWalletData();
    }
  }, [walletAddress]);

  return (
    <div className="p-4 card mt-4">
      <h3 className="card-title">Wallet Checker</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {walletData && (
        <p className="card-content">
          <b>Flagged:</b> {walletData.isFlagged ? "Yes" : "No"}
        </p>
      )}

      {balance !== null && (
        <p className="card-content">
          <b>Balance:</b> {balance} BNB
        </p>
      )}

      {transactions.length > 0 && (
        <div>
          <h4 className="card-title">Recent Transactions:</h4>
          <ul>
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx.hash} className="card-content">
                {tx.hash.substring(0, 20)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

WalletChecker.propTypes = {
  walletAddress: PropTypes.string.isRequired,
};

export default WalletChecker;