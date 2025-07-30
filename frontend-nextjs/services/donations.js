// Service for interacting with /api/donations
export async function getDonations(walletAddress) {
  const res = await fetch(`/api/donations?walletAddress=${encodeURIComponent(walletAddress)}`);
  if (!res.ok) throw new Error("Failed to fetch donations");
  return await res.json();
}

export async function addDonation(donation) {
  const res = await fetch(`/api/donations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donation)
  });
  if (!res.ok) throw new Error("Failed to add donation");
  return await res.json();
}
