import { NextResponse } from "next/server";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import connectDB from "../../../../utils/db";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  await connectDB();
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found or password not set" }, { status: 401 });
    }
    console.log("Login attempt for email:", email);
    console.log("Password received:", password);
    console.log("User from DB:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("bcrypt.compare result:", isMatch);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return NextResponse.json({ user, token }, {
      status: 200,
      headers: {
        "Set-Cookie": `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
      }
    });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
