import React, { useEffect, useState } from "react";
import { getFlaggedWallets } from "../services/api";

function FlaggedWallets() {
  const [flaggedWallets, setFlaggedWallets] = useState([]);

  useEffect(() => {
    fetchFlaggedWallets();
  }, []);

  const fetchFlaggedWallets = async () => {
    try {
      const wallets = await getFlaggedWallets();
      setFlaggedWallets(wallets);
    } catch (error) {
      console.error("Error fetching flagged wallets:", error);
      alert("Failed to fetch flagged wallets.");
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Flagged Wallets</h3>
      {flaggedWallets.length === 0 ? (
        <p>No flagged wallets yet.</p>
      ) : (
        <ul>
          {flaggedWallets.map((wallet) => (
            <li key={wallet.address} className="border p-2 my-2">
              <b>Address:</b> {wallet.address}
              <br />
              <b>Reason:</b> {wallet.reason || "No reason provided"}
              <br />
              <b>Flagged Count:</b> {wallet.flaggedCount}
              <br />
              <b>Rating:</b> {wallet.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FlaggedWallets;