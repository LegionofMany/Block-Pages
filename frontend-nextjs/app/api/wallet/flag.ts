import { NextResponse } from "next/server";
import { flagHandler } from "../../../lib/handlers/walletFlag";

export async function POST(req: Request) {
  const { address, reason } = await req.json();
  const result = await flagHandler(address, reason);
  if (!result.success) {
    return NextResponse.json(result, { status: result.status });
  }
  return NextResponse.json(result);
}
