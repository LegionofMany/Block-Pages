import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Example: Replace with real Giving Block API call if you have an API key
    const res = await fetch("https://partners.givingblock.com/api/v2/charities");
    if (!res.ok) throw new Error("Failed to fetch charities");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
