// Moralis Service (Next.js convention)
export async function getWalletBalance(address, chain = "eth") {
  const res = await fetch(`/api/moralis/balance/${address}?chain=${chain}`);
  if (!res.ok) throw new Error("Failed to fetch wallet balance");
  return await res.json();
}
