import { NextResponse } from "next/server";
import Donation from "../../../backend/models/Donation";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const walletAddress = searchParams.get("walletAddress");
  if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 });
  const donations = await Donation.find({ walletAddress }).sort({ createdAt: -1 });
  return NextResponse.json(donations);
}

export async function POST(req) {
  const body = await req.json();
  const { walletAddress, donatedBy, txHash, amount } = body;
  if (!walletAddress || !donatedBy || !amount) return NextResponse.json({ error: "walletAddress, donatedBy, and amount required" }, { status: 400 });
  const donation = new Donation({ walletAddress, donatedBy, txHash, amount });
  await donation.save();
  return NextResponse.json(donation, { status: 201 });
}
