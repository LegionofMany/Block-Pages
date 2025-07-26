
// Real MetaMask authentication service
export async function signInWithMetaMask() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  // Request wallet connection
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const address = accounts[0];
  // Create a message to sign (could be a nonce from backend for extra security)
  const message = `Sign in to BlockPages at ${new Date().toISOString()}`;
  // Request signature
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, address],
  });
  // Send address and signature to backend for verification
  const res = await fetch("/api/auth/metamask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, signature, message }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "MetaMask authentication failed");
  }
  return await res.json();
}
