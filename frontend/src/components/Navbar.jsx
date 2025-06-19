import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 1 }} onClick={() => navigate("/")}>
          📞 BlockPages 411
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/directory">411 Directory</Button>
          <Button color="inherit" component={Link} to="/phone-lookup">411 Phone Lookup</Button>
          <Button color="inherit" component={Link} to="/flagged">
            Flagged Wallets
          </Button>
          <Button color="inherit" component={Link} to="/assistance">411 Assistance</Button>
          <Button color="inherit" component={Link} to="/charities">
            Crypto Charities
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/account">
                My Account
              </Button>
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin-directory">Admin Directory</Button>
          )}
          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin-faq">Admin FAQ</Button>
          )}
          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin-analytics">Admin Analytics</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
  onLogout: () => {},
};

export default Navbar;