import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WalletSearch from "./pages/WalletSearch";
import Flagged from "./pages/Flagged";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<WalletSearch />} />
          <Route path="/flagged" element={<Flagged />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;