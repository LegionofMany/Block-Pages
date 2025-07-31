// Analytics
export async function getAnalyticsEvents(params) {
  const url = new URL("/api/analytics/events", window.location.origin);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch analytics events");
  return await res.json();
}

// Directory
export async function upsertDirectoryEntry(form) {
  return { success: true };
}

// FAQ
export async function getFaqs() {
  const res = await fetch("/api/faq");
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return await res.json();
}
export async function updateFaq(id, form) {
  return { success: true };
}
export async function addFaq(form) {
  return { success: true };
}
export async function deleteFaq(id) {
  return { success: true };
}

// Assistance 411
export async function ask411(question) {
  const res = await fetch("/api/assistance/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  if (!res.ok) throw new Error("Failed to get answer");
  return await res.json();
}

// AI/Wallet
export async function analyzeTransactions(walletAddress) {
  return { analysis: "Demo analysis" };
}
export async function rateWallet(walletAddress, rating) {
  return { success: true };
}
export async function getWalletInfo(address) {
  const res = await fetch(`/api/wallet/${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error("Failed to fetch wallet info");
  return await res.json();
}
export async function getWalletRating(address) {
  const res = await fetch(`/api/wallet/${encodeURIComponent(address)}/rating`);
  if (!res.ok) throw new Error("Failed to fetch wallet rating");
  return await res.json();
}
export async function getWalletFlaggedCount(address) {
  const res = await fetch(`/api/wallet/${encodeURIComponent(address)}/flagged-count`);
  if (!res.ok) throw new Error("Failed to fetch flagged count");
  return await res.json();
}

export async function getOwner() {
  const res = await fetch("/api/wallet/owner");
  if (!res.ok) throw new Error("Failed to fetch contract owner");
  return await res.json();
}

export async function getWalletStruct(address) {
  const res = await fetch(`/api/wallet/struct/${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error("Failed to fetch wallet struct");
  return await res.json();
}
export async function register(form) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });
  if (!res.ok) {
    let error = "Registration failed";
    try {
      const data = await res.json();
      error = data.error || error;
    } catch {}
    const err = new Error(error);
    err.response = res;
    throw err;
  }
  return await res.json();
}
export async function getFlaggedWallets() {
  // Implement flagged wallets fetch logic here
  return [
    { address: "0x000...", reason: "Demo reason", flaggedCount: 1, rating: 5 },
  ];
}
// Stub for missing API functions

export async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    let error = "Login failed";
    try {
      const data = await res.json();
      error = data.error || error;
    } catch {}
    const err = new Error(error);
    err.response = res;
    throw err;
  }
  return await res.json();
}

export async function signInWithMetaMask() {
  // Implement MetaMask login logic here
  return { user: { username: "demo", wallet: "0x000..." } };
}

export async function lookupByPhone(phone) {
  // Implement phone lookup logic here
  return { name: "Demo", address: "0x000...", phone, info: "Demo info" };
}
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export async function searchDirectory(query) {
  const res = await fetch(`/api/directory/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("No results found.");
  return await res.json();
}

export async function scrapeWalletInfo(address) {
  const res = await fetch(`/api/directory/scrape?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

export async function logAnalyticsEvent(event) {
  const res = await axios.post(`${BACKEND_URL}/analytics/log`, event);
  return res.data;
}
