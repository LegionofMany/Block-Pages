import axios from "axios";

const API_URL = "/api/charities/givingblock";

export async function getGivingBlockCharities() {
  try {
    const response = await axios.get(API_URL);
    return response.data.charities;
  } catch (error) {
    console.error("Error fetching Giving Block charities:", error.message);
    throw error;
  }
}
