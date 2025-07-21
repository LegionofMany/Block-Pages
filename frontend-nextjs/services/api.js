import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export async function searchDirectory(query) {
  const res = await axios.get(`${BACKEND_URL}/directory/search`, { params: { q: query } });
  return res.data;
}

export async function scrapeWalletInfo(address) {
  const res = await axios.get(`${BACKEND_URL}/directory/scrape`, { params: { address } });
  return res.data;
}

export async function logAnalyticsEvent(event) {
  const res = await axios.post(`${BACKEND_URL}/analytics/log`, event);
  return res.data;
}
