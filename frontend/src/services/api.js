import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper to handle backend response format
function handleApiResponse(response) {
  if (response.data?.status === 'error') {
    throw new Error(response.data.message || 'API Error');
  }
  // Prefer .data if present, else return whole response
  return response.data?.data ?? response.data;
}

// GET flagged wallets
export const getFlaggedWallets = async () => {
  try {
    const response = await api.get("/api/wallets/flagged");
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error fetching flagged wallets:", error);
    throw error;
  }
};
// GET wallet info
export const getWalletInfo = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  try {
    const response = await api.get(`/api/wallets/${walletAddress}`); // Use the new route
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error fetching wallet info:", error);
    throw error;
  }
};
// POST flag wallet
export const flagWallet = async (walletAddress, reason) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  if (!reason) {
    throw new Error("Reason for flagging is required");
  }
  try {
    const response = await api.post("/api/wallets/flag", { walletAddress, reason });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error flagging wallet:", error);
    throw error;
  }
};
// POST rate wallet
export const rateWallet = async (walletAddress, rating) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  if (![1,2,3].includes(Number(rating))) {
    throw new Error("Rating must be 1, 2, or 3");
  }
  try {
    const response = await api.post("/api/wallets/rate", { walletAddress, rating });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error rating wallet:", error);
    throw error;
  }
};

// GET wallet rating
export const getWalletRating = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  try {
    const response = await api.get(`/api/wallets/${walletAddress}/rating`);
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error fetching wallet rating:", error);
    throw error;
  }
};

// GET wallet flagged count
export const getWalletFlaggedCount = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  try {
    const response = await api.get(`/api/wallets/${walletAddress}/flagged-count`);
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error fetching wallet flagged count:", error);
    throw error;
  }
};

// AI endpoints
export const analyzeTransactions = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  try {
    const response = await api.post("/api/ai/analyze", { walletAddress });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error analyzing transactions:", error);
    throw error;
  }
};

export const getTransactionHistory = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  try {
    const response = await api.get(`/api/ai/transaction-history/${walletAddress}`);
    return handleApiResponse(response);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};

// AI scraping wallet info
export const scrapeWalletInfo = async (walletAddress) => {
  const response = await api.get(`/api/ai/scrape/${walletAddress}`);
  return handleApiResponse(response);
};

// Directory search
export const searchDirectory = async (q) => {
  const response = await api.get(`/api/directory/search?q=${encodeURIComponent(q)}`);
  return handleApiResponse(response);
};
// Phone lookup
export const lookupByPhone = async (phone) => {
  const response = await api.get(`/api/directory/phone/${encodeURIComponent(phone)}`);
  return handleApiResponse(response);
};
// Auth
export const login = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return handleApiResponse(response);
};
export const register = async (form) => {
  const response = await api.post("/api/auth/register", form);
  return handleApiResponse(response);
};
export const getMe = async (token) => {
  const response = await api.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
  return handleApiResponse(response);
};

// Admin upsert directory entry
export const upsertDirectoryEntry = async (form) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/api/directory/upsert", form, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleApiResponse(response);
};

// 411 Assistance (AI/FAQ)
export const ask411 = async (question) => {
  const response = await api.post("/api/assistance/ask", { question });
  return handleApiResponse(response);
};
// FAQ management
export const getFaqs = async () => {
  const response = await api.get("/api/faqs");
  return handleApiResponse(response);
};
export const addFaq = async (faq) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/api/faqs", faq, { headers: { Authorization: `Bearer ${token}` } });
  return handleApiResponse(response);
};
export const updateFaq = async (id, faq) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/api/faqs/${id}`, faq, { headers: { Authorization: `Bearer ${token}` } });
  return handleApiResponse(response);
};
export const deleteFaq = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/api/faqs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return handleApiResponse(response);
};

// Analytics
export const logAnalyticsEvent = async (type, data) => {
  const token = localStorage.getItem("token");
  await api.post("/api/analytics/log", { type, data }, { headers: { Authorization: `Bearer ${token}` } });
};
// Fetch analytics events (with optional filters)
export const getAnalyticsEvents = async (params = {}) => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/analytics", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return handleApiResponse(response);
};