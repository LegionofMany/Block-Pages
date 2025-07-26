import { NextResponse } from "next/server";
import { getWalletStruct } from "../../../../../services/contractService";

export async function GET(req, { params }) {
  const { address } = params;
  try {
    const struct = await getWalletStruct(address);
    return NextResponse.json(struct);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to fetch wallet struct" }, { status: 500 });
  }
}
