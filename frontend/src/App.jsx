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
import PrivateRoute from "./components/PrivateRoute";

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
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={() => {}} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <Home showToast={showToast} />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute user={user}>
                <WalletSearch showToast={showToast} />
              </PrivateRoute>
            }
          />
          <Route
            path="/flagged"
            element={
              <PrivateRoute user={user}>
                <Flagged showToast={showToast} />
              </PrivateRoute>
            }
          />
          <Route
            path="/directory"
            element={
              <PrivateRoute user={user}>
                <Directory />
              </PrivateRoute>
            }
          />
          <Route
            path="/phone-lookup"
            element={
              <PrivateRoute user={user}>
                <PhoneLookup />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute user={user}>
                <Account user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-directory"
            element={
              <PrivateRoute user={user}>
                <AdminDirectory />
              </PrivateRoute>
            }
          />
          <Route
            path="/assistance"
            element={
              <PrivateRoute user={user}>
                <Assistance411 />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-faq"
            element={
              <PrivateRoute user={user}>
                <AdminFaq />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-analytics"
            element={
              <PrivateRoute user={user}>
                <AdminAnalytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;