import { NextResponse } from "next/server";
import AnalyticsEvent from "../../../backend/models/AnalyticsEvent";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = {};
    if (searchParams.get("type") && searchParams.get("type") !== "all") {
      query.type = searchParams.get("type");
    }
    if (searchParams.get("from")) {
      query.createdAt = { ...query.createdAt, $gte: new Date(searchParams.get("from")) };
    }
    if (searchParams.get("to")) {
      query.createdAt = { ...query.createdAt, $lte: new Date(searchParams.get("to")) };
    }
    const events = await AnalyticsEvent.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
