import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider, Alert, IconButton, Tooltip, Fade } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import StarRateIcon from '@mui/icons-material/StarRate';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Toast from '../components/Toast';
import MoralisDemo from '../components/MoralisDemo';
import {
  flagWalletOnChain,
  rateWalletOnChain,
  getWalletInfoOnChain,
  getWalletRatingOnChain,
  getWalletFlaggedCountOnChain,
  getOwner,
  getWalletStruct
} from '../services/contractService';

const Home = () => {
  // State for contract actions
  const [walletAddress, setWalletAddress] = useState('');
  const [rating, setRating] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [showBanner, setShowBanner] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const demoWallet = '0x000000000000000000000000000000000000dead';

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleFlagWallet = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      await flagWalletOnChain(walletAddress.trim());
      showToast('Wallet flagged successfully!', 'success');
      setResult('Wallet flagged successfully!');
    } catch (e) {
      setErrorMsg(e.message || 'Error flagging wallet');
      showToast(e.message || 'Error flagging wallet', 'error');
    }
    setLoading(false);
  };

  const handleRateWallet = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      await rateWalletOnChain(walletAddress.trim(), rating);
      showToast('Wallet rated successfully!', 'success');
      setResult('Wallet rated successfully!');
    } catch (e) {
      setErrorMsg(e.message || 'Error rating wallet');
      showToast(e.message || 'Error rating wallet', 'error');
    }
    setLoading(false);
  };

  return (
    <Box className="blockchain-page-card">
      <Paper elevation={3} className="blockchain-paper">
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            Wallet Flagging and Rating
          </Typography>
          <Divider />
          <Box my={2}>
            <TextField
              label="Wallet Address"
              variant="outlined"
              fullWidth
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon position="start" />
                ),
              }}
            />
          </Box>
          <Box my={2} display="flex" justifyContent="space-between">
            <Tooltip title="Flag this wallet as suspicious" arrow>
              <IconButton
                color="primary"
                onClick={handleFlagWallet}
                disabled={loading}
              >
                <FlagIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Rate this wallet" arrow>
              <IconButton
                color="primary"
                onClick={handleRateWallet}
                disabled={loading}
              >
                <StarRateIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {result && (
            <Alert severity="success" onClose={() => setResult(null)}>
              {result}
            </Alert>
          )}
          {errorMsg && (
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
        </Box>
      </Paper>
      <Toast
        open={Boolean(toast.message)}
        onClose={() => setToast({ ...toast, message: '' })}
        message={toast.message}
        type={toast.type}
      />
      <MoralisDemo />
    </Box>
  );
};

export default Home;
