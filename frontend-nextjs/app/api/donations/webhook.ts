import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Simulate webhook handling
  const body = await req.json();
  // TODO: Validate and persist donation event
  return NextResponse.json({ received: true, body });
}
