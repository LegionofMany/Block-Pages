import { NextResponse } from "next/server";
import { getWalletRatingOnChain } from "../../../../services/contractService";

export async function GET(req, { params }) {
  try {
    const walletAddress = params.wallet;
    const rating = await getWalletRatingOnChain(walletAddress);
    return NextResponse.json({ rating });
  } catch {
    return NextResponse.json({ rating: 0 });
  }
}
