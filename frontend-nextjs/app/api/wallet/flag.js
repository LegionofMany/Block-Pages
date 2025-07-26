import { NextResponse } from "next/server";
import Wallet from "../../../backend/models/Wallet";
import { flagWalletOnChain } from "../../../services/contractService";

export async function POST(req) {
  try {
    const body = await req.json();
    const { walletAddress, reason } = body;
    let wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      wallet = new Wallet({ address: walletAddress, isFlagged: true, reason });
      await wallet.save();
    } else {
      wallet.isFlagged = true;
      wallet.reason = reason;
      await wallet.save();
    }
    try {
      await flagWalletOnChain(walletAddress);
    } catch (error) {
      // Optionally handle smart contract failure
    }
    return NextResponse.json(wallet);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
