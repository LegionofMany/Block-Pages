import { NextResponse } from "next/server";
import AnalyticsEvent from "../../../../backend/models/AnalyticsEvent";

export async function GET() {
  try {
    const events = await AnalyticsEvent.find().lean();
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
