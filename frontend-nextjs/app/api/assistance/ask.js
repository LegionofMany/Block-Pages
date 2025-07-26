import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { question } = await req.json();
    // TODO: Integrate with AI or FAQ logic
    // For now, return a demo answer
    return NextResponse.json({ answer: "Demo answer for: " + question });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
