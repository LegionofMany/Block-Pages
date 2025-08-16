

// Contract Service using Next.js API routes
const getApiBase = () => {
  if (typeof window !== "undefined") {
    // Client-side: use relative URLs
    return "";
  }
  // Server-side: use env or fallback
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
};

export async function getOwner() {
  const res = await fetch(`${getApiBase()}/api/contract/owner`);
  if (!res.ok) throw new Error("Failed to fetch contract owner");
  return await res.json();
}

export async function flagWalletOnChain(address) {
  const res = await fetch(`${getApiBase()}/api/wallet/flag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress: address, reason: "Flagged from UI" })
  });
  if (!res.ok) throw new Error("Failed to flag wallet on-chain");
  return await res.json();
}

export async function rateWalletOnChain(address, rating) {
  const res = await fetch(`${getApiBase()}/api/wallet/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress: address, rating })
  });
  if (!res.ok) throw new Error("Failed to rate wallet on-chain");
  return await res.json();
}

export async function getWalletInfoOnChain(address) {
  const res = await fetch(`${getApiBase()}/api/wallet/${address}`);
  if (!res.ok) throw new Error("Failed to fetch wallet info on-chain");
  return await res.json();
}

export async function getWalletStruct(address) {
  const res = await fetch(`${getApiBase()}/api/wallet/struct/${address}`);
  if (!res.ok) throw new Error("Failed to fetch wallet struct");
  return await res.json();
}
