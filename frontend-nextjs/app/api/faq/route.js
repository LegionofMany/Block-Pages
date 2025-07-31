import { NextResponse } from "next/server";
import Faq from "../../../models/Faq";
import connectDB from "../../../utils/db";

export async function GET() {
  await connectDB();
  try {
    const faqs = await Faq.find().lean();
    return NextResponse.json(faqs);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
