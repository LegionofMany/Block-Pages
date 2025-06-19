import axios from "axios";

const GIVING_BLOCK_API_URL = "https://api.thegivingblock.com/v1/charities";
// If you have an API key, add it here
const GIVING_BLOCK_API_KEY = process.env.GIVING_BLOCK_API_KEY;

export async function fetchGivingBlockCharities() {
  try {
    const headers = GIVING_BLOCK_API_KEY
      ? { Authorization: `Bearer ${GIVING_BLOCK_API_KEY}` }
      : {};
    const response = await axios.get(GIVING_BLOCK_API_URL, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching charities from The Giving Block:", error.message);
    throw error;
  }
}
