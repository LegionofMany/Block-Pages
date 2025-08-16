import { NextResponse } from "next/server";

export async function GET() {
  // Simulate leaderboard data
  const leaderboard = [
    { address: "0x123...abcd", amount: 100 },
    { address: "0x456...efgh", amount: 80 },
    { address: "0x789...ijkl", amount: 50 },
  ];
  return NextResponse.json({ leaderboard });
}
