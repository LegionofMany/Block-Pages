import { NextResponse } from "next/server";
import { rateWalletOnChain } from "../../../services/contractService";

export async function POST(req) {
  try {
    const body = await req.json();
    const { walletAddress, rating } = body;
    await rateWalletOnChain(walletAddress, rating);
    return NextResponse.json({ message: `Wallet ${walletAddress} rated successfully.` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
