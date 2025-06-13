import AnalyticsEvent from "../models/AnalyticsEvent.js";

export const logEvent = async (req, res) => {
  const { type, data } = req.body;
  const user = req.user?.id;
  const event = new AnalyticsEvent({ type, user, data });
  await event.save();
  res.status(201).json({ message: "Event logged" });
};

export const getEvents = async (req, res) => {
  const events = await AnalyticsEvent.find().sort({ createdAt: -1 }).limit(100);
  res.json(events);
};
