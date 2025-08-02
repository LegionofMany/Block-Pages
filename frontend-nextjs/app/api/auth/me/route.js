import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../../models/User";
import connectDB from "../../../../utils/db";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function GET(req) {
  await connectDB();
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/auth-token=([^;]+)/);
  if (!match) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  try {
    const token = match[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return NextResponse.json({ user: null }, { status: 200 });
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
