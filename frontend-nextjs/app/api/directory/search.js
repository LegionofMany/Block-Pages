import { NextResponse } from "next/server";
import Directory from "../../../backend/models/Directory";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    // Simple search by name or address
    const results = await Directory.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } }
      ]
    }).lean();
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
