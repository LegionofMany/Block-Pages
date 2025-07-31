
// Contract Service using Next.js API routes
export async function getOwner() {
  const res = await fetch("/api/contract/owner");
  if (!res.ok) throw new Error("Failed to fetch contract owner");
  return await res.json();
}

export async function flagWalletOnChain(address) {
  const res = await fetch("/api/wallet/flag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress: address, reason: "Flagged from UI" })
  });
  if (!res.ok) throw new Error("Failed to flag wallet on-chain");
  return await res.json();
}

export async function rateWalletOnChain(address, rating) {
  const res = await fetch("/api/wallet/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress: address, rating })
  });
  if (!res.ok) throw new Error("Failed to rate wallet on-chain");
  return await res.json();
}

export async function getWalletInfoOnChain(address) {
  const res = await fetch(`/api/wallet/${address}`);
  if (!res.ok) throw new Error("Failed to fetch wallet info on-chain");
  return await res.json();
}

export async function getWalletStruct(address) {
  const res = await fetch(`/api/wallet/struct/${address}`);
  if (!res.ok) throw new Error("Failed to fetch wallet struct");
  return await res.json();
}
