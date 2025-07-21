import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { label: '411 Directory', to: '/directory' },
    { label: '411 Phone Lookup', to: '/phone-lookup' },
    { label: 'Flagged Wallets', to: '/flagged' },
    { label: '411 Assistance', to: '/assistance' },
    { label: 'Crypto Charities', to: '/charities' },
  ];
  const adminLinks = [
    { label: 'Admin Directory', to: '/admin-directory' },
    { label: 'Admin FAQ', to: '/admin-faq' },
    { label: 'Admin Analytics', to: '/admin-analytics' },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 1 }} onClick={() => navigate("/")}>📞 BlockPages 411</Typography>
        {/* Desktop Nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
          {navLinks.map(link => (
            <Button key={link.to} color="inherit" component={Link} to={link.to}>{link.label}</Button>
          ))}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/account">My Account</Button>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
          {user?.role === "admin" && adminLinks.map(link => (
            <Button key={link.to} color="inherit" component={Link} to={link.to}>{link.label}</Button>
          ))}
        </Box>
        {/* Mobile Nav */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
              {navLinks.map(link => (
                <ListItem button key={link.to} component={Link} to={link.to}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
              {user ? (
                <>
                  <ListItem button component={Link} to="/account"><ListItemText primary="My Account" /></ListItem>
                  <ListItem button onClick={onLogout}><ListItemText primary="Logout" /></ListItem>
                </>
              ) : (
                <>
                  <ListItem button component={Link} to="/login"><ListItemText primary="Login" /></ListItem>
                  <ListItem button component={Link} to="/register"><ListItemText primary="Register" /></ListItem>
                </>
              )}
              {user?.role === "admin" && adminLinks.map(link => (
                <ListItem button key={link.to} component={Link} to={link.to}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
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