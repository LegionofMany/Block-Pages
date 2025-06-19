import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";

export async function signInWithMetaMask() {
  if (!window.ethereum) throw new Error("MetaMask is not installed");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const address = accounts[0];
  const message = `Sign in to BlockPages 411 at ${new Date().toISOString()}`;
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, address],
  });
  // Debug log
  console.log({ address, message, signature });
  // Send to backend for verification and JWT
  const res = await axios.post(`${API_URL}/api/auth/metamask`, { address, message, signature });
  return res.data; // Should return { token, user }
}
