import { NextResponse } from "next/server";
import User from "../../../backend/models/User";
import jwt from "jsonwebtoken";
import { utils } from "ethers";
const { verifyMessage } = utils;

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  try {
    const body = await req.json();
    const { address, message, signature } = body;
    if (!address || !message || !signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    let recovered;
    try {
      recovered = verifyMessage(message, signature);
    } catch (err) {
      return NextResponse.json({ error: "Signature verification error: " + err.message }, { status: 400 });
    }
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Signature verification failed. Please sign with the correct wallet." }, { status: 401 });
    }
    let user = await User.findOne({ walletAddress: address });
    if (!user) {
      const username = `metamask-${address.toLowerCase()}`;
      const email = `${address.toLowerCase()}@blockpages.metamask`;
      user = new User({ username, name: username, email, walletAddress: address });
      try {
        await user.save();
      } catch (err) {
        if (err.code === 11000) {
          return NextResponse.json({ error: "A user with this wallet address or email already exists. Please login instead." }, { status: 409 });
        }
        return NextResponse.json({ error: "User creation error: " + err.message }, { status: 400 });
      }
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return NextResponse.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role, walletAddress: user.walletAddress } });
  } catch (err) {
    return NextResponse.json({ error: "MetaMask login error: " + err.message }, { status: 400 });
  }
}
