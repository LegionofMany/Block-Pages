
import React, { useState } from 'react';
import { flagWallet } from '../services/api';

function FlagWallet({ walletAddress }) {
  const [flagging, setFlagging] = useState(false);
  const [flaggingError, setFlaggingError] = useState('');
  const [flaggingSuccess, setFlaggingSuccess] = useState('');

  const handleFlagWallet = async () => {
    setFlagging(true);
    setFlaggingError('');
    setFlaggingSuccess('');

    const reason = prompt('Enter reason for flagging wallet:');
    if (reason) {
      try {
        await flagWallet(walletAddress, reason);
        setFlaggingSuccess('Wallet flagged successfully!');
        // Optionally: You might want to trigger a refresh of wallet data or a list of flagged wallets here
      } catch (error) {
        console.error('Error flagging wallet:', error);
        setFlaggingError('Error flagging wallet.');
      } finally {
        setFlagging(false);
      }
    } else {
      setFlaggingError('Reason is required to flag a wallet.');
    }
  };

  return (
    <div className="mt-4"> {/* Added margin top */}
      <button
        onClick={handleFlagWallet}
        className="button"  // Use the 'button' class from index.css
        disabled={flagging}
      >
        {flagging ? 'Flagging...' : 'Flag Wallet'}
      </button>
      {flaggingError && <p className="error-message">{flaggingError}</p>} {/* Use error-message */}
      {flaggingSuccess && <p className="success-message">{flaggingSuccess}</p>} {/* Use success-message */}
    </div>
  );
}

export default FlagWallet;