import { NextResponse } from "next/server";

export async function GET() {
  // Generate a random nonce (for demo, use a simple random string)
  const nonce = Math.random().toString(36).substring(2, 15);
  return NextResponse.json({ nonce });
}
