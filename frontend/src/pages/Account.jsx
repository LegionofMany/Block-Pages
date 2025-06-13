import React from "react";
import { Box, Typography } from "@mui/material";

export default function Account({ user }) {
  if (!user) return null;
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Account</Typography>
      <Typography variant="body1">Username: {user.username}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Role: {user.role}</Typography>
    </Box>
  );
}
