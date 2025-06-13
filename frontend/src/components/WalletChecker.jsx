import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getWalletBalance, getWalletTransactions } from "../services/moralisService";
import { getWalletInfo } from "../services/api";

function WalletChecker({ walletAddress, showToast }) {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      setError(null);
      try {
        const walletBalance = await getWalletBalance(walletAddress);
        const walletTx = await getWalletTransactions(walletAddress);
        const walletInfo = await getWalletInfo(walletAddress);
        setBalance(walletBalance.balance / 1e18);
        setTransactions(walletTx.result);
        setWalletData(walletInfo);
      } catch (error) {
        setError("Error fetching wallet data.");
        if (showToast) showToast("Error fetching wallet data.", "error");
      } finally {
        setLoading(false);
      }
    };
    if (walletAddress) {
      fetchWalletData();
    }
  }, [walletAddress, showToast]);

  return (
    <div className="p-4 card mt-4">
      <h3 className="card-title">Wallet Checker</h3>
      {loading && <p className="loading-indicator" aria-live="polite" />}
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
  showToast: PropTypes.func,
};

export default WalletChecker;