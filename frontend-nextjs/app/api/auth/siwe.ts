import { NextResponse } from "next/server";
import { verifyMessage } from "ethers";
import { cookies } from "next/headers";
import { users, userIdCounter, incrementUserIdCounter } from "../../../lib/auth-db";

export async function POST(req: Request) {
  const { address, signature, nonce } = await req.json();
  // For demo, just verify the signature matches the nonce
  try {
    const recovered = verifyMessage(nonce, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Signature verification failed" }, { status: 401 });
    }
    // Lookup or create user in DB
    let user = users.find(u => u.walletAddress === address);
    if (!user) {
      user = { id: userIdCounter.toString(), name: "Wallet User", email: "", walletAddress: address };
      users.push(user);
      incrementUserIdCounter();
    }
    // Set session cookie
    const response = NextResponse.json({ success: true, user });
    response.cookies.set("userId", user.id, { httpOnly: true, path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: "SIWE verification error" }, { status: 400 });
  }
}
