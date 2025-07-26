import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    // TODO: Integrate with on-chain or external API for wallet info
    // For now, return a demo object
    return NextResponse.json({ address, info: "Demo scraped info" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
