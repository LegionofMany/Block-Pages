import { NextResponse } from "next/server";
import User from "../../../backend/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No account found with this email. Please register first." }, { status: 401 });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password. Please try again or reset your password." }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return NextResponse.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    return NextResponse.json({ error: "Login failed. Please try again later." }, { status: 400 });
  }
}
