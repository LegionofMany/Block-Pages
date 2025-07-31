import { NextResponse } from "next/server";
import Flag from "../../../models/Flag";
import connectDB from "../../../utils/db";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const walletAddress = searchParams.get("walletAddress");
  if (!walletAddress) return NextResponse.json({ error: "walletAddress required" }, { status: 400 });
  const flags = await Flag.find({ walletAddress }).sort({ createdAt: -1 });
  return NextResponse.json(flags);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { walletAddress, flaggedBy, txHash, reason } = body;
  if (!walletAddress || !flaggedBy) return NextResponse.json({ error: "walletAddress and flaggedBy required" }, { status: 400 });
  const flag = new Flag({ walletAddress, flaggedBy, txHash, reason });
  await flag.save();
  return NextResponse.json(flag, { status: 201 });
}
