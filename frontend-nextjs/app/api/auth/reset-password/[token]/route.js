import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/db";
import crypto from "crypto";


export async function POST(req, { params }) {
  await connectDB();
  try {
    const { token } = params;
    const { password } = await req.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Password reset token is invalid or has expired." }, { status: 400 });
    }

    user.password = password; // The pre-save hook in User model will hash this
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password has been reset." }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Error processing request." }, { status: 500 });
  }
}