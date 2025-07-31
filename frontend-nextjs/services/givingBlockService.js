// Giving Block Service (Next.js convention)
export async function getCharities() {
  const res = await fetch("/api/givingblock/charities");
  if (!res.ok) throw new Error("Failed to fetch charities");
  return await res.json();
}
