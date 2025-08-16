const ratings: Record<string, number> = {};

export async function rateHandler(address: string, rating: number) {
  if (!address || typeof rating !== "number" || rating < 1 || rating > 5) {
    return { success: false, error: "Invalid input.", status: 400 };
  }
  ratings[address] = rating;
  return { success: true, address, rating };
}
