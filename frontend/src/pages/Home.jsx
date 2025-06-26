import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

function Home() {
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

  const handleGetWalletInfo = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const info = await getWalletInfoOnChain(walletAddress.trim());
      // ethers throws if data is empty, so if we get here, info is valid
      setResult(info);
    } catch (e) {
      if (e.code === 'BAD_DATA' || (e.message && e.message.includes('could not decode result data'))) {
        setErrorMsg('No on-chain data found for this wallet. It may not be registered or interacted with the contract.');
      } else {
        setErrorMsg(e.message || 'Error fetching wallet info');
      }
      showToast(e.message || 'Error fetching wallet info', 'error');
    }
    setLoading(false);
  };

  const handleGetWalletRating = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const rating = await getWalletRatingOnChain(walletAddress.trim());
      setResult(`Wallet rating: ${rating}`);
    } catch (e) {
      if (e.code === 'BAD_DATA' || (e.message && e.message.includes('could not decode result data'))) {
        setErrorMsg('No on-chain rating found for this wallet.');
      } else {
        setErrorMsg(e.message || 'Error fetching wallet rating');
      }
      showToast(e.message || 'Error fetching wallet rating', 'error');
    }
    setLoading(false);
  };

  const handleGetWalletFlaggedCount = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const count = await getWalletFlaggedCountOnChain(walletAddress.trim());
      setResult(`Flagged count: ${count}`);
    } catch (e) {
      if (e.code === 'BAD_DATA' || (e.message && e.message.includes('could not decode result data'))) {
        setErrorMsg('No on-chain flagged count found for this wallet.');
      } else {
        setErrorMsg(e.message || 'Error fetching flagged count');
      }
      showToast(e.message || 'Error fetching flagged count', 'error');
    }
    setLoading(false);
  };

  const handleGetOwner = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const owner = await getOwner();
      setResult(`Contract owner: ${owner}`);
    } catch (e) {
      setErrorMsg(e.message || 'Error fetching owner');
      showToast(e.message || 'Error fetching owner', 'error');
    }
    setLoading(false);
  };

  const handleGetWalletStruct = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const struct = await getWalletStruct(walletAddress.trim());
      setResult(struct);
    } catch (e) {
      if (e.code === 'BAD_DATA' || (e.message && e.message.includes('could not decode result data'))) {
        setErrorMsg('No on-chain struct found for this wallet.');
      } else {
        setErrorMsg(e.message || 'Error fetching wallet struct');
      }
      showToast(e.message || 'Error fetching wallet struct', 'error');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #181f2a 0%, #232b3e 100%)', width: '100vw', overflow: 'hidden' }}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10 min-h-screen flex flex-col justify-center items-center">
        <Paper elevation={8} sx={{
          background: 'rgba(36, 59, 85, 0.65)',
          borderRadius: 5,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          border: '1.5px solid #00e1ff',
          color: '#fff',
          maxWidth: 700,
          width: '100%',
          p: { xs: 3, md: 6 },
          mt: 6,
          backdropFilter: 'blur(16px)',
        }}>
          {showBanner && (
            <Fade in={showBanner}>
              <Alert
                icon={<InfoOutlinedIcon fontSize="inherit" />}
                severity="info"
                sx={{ mb: 4, borderRadius: 2, background: 'rgba(0,225,255,0.08)', color: '#00e1ff', fontWeight: 500 }}
                action={
                  <IconButton color="inherit" size="small" onClick={() => setShowBanner(false)} aria-label="Dismiss onboarding info">
                    ×
                  </IconButton>
                }
              >
                Welcome to BlockPages 411! Enter a wallet address to flag, rate, or view info. Try the <Button size="small" onClick={() => setWalletAddress(demoWallet)} sx={{ color: '#00e1ff', textTransform: 'none', fontWeight: 700 }}>Demo Wallet</Button> for a quick demo.
              </Alert>
            </Fade>
          )}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-2">
              <span role="img" aria-label="411">📞</span> BlockPages 411
            </h1>
            <p className="text-lg text-yellow-300 font-semibold mb-2">The Web3 Directory & Assistance Service</p>
            <p className="text-md mb-4 text-gray-400">Your gateway to blockchain transparency, wallet lookup, and on-chain help.</p>
            <Link to="/search" className="button">Explore Now</Link>
          </div>
          <Divider sx={{ my: 4, bgcolor: '#00e1ff' }} />
          <Typography variant="h5" className="mb-4 text-white" sx={{ fontWeight: 600 }}>Smart Contract Actions</Typography>
          <Paper elevation={3} sx={{ p: 3, background: 'rgba(20,30,48,0.98)', borderRadius: 3, mb: 2 }}>
            <TextField
              label="Wallet Address"
              variant="outlined"
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              fullWidth
              sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#b2c2d6' } }}
              InputLabelProps={{ style: { color: '#b2c2d6' } }}
              aria-label="Wallet Address"
            />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Tooltip title="Flag this wallet as suspicious" arrow>
                <span>
                  <Button startIcon={<FlagIcon />} variant="contained" color="primary" onClick={handleFlagWallet} disabled={loading || !walletAddress} sx={{ minWidth: 140 }} aria-label="Flag Wallet">Flag Wallet</Button>
                </span>
              </Tooltip>
              <TextField
                label="Rating (1-3)"
                type="number"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                inputProps={{ min: 1, max: 3 }}
                sx={{ width: 110, input: { color: '#fff' }, label: { color: '#b2c2d6' } }}
                InputLabelProps={{ style: { color: '#b2c2d6' } }}
                aria-label="Wallet Rating"
              />
              <Tooltip title="Rate this wallet (1=Low, 3=High)" arrow>
                <span>
                  <Button startIcon={<StarRateIcon />} variant="contained" color="secondary" onClick={handleRateWallet} disabled={loading || !walletAddress} sx={{ minWidth: 140 }} aria-label="Rate Wallet">Rate Wallet</Button>
                </span>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Tooltip title="Get all info for this wallet" arrow>
                <span>
                  <Button startIcon={<SearchIcon />} variant="outlined" onClick={handleGetWalletInfo} disabled={loading || !walletAddress} sx={{ minWidth: 180 }} aria-label="Get Wallet Info">Get Wallet Info</Button>
                </span>
              </Tooltip>
              <Tooltip title="Get the wallet's rating" arrow>
                <span>
                  <Button startIcon={<StarRateIcon />} variant="outlined" onClick={handleGetWalletRating} disabled={loading || !walletAddress} sx={{ minWidth: 180 }} aria-label="Get Wallet Rating">Get Wallet Rating</Button>
                </span>
              </Tooltip>
              <Tooltip title="Get how many times this wallet was flagged" arrow>
                <span>
                  <Button startIcon={<PersonSearchIcon />} variant="outlined" onClick={handleGetWalletFlaggedCount} disabled={loading || !walletAddress} sx={{ minWidth: 180 }} aria-label="Get Flagged Count">Get Flagged Count</Button>
                </span>
              </Tooltip>
              <Tooltip title="Get the wallet struct from contract" arrow>
                <span>
                  <Button startIcon={<AssignmentIndIcon />} variant="outlined" onClick={handleGetWalletStruct} disabled={loading || !walletAddress} sx={{ minWidth: 180 }} aria-label="Get Wallet Struct">Get Wallet Struct</Button>
                </span>
              </Tooltip>
              <Tooltip title="Get the contract owner's address" arrow>
                <span>
                  <Button startIcon={<AccountBoxIcon />} variant="outlined" onClick={handleGetOwner} disabled={loading} sx={{ minWidth: 180 }} aria-label="Get Contract Owner">Get Contract Owner</Button>
                </span>
              </Tooltip>
            </Box>
            {loading && <Typography sx={{ color: '#00e1ff', mt: 2 }}>Loading...</Typography>}
            <Fade in={!!result}>
              <Paper sx={{ mt: 2, p: 2, background: 'rgba(0,225,255,0.08)', color: '#fff', borderRadius: 2, wordBreak: 'break-all', transition: 'all 0.3s' }} elevation={0}>
                {result && <pre style={{ margin: 0, color: '#00e1ff' }}>{typeof result === 'object' ? JSON.stringify(result, null, 2) : result}</pre>}
              </Paper>
            </Fade>
            {errorMsg && (
              <Typography color="error" sx={{ mt: 2 }}>{errorMsg}</Typography>
            )}
          </Paper>
          <MoralisDemo />
          {/* Style buttons for high contrast and professional look */}
          <style>{`
            .MuiButton-containedPrimary, .MuiButton-containedSecondary {
              background: linear-gradient(90deg, #00e1ff 0%, #0072ff 100%);
              color: #fff;
              font-weight: 700;
              box-shadow: 0 2px 8px 0 rgba(0,225,255,0.12);
            }
            .MuiButton-containedPrimary:hover, .MuiButton-containedSecondary:hover {
              background: linear-gradient(90deg, #0072ff 0%, #00e1ff 100%);
            }
            .MuiButton-outlined {
              border: 2px solid #00e1ff;
              color: #00e1ff;
              font-weight: 700;
              background: rgba(0,225,255,0.08);
            }
            .MuiButton-outlined:hover {
              background: #232b3e;
              border-color: #00e1ff;
              color: #fff;
            }
            .MuiInputBase-root, .MuiInputLabel-root {
              color: #fff !important;
            }
            .MuiOutlinedInput-root {
              background: rgba(36,59,85,0.35);
              color: #fff;
            }
            .MuiOutlinedInput-notchedOutline {
              border-color: #00e1ff !important;
            }
          `}</style>
        </Paper>
      </div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </Box>
  );
}

export default Home;