// ...existing code from frontend/src/components/BlockPagesLogo.jsx...

import React from "react";
import logo from "../assets/react.svg"; // Replace with your own logo if available

export default function BlockPagesLogo({ style = {} }) {
  return (
    <img src={logo} alt="BlockPages Logo" className="logo-blockpages" style={style} />
  );
}
