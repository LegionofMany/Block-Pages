import React, { useState } from 'react';
import { flagWallet, logAnalyticsEvent } from '../services/api';
import PropTypes from 'prop-types';

function FlagWallet({ walletAddress, showToast }) {
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
        logAnalyticsEvent("wallet_flag", { walletAddress, reason });
        setFlaggingSuccess('Wallet flagged successfully!');
        if (showToast) showToast('Wallet flagged successfully!', 'success');
      } catch (error) {
        console.error('Error flagging wallet:', error);
        setFlaggingError('Error flagging wallet.');
        if (showToast) showToast('Error flagging wallet.', 'error');
      } finally {
        setFlagging(false);
      }
    } else {
      setFlaggingError('Reason is required to flag a wallet.');
      if (showToast) showToast('Reason is required to flag a wallet.', 'error');
    }
  };

  return (
    <div className="mt-4"> {/* Added margin top */}
      <button
        onClick={handleFlagWallet}
        className="button"  // Use the 'button' class from index.css
        disabled={flagging}
        aria-label="Flag Wallet"
      >
        {flagging ? 'Flagging...' : 'Flag Wallet'}
      </button>
      {flaggingError && <p className="error-message">{flaggingError}</p>} {/* Use error-message */}
      {flaggingSuccess && <p className="success-message">{flaggingSuccess}</p>} {/* Use success-message */}
    </div>
  );
}

FlagWallet.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  showToast: PropTypes.func,
};

export default FlagWallet;