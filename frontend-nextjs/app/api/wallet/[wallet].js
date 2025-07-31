import { NextResponse } from "next/server";
import Wallet from "../../../models/Wallet";
import { getWalletInfoOnChain } from "../../../services/contractService";

export async function GET(req, { params }) {
  try {
    const walletAddress = params.wallet;
    const wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }
    try {
      const walletInfo = await getWalletInfoOnChain(walletAddress);
      const walletWithInfo = {
        ...wallet.toObject(),
        flaggedCount: walletInfo.flaggedCount,
        rating: walletInfo.rating,
      };
      return NextResponse.json(walletWithInfo);
    } catch {
        return NextResponse.json(wallet.toObject()); // Removed unused parameter 'error'
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
