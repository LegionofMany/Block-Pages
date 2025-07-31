import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { address } = params;
  const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const chain = req.nextUrl.searchParams.get("chain") || "eth";
  const url = `https://deep-index.moralis.io/api/v2.2/${address}/balance?chain=${chain}`;
  const res = await fetch(url, {
    headers: { "X-API-Key": MORALIS_API_KEY }
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
