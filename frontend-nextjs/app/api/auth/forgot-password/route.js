import { NextResponse } from "next/server";
import User from "../../../../models/User";
import connectDB from "../../../../utils/db";
import crypto from "crypto";

export async function POST(req) {
  await connectDB();
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User with that email does not exist." }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;
    await user.save();

    // In a real application, you would send an email here.
    // For this demonstration, we'll log the reset URL to the console.
    const resetUrl = `${req.headers.get("origin")}/reset-password/${resetToken}`;
    console.log(`Password Reset URL for ${user.email}: ${resetUrl}`);

    return NextResponse.json({ message: "Password reset link sent to your email (check console for URL)." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Error processing request." }, { status: 500 });
  }
}