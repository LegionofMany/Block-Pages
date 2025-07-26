// ...existing code from frontend/src/components/Navbar.jsx...

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Search", path: "/search" },
  { title: "Directory", path: "/directory" },
  { title: "Flagged", path: "/flagged" },
  { title: "Assistance", path: "/assistance411" },
  { title: "Admin Directory", path: "/admin-directory" },
  { title: "Admin Analytics", path: "/admin-analytics" },
  { title: "Admin FAQ", path: "/admin-faq" },
  { title: "Login", path: "/login" },
  { title: "Account", path: "/account" },
  { title: "Not Found", path: "/notfound" },
  { title: "Phone Lookup", path: "/phone-lookup" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" sx={{ background: "#181f2a", boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#00e1ff", fontWeight: 700 }}>
          BlockPages
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navLinks.map((link) => (
            <Link key={link.title} href={link.path} passHref legacyBehavior>
              <Button
                sx={{
                  color: pathname === link.path ? "#00e1ff" : "#fff",
                  fontWeight: 600,
                  borderBottom: pathname === link.path ? "2px solid #00e1ff" : "none",
                }}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </Box>
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { md: "none" } }}
          onClick={handleDrawerToggle}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
              {navLinks.map((link) => (
                <Link key={link.title} href={link.path} passHref legacyBehavior>
                  <ListItem button selected={pathname === link.path}>
                    <ListItemText primary={link.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}