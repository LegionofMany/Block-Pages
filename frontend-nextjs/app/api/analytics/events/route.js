import { NextResponse } from "next/server";
import AnalyticsEvent from "../../../../models/AnalyticsEvent";
import connectDB from "../../../../utils/db";

export async function GET() {
  await connectDB();
  try {
    const events = await AnalyticsEvent.find().lean();
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
