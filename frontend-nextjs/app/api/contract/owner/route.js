import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET() {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_KEY);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const abi = ["function owner() view returns (address)"];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const owner = await contract.owner();
    return NextResponse.json({ owner });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
