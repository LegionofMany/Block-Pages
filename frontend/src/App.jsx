import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WalletSearch from "./pages/WalletSearch";
import Flagged from "./pages/Flagged";
import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";
import Directory from "./pages/Directory";
import PhoneLookup from "./pages/PhoneLookup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import AdminDirectory from "./pages/AdminDirectory";
import Assistance411 from "./pages/Assistance411";
import AdminFaq from "./pages/AdminFaq";
import AdminAnalytics from "./pages/AdminAnalytics";

function App() {
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [user, setUser] = useState(null);
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);
  const handleToastClose = () => setToast({ message: "", type: "info" });
  const handleLogin = (res) => setUser(res.user);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route path="/search" element={<WalletSearch showToast={showToast} />} />
          <Route path="/flagged" element={<Flagged showToast={showToast} />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/phone-lookup" element={<PhoneLookup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={() => {}} />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/admin-directory" element={<AdminDirectory />} />
          <Route path="/assistance" element={<Assistance411 />} />
          <Route path="/admin-faq" element={<AdminFaq />} />
          <Route path="/admin-analytics" element={<AdminAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;