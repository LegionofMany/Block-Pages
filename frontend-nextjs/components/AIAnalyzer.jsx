// ...existing code from frontend/src/components/AIAnalyzer.jsx...
import React, { useState } from "react";
import PropTypes from "prop-types";
import { analyzeTransactions } from "../services/api";

function AIAnalyzer({ walletAddress, showToast }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeTransactions(walletAddress);
      setResult(data);
      showToast("AI analysis complete!", "success");
    } catch (error) {
      showToast(error.message || "Error analyzing transactions.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2">
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Transactions"}
      </button>
      {result && (
        <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

AIAnalyzer.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default AIAnalyzer;
