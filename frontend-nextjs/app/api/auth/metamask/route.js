import { NextResponse } from "next/server";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import connectDB from "../../../../utils/db";
import { ethers } from "ethers";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  await connectDB();
  try {
    const { address, signature, message } = await req.json();
    if (!address || !signature || !message) {
      return NextResponse.json({ error: "address, signature, and message required" }, { status: 400 });
    }

    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let user = await User.findOne({ walletAddress: address });
    if (!user) {
      user = await User.create({ walletAddress: address });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    // Set cookie
    return NextResponse.json({ user, token }, {
      status: 200,
      headers: {
        "Set-Cookie": `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
      }
    });
  } catch (error) {
    console.error("MetaMask login error:", error);
    return NextResponse.json({ error: "MetaMask login failed" }, { status: 500 });
  }
}

