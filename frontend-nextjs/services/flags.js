// Service for interacting with /api/flags
export async function getFlags(walletAddress) {
  const res = await fetch(`/api/flags?walletAddress=${encodeURIComponent(walletAddress)}`);
  if (!res.ok) throw new Error("Failed to fetch flags");
  return await res.json();
}

export async function addFlag(flag) {
  const res = await fetch(`/api/flags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flag)
  });
  if (!res.ok) throw new Error("Failed to add flag");
  return await res.json();
}
