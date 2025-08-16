import { NextResponse } from "next/server";
import { rateHandler } from "../../../lib/handlers/walletRate";

export async function POST(req: Request) {
  const { address, rating } = await req.json();
  const result = await rateHandler(address, rating);
  if (!result.success) {
    return NextResponse.json(result, { status: result.status });
  }
  return NextResponse.json(result);
}
