import { NextResponse } from "next/server";
import User from "../../../backend/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, name, email, password, walletAddress } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.email.endsWith("@blockpages.metamask")) {
        existingUser.username = username || existingUser.username;
        existingUser.name = name || existingUser.name;
        existingUser.email = email;
        existingUser.password = password;
        existingUser.walletAddress = walletAddress || existingUser.walletAddress;
        await existingUser.save();
        return NextResponse.json({ message: "Account upgraded successfully" }, { status: 200 });
      }
      return NextResponse.json({ error: "A user with this email already exists. Please login or use a different email." }, { status: 409 });
    }
    const user = new User({ username, name, email, password, walletAddress });
    await user.save();
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
