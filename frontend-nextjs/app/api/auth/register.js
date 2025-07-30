
import { NextResponse } from "next/server";
import User from "../../../backend/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const JWT_SECRET = process.env.JWT_SECRET || "changeme";
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
        // Auto-login upgraded user
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, JWT_SECRET, { expiresIn: "7d" });
        const res = NextResponse.json({ message: "Account upgraded successfully", user: { id: existingUser._id, username: existingUser.username, email: existingUser.email, role: existingUser.role } });
        res.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return res;
      }
      return NextResponse.json({ error: "A user with this email already exists. Please login or use a different email." }, { status: 409 });
    }
    const user = new User({ username, name, email, password, walletAddress });
    await user.save();
    // Auto-login new user
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    const res = NextResponse.json({ message: "User registered successfully", user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    res.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
