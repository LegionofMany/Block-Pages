import { NextResponse } from "next/server";
import Faq from "../../../backend/models/Faq";

export async function GET() {
  try {
    const faqs = await Faq.find().lean();
    return NextResponse.json(faqs);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
