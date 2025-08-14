"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

// Example navLinks and mainLinks, replace with your actual data
const navLinks = [
  { title: "Home", path: "/" },
  { title: "Directory", path: "/directory" },
  { title: "Analytics", path: "/admin-analytics" },
  { title: "Account", path: "/account" },
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];
const mainLinks = ["Home", "Directory", "Analytics", "Account", "Login", "Register"];

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wallet, setWallet] = useState(null);
  const { user, loading, logout } = useAuth(); // Use user, loading, and logout from AuthContext

  // Fetch user info on mount - REMOVED, now handled by AuthContext
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("/api/auth/me");
  //       if (res.ok) {
  //         const data = await res.json();
  //         setUser(data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchUser();
  //   // Check for connected wallet on mount
  //   if (typeof window !== "undefined" && window.ethereum && window.ethereum.selectedAddress) {
  //     setWallet(window.ethereum.selectedAddress);
  //   }
  // }, []);

  // Listen for wallet changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handler = (accounts) => setWallet(accounts[0] || null);
      window.ethereum.on("accountsChanged", handler);
      return () => window.ethereum.removeListener("accountsChanged", handler);
    }
  }, []);

  // Connect wallet handler
  const handleConnectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask not found. Please install MetaMask.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed");
    }
  };

  // Disconnect wallet handler
  const handleDisconnectWallet = () => {
    setWallet(null);
  };

  // handleLogout now comes from AuthContext
  // const handleLogout = async () => {
  //   await fetch("/api/auth/logout", { method: "POST" });
  //   setUser(null);
  //   window.location.href = "/login";
  // };

  // Filter nav links based on auth state
  const filteredLinks = navLinks.filter(link => {
    if (user) {
      // Hide Login/Register if logged in
      return !["Login", "Register"].includes(link.title);
    } else {
      // Hide Account if not logged in
      return link.title !== "Account";
    }
  });

  return (
    <AppBar position="static" sx={{ background: "#181f2a", boxShadow: "none" }}>
      <Toolbar sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
        {/* Custom menu button on the top left */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#00e1ff", fontWeight: 700, fontSize: { xs: 20, sm: 24 } }}>
          BlockPages
        </Typography>
        {/* Main links for large screens */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          {filteredLinks.filter(link => mainLinks.includes(link.title)).map((link) => (
            <Link key={link.title} href={link.path}>
              <Button
                sx={{
                  color: pathname === link.path ? "#00e1ff" : "#fff",
                  fontWeight: 600,
                  borderBottom: pathname === link.path ? "2px solid #00e1ff" : "none",
                  fontSize: { xs: 14, sm: 16 }
                }}
              >
                {link.title}
              </Button>
            </Link>
          ))}
          {user && ( // Use user from AuthContext
            <Button color="inherit" onClick={logout} sx={{ ml: 2, fontWeight: 600 }}> {/* Use logout from AuthContext */}
              Logout
            </Button>
          )}
          {/* Wallet Connect Button */}
          {wallet ? (
            <Button color="inherit" sx={{ ml: 2, fontWeight: 600 }} onClick={handleDisconnectWallet} title={wallet}>
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </Button>
          ) : (
            <Button color="inherit" sx={{ ml: 2, fontWeight: 600 }} onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          )}
        </Box>
        {/* Drawer for all links, toggled by menu button */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 260 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              {filteredLinks.map((link) => (
                <Link key={link.title} href={link.path}>
                  <ListItem button={true} selected={pathname === link.path}>
                    <ListItemText primary={link.title} />
                  </ListItem>
                </Link>
              ))}
              {user && ( // Use user from AuthContext
                <ListItem button onClick={logout}> {/* Use logout from AuthContext */}
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
              {/* Wallet Connect in Drawer */}
              {wallet ? (
                <ListItem button onClick={handleDisconnectWallet}>
                  <ListItemText primary={`${wallet.slice(0, 6)}...${wallet.slice(-4)}`} />
                </ListItem>
              ) : (
                <ListItem button onClick={handleConnectWallet}>
                  <ListItemText primary="Connect Wallet" />
                </ListItem>
              )}
            </List>
            {user && ( // Use user from AuthContext
              <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
                <Typography variant="body2" color="textSecondary">
                  Signed in as <b>{user.username || user.email}</b>
                </Typography>
              </Box>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}