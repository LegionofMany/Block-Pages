import { NextResponse } from "next/server";
import { getOwner } from "../../../../services/contractService";

export async function GET() {
  try {
    const owner = await getOwner();
    return NextResponse.json({ owner });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to fetch contract owner" }, { status: 500 });
  }
}
