const flags: { address: string; reason: string }[] = [];

export async function flagHandler(address: string, reason: string) {
  if (!address || !reason || typeof reason !== "string" || reason.length < 3) {
    return { success: false, error: "Invalid input.", status: 400 };
  }
  flags.push({ address, reason });
  return { success: true, address, reason };
}
