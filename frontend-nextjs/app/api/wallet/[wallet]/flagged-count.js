import { NextResponse } from "next/server";
import { getWalletFlaggedCountOnChain } from "../../../../services/contractService";

export async function GET(req, { params }) {
  try {
    const walletAddress = params.wallet;
    const flaggedCount = await getWalletFlaggedCountOnChain(walletAddress);
    return NextResponse.json({ flaggedCount });
  } catch {
    return NextResponse.json({ flaggedCount: 0 });
  }
}
